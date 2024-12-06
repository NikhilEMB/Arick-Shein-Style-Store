(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-edit-document-edit-document-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-document/edit-document.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/edit-document/edit-document.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"\r\n        defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Edit Document</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div style=\"text-align: center;\">\r\n      <ion-button (click)=\"saveWidget()\"\r\n        color=\"success\"\r\n        fill=\"outline\"\r\n        shape=\"round\">\r\n        Save Document Section\r\n      </ion-button>\r\n    </div>\r\n    <ion-col size=\"12\">\r\n      <div class=\"input-wrap\">\r\n        <ion-label>Section Name</ion-label>\r\n        <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n      </div>\r\n    </ion-col>\r\n    <ion-col size=\"12\">\r\n      <div class=\"input-wrap\">\r\n        <ion-label>Description</ion-label>\r\n        <ion-input class=\"form-input\"\r\n          [(ngModel)]=\"description\"></ion-input>\r\n      </div>\r\n    </ion-col>\r\n    <br><br>\r\n    <div style=\"display: flex; align-items: center\">\r\n      <ion-label>PDF File</ion-label>\r\n      <div class=\"upload-btn-wrapper\">\r\n        <button class=\"upload-btn btn-1 i-start\"> <i\r\n            class=\"flaticon-null-16\"></i>Upload Pdf File</button>\r\n        <input type=\"file\" accept=\".pdf,.docx\"\r\n          name=\"myfile\"\r\n          (change)=\"uploadPdf($event.target.files)\" />\r\n      </div>\r\n      <br>\r\n      &nbsp;&nbsp;<a href=\"{{pdfUrl}}\"\r\n        target=\"_blank\"\r\n        *ngIf=\"pdfUrl != '' \">Uploaded File</a>&nbsp;&nbsp;\r\n      <p *ngIf=\"widgetData && widgetData.pdfUrl && newFile == true\">Selected\r\n        File : {{widgetData.pdfUrl.name}}</p>\r\n    </div>\r\n    <ion-col size=\"12\">\r\n      <div class=\"flex-space-between\"\r\n        style=\"justify-content: left;\">\r\n        <div>\r\n          <ion-label>Image</ion-label>\r\n        </div>\r\n        <div class=\"upload-btn-wrapper\">\r\n          <button\r\n            [disabled]=\"widgetData && widgetData.coverImage && widgetData.coverImage.org\"\r\n            class=\"upload-btn btn-1 i-start\"\r\n            (click)=\"uploadImage($event.target.files)\"> <i\r\n              class=\"flaticon-null-16\"></i>Upload Image</button>\r\n          <!-- <input  [disabled]=\"widgetData && widgetData.coverImage && widgetData.coverImage.org\" type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" /> -->\r\n        </div>\r\n      </div>\r\n      <div class=\"img-container\">\r\n        <div class=\"no-img\"\r\n          *ngIf=\"widgetData && !widgetData.coverImage\">\r\n          <p>No Image</p>\r\n        </div>\r\n        <div *ngIf=\"widgetData && widgetData.coverImage\">\r\n          <div class=\"img-wrap\"\r\n            *ngIf=\"widgetData.coverImage.org\">\r\n            <img class=\"category-img\"\r\n              [src]=\"widgetData.coverImage.org\" />\r\n            <div class=\"overlay\">\r\n              <ion-button class=\"btn-2 remove\"\r\n                shape=\"round\"\r\n                fill=\"clear\"\r\n                color=\"danger\"\r\n                (click)=\"removeImage()\">\r\n                <ion-icon name=\"trash\"\r\n                  slot=\"icon-only\"></ion-icon>\r\n              </ion-button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ion-col>\r\n    <br><br>\r\n    <ion-col size=\"12\">\r\n      <div class=\"input-wrap\">\r\n        <ion-label>Download button text</ion-label>\r\n        <ion-input class=\"form-input\"\r\n          [(ngModel)]=\"btnTxt\"></ion-input>\r\n      </div>\r\n    </ion-col>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/widgets/edit-document/edit-document.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/widgets/edit-document/edit-document.module.ts ***!
  \*********************************************************************/
/*! exports provided: EditDocumentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditDocumentPageModule", function() { return EditDocumentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_document_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-document.page */ "./src/app/pages/widgets/edit-document/edit-document.page.ts");







const routes = [
    {
        path: '',
        component: _edit_document_page__WEBPACK_IMPORTED_MODULE_6__["EditDocumentPage"]
    }
];
let EditDocumentPageModule = class EditDocumentPageModule {
};
EditDocumentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_edit_document_page__WEBPACK_IMPORTED_MODULE_6__["EditDocumentPage"]]
    })
], EditDocumentPageModule);



/***/ }),

/***/ "./src/app/pages/widgets/edit-document/edit-document.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/widgets/edit-document/edit-document.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvZWRpdC1kb2N1bWVudC9lZGl0LWRvY3VtZW50LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/edit-document/edit-document.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/widgets/edit-document/edit-document.page.ts ***!
  \*******************************************************************/
/*! exports provided: EditDocumentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditDocumentPage", function() { return EditDocumentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");










let EditDocumentPage = class EditDocumentPage {
    constructor(events, router, alertController, loadingController, activatedRoute, modalController, angularFirestore, _location) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.btnTxt = 'Download';
        this.mode = 'new';
        this.widgetData = {
            coverImage: { org: '' }
        };
        this.pageId = '';
        this.pdfUrl = '';
        this.productId = '';
        this.newFile = false;
        this.sectionName = '';
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.activatedRoute.queryParams.subscribe((params) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (params && params.ID) {
                this.widgetId = params.ID;
                this.events.publish('widgets:getWidgetData', this.widgetId);
            }
            if (params && params.pageId) {
                this.pageId = params.pageId;
            }
            if (params && params.type) {
                this.type = params.type;
            }
            if (params && params.productId) {
                this.productId = params.productId;
            }
            if (params && params.index) {
                this.sectionIndex = params.index;
            }
        }));
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    removeSubscriptions() {
        this.events.unsubscribe('widgets:addDocumentSuccess');
    }
    initializeSubscriptions() {
        this.events.subscribe('widgets:publishWidgetDataSuccess', (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.widgetData = data;
            this.pdfUrl = this.widgetData.pdfUrl;
            this.mode = 'edit';
            if (this.widgetData && this.widgetData.description) {
                this.description = this.widgetData.description;
            }
            if (this.widgetData && this.widgetData.btnTxt) {
                this.btnTxt = this.widgetData.btnTxt;
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        }));
        this.events.subscribe('widgets:addDocumentSuccess', (Id) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.widgetId = Id;
            let widget = {
                widgetID: this.widgetId,
                // widgetType: this.type,
                widgetType: "document",
                location: "all",
                sectionName: this.sectionName
            };
            if (this.pageId != '') {
                yield this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_5__["firestore"].FieldValue.arrayUnion(widget) });
            }
            else if (this.productId != '') {
                let sectionRef = yield this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets');
                if (!(yield sectionRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise())) {
                    yield sectionRef.set({ sections: firebase__WEBPACK_IMPORTED_MODULE_5__["firestore"].FieldValue.arrayUnion(widget) });
                }
                else {
                    yield sectionRef.update({ sections: firebase__WEBPACK_IMPORTED_MODULE_5__["firestore"].FieldValue.arrayUnion(widget) });
                }
            }
            this.presentAlert('Document saved successfully');
            this.mode = 'edit';
            if (this.loading) {
                this.loading.dismiss();
            }
            this._location.back();
        }));
        this.events.subscribe('widgets:addDocumentError', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert('Save document failed, please try again');
        });
        this.getSections();
    }
    getSections() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.pageId) {
                let res = yield this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise();
                if (res && res.sections) {
                    this.sections = res.sections;
                    if (this.sectionIndex) {
                        this.sectionName = res.sections[this.sectionIndex].sectionName ? res.sections[this.sectionIndex].sectionName : "";
                    }
                }
            }
        });
    }
    saveWidget() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.mode == 'new') {
                this.presentLoading();
                let widgetData = {
                    description: this.description,
                    btnTxt: this.btnTxt,
                    coverImage: this.widgetData.coverImage,
                    pdfUrl: this.widgetData.pdfUrl,
                    type: this.type
                };
                this.events.publish('widgets:saveDocument', widgetData);
            }
            else {
                this.presentLoading();
                let widgetData = {
                    description: this.description,
                    btnTxt: this.btnTxt,
                    coverImage: this.widgetData.coverImage,
                    pdfUrl: this.widgetData.pdfUrl,
                    type: 'document'
                };
                try {
                    yield this.angularFirestore.collection('widgets').doc(this.widgetId).update(widgetData);
                    if (this.sectionIndex) {
                        this.sections[this.sectionIndex].sectionName = this.sectionName;
                        // console.log(this.sections,this.pageId);
                        yield this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections });
                    }
                    if (this.loading) {
                        this.loading.dismiss();
                    }
                    this.presentAlert('Document updated successfully');
                    this._location.back();
                }
                catch (error) {
                    if (this.loading) {
                        this.loading.dismiss();
                    }
                    this.presentAlert('Document update failed');
                }
            }
        });
    }
    uploadImage(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_7__["ImageEditorComponent"],
                cssClass: 'custom-img-editor',
                componentProps: {
                    aspectRatioWidthVal: 1,
                    aspectRatioHeightVal: 1,
                },
            });
            yield modal.present();
            modal.onDidDismiss().then(res => {
                this.widgetData.coverImage.org = res.data || '';
            });
            //console.log(type);
            // for (let i = 0; i < files.length; i++) {
            //   let reader = new FileReader();
            //   reader.readAsDataURL(files.item(i))
            //   reader.onload = (event:any) => { // called once readAsDataURL is completed
            //     let base64Image:any = event.target.result;
            //     this.widgetData.coverImage.org = base64Image;
            //   }
            // }
        });
    }
    uploadPdf(file) {
        if (file[0]) {
            this.widgetData.pdfUrl = file[0];
            this.newFile = true;
        }
    }
    removeImage() {
        this.widgetData.coverImage.org = '';
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...'
            });
            yield this.loading.present();
        });
    }
};
EditDocumentPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] }
];
EditDocumentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit-document',
        template: __webpack_require__(/*! raw-loader!./edit-document.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-document/edit-document.page.html"),
        styles: [__webpack_require__(/*! ./edit-document.page.scss */ "./src/app/pages/widgets/edit-document/edit-document.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"],
        _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"]])
], EditDocumentPage);



/***/ })

}]);
//# sourceMappingURL=pages-widgets-edit-document-edit-document-module-es2015.js.map