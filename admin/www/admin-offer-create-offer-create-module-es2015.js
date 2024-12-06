(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-offer-create-offer-create-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/offer-create/offer-create.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/offer-create/offer-create.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"offer-settings\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center *ngIf=\"!offerData\">New offer</ion-title>\r\n    <ion-title text-center *ngIf=\"offerData\">Edit offer</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div class=\"oc-wrapper\">\r\n    <div class=\"oc-data-container\">\r\n      <div class=\"oc-headings\">Offer Name</div>\r\n      <ion-input type=\"text\" [(ngModel)]=\"name\"></ion-input>\r\n    </div>\r\n\r\n    <div class=\"oc-data-container\">\r\n      <div class=\"oc-headings\">Offer Description</div>\r\n      <ckeditor [(ngModel)]=\"description\" [config]=\"ckeConfig\"></ckeditor>\r\n    </div>\r\n\r\n    <div class=\"oc-upload-imgs\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <button  class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>Upload (Max 3)</button>\r\n        <input  type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" />\r\n      </div>\r\n      <div>\r\n        (Best size 1500px X 900px)\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"img-container\" *ngIf=\"images.length\">\r\n        <div class=\"img-wrap\" *ngFor=\"let img of images; let i=index\">\r\n          <img class=\"category-img\" [src]=\"img.url\" />\r\n          <div class=\"overlay\">\r\n            <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n            (click)=\"removeImage(i)\">\r\n              <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n            </ion-button>\r\n          </div>\r\n        </div>\r\n    </div>\r\n\r\n    \r\n    <ion-row>\r\n      <ion-col size=\"12\">\r\n        <p class=\"left-align\">Offer Linking</p>\r\n        <ion-list>\r\n          <ion-radio-group [value]=\"bannerData.link.type\">\r\n              <ion-item class=\"bs-links\" *ngFor=\"let link of linkTypes; let i=index;\"\r\n                  lines=\"none\" (click)=\"selectLinkType(i)\">\r\n                  <ion-radio slot=\"start\" [value]=\"link\"></ion-radio>\r\n                  <ion-label *ngIf=\"link === 'subcategory'\">\r\n                    Subcategory : <ng-container *ngIf=\"(link === bannerData.link.type) \">{{bannerData.link.name}}</ng-container>\r\n                  </ion-label>\r\n                  <ion-label *ngIf=\"link != 'subcategory'\">\r\n                      {{link}} : <ng-container *ngIf=\"(link === bannerData.link.type) \">{{bannerData.link.name}}</ng-container>\r\n                  </ion-label>\r\n              </ion-item>\r\n          </ion-radio-group>\r\n\r\n      </ion-list>\r\n      </ion-col>\r\n    </ion-row>\r\n    \r\n\r\n\r\n  </div>\r\n  <div class=\"page-footer\">\r\n  <ion-button (click)=\"saveOffer()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n    <i class=\"flaticon-null-20 margin-icon\"></i>\r\n    Save offer\r\n  </ion-button>\r\n  </div>\r\n  </div>\r\n  \r\n</ion-content>\r\n<!-- \r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveOffer()\"shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save offer\r\n    </ion-button>\r\n  </div>\r\n</ion-footer> -->\r\n"

/***/ }),

/***/ "./src/app/admin/offer-create/offer-create.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/offer-create/offer-create.module.ts ***!
  \***********************************************************/
/*! exports provided: OfferCreatePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferCreatePageModule", function() { return OfferCreatePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _offer_create_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offer-create.page */ "./src/app/admin/offer-create/offer-create.page.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");









const routes = [
    {
        path: '',
        component: _offer_create_page__WEBPACK_IMPORTED_MODULE_6__["OfferCreatePage"]
    }
];
let OfferCreatePageModule = class OfferCreatePageModule {
};
OfferCreatePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"],
            src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__["ApplicationDirectivesModule"]
        ],
        declarations: [_offer_create_page__WEBPACK_IMPORTED_MODULE_6__["OfferCreatePage"]]
    })
], OfferCreatePageModule);



/***/ }),

/***/ "./src/app/admin/offer-create/offer-create.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/admin/offer-create/offer-create.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".oc-wrapper {\n  font-size: 14px;\n}\n\n.oc-headings {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\n.oc-data-container ion-input {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.oc-upload-imgs {\n  text-align: center;\n  margin-top: 15px;\n}\n\n.oc-upload-imgs div:first-child {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.oc-upload-imgs div:first-child div {\n  opacity: 0.7;\n}\n\n.oc-upload-imgs div:nth-child(2) {\n  opacity: 0.7;\n  margin-top: 5px;\n}\n\n.oc-offer-imgs div {\n  max-width: 100%;\n  position: relative;\n  text-align: center;\n}\n\n.oc-offer-imgs div img {\n  width: 90%;\n  height: 20vh;\n  margin: 10px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border: 1px solid #ccc;\n}\n\n.oc-offer-imgs div div {\n  position: absolute;\n  top: 0px;\n  right: 10px;\n  font-size: 20px;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: white;\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 15px;\n  margin-left: 5px;\n}\n\n.page-footer {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vb2ZmZXItY3JlYXRlL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcb2ZmZXItY3JlYXRlXFxvZmZlci1jcmVhdGUucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9vZmZlci1jcmVhdGUvb2ZmZXItY3JlYXRlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDQ0o7O0FEQUk7RUFDSSxZQUFBO0FDRVI7O0FERUE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURBSTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0tBQUEsbUJBQUE7RUFDQSxzQkFBQTtBQ0VSOztBREFJO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNFUjs7QURFQTtFQUNJLHVDQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVFO0VBQ0UsMENBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUU7RUFDRSxnQkFBQTtBQ0NKOztBREVFO0VBQ0UsWUFBQTtBQ0NKOztBREVFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FERUU7RUFDRSxrQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vb2ZmZXItY3JlYXRlL29mZmVyLWNyZWF0ZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub2Mtd3JhcHBlciB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5vYy1oZWFkaW5ncyB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLm9jLWRhdGEtY29udGFpbmVyIGlvbi1pbnB1dCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4ub2MtdXBsb2FkLWltZ3Mge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG5cclxuLm9jLXVwbG9hZC1pbWdzIGRpdjpmaXJzdC1jaGlsZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgZGl2IHtcclxuICAgICAgICBvcGFjaXR5OiAuNztcclxuICAgIH1cclxufVxyXG5cclxuLm9jLXVwbG9hZC1pbWdzIGRpdjpudGgtY2hpbGQoMikge1xyXG4gICAgb3BhY2l0eTogLjc7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbn1cclxuXHJcbi5vYy1vZmZlci1pbWdzIGRpdiB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBpbWcge1xyXG4gICAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHZoO1xyXG4gICAgICAgIG1hcmdpbjogMTBweDtcclxuICAgICAgICBvYmplY3QtZml0OiBjb250YWluO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICB9XHJcbiAgICBkaXYge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDBweDtcclxuICAgICAgICByaWdodDogMTBweDtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jYW5jZWwtYnRuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIGNvbG9yOiB3aGl0ZVxyXG4gIH1cclxuICBcclxuICAuc2F2ZS1idG4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY29sb3I6IHdoaXRlXHJcbiAgfVxyXG4gIFxyXG4gIC5tYXJnaW4taWNvbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWZvb3RlciBpb24tdGl0bGUge1xyXG4gICAgaGVpZ2h0OiA0NXB4O1xyXG4gIH1cclxuXHJcbiAgLmJvdHRvbS1idXR0b25zIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG5cclxuICAucGFnZS1mb290ZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfSIsIi5vYy13cmFwcGVyIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ub2MtaGVhZGluZ3Mge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ub2MtZGF0YS1jb250YWluZXIgaW9uLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ub2MtdXBsb2FkLWltZ3Mge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG5cbi5vYy11cGxvYWQtaW1ncyBkaXY6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5vYy11cGxvYWQtaW1ncyBkaXY6Zmlyc3QtY2hpbGQgZGl2IHtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4ub2MtdXBsb2FkLWltZ3MgZGl2Om50aC1jaGlsZCgyKSB7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ub2Mtb2ZmZXItaW1ncyBkaXYge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLm9jLW9mZmVyLWltZ3MgZGl2IGltZyB7XG4gIHdpZHRoOiA5MCU7XG4gIGhlaWdodDogMjB2aDtcbiAgbWFyZ2luOiAxMHB4O1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xufVxuLm9jLW9mZmVyLWltZ3MgZGl2IGRpdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIHJpZ2h0OiAxMHB4O1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5jYW5jZWwtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5zYXZlLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubWFyZ2luLWljb24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5pb24tZm9vdGVyIGlvbi10aXRsZSB7XG4gIGhlaWdodDogNDVweDtcbn1cblxuLmJvdHRvbS1idXR0b25zIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4ucGFnZS1mb290ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/offer-create/offer-create.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/offer-create/offer-create.page.ts ***!
  \*********************************************************/
/*! exports provided: OfferCreatePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferCreatePage", function() { return OfferCreatePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../admin-banners/banner-linking-modal/banner-linking-modal.page */ "./src/app/admin/admin-banners/banner-linking-modal/banner-linking-modal.page.ts");








let OfferCreatePage = class OfferCreatePage {
    constructor(events, loadingController, alertController, toastController, router, camera, modalController, actionSheetController, imagePicker, labelService, route) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.router = router;
        this.camera = camera;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.imagePicker = imagePicker;
        this.labelService = labelService;
        this.route = route;
        this.name = '';
        this.description = '';
        this.images = [];
        this.offerId = '';
        // Offer Linking
        this.linkTypes = [];
        this.bannerData = {};
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.offerData = this.router.getCurrentNavigation().extras.state.offerData;
                this.name = this.offerData.name;
                this.description = this.offerData.description;
                this.sortedAt = this.offerData.sortedAt;
                this.images = this.offerData.images;
                this.offerId = this.offerData.id;
                this.bannerData = this.offerData.link;
                //console.log('offerData', this.offerData);
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
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
        this.linkTypes = [
            this.BANNER_SETTINGS_LABELS['none'],
            this.BANNER_SETTINGS_LABELS['product'],
            this.BANNER_SETTINGS_LABELS['category'],
            'subcategory',
            this.BANNER_SETTINGS_LABELS['brand'],
            this.BANNER_SETTINGS_LABELS['service']
        ];
        this.prepareData(this.bannerData);
    }
    prepareData(data) {
        if (!data) {
            data = {
                active: true,
                org: '',
                link: {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                }
            };
        }
        else {
            if (!data.hasOwnProperty('active')) {
                data['active'] = true;
            }
            if (!data.hasOwnProperty('link')) {
                data['link'] = {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                };
            }
        }
        this.bannerData = data;
        console.log('changes datas', this.bannerData);
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('offer:saveOfferSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Offer data saved successfully. Any images added will be uploaded after couple of minutes.');
        });
        this.events.subscribe('offer:deleteOfferSucess', () => {
            this.loading.dismiss();
            this.presentAlert('Offer deleted successfully!');
        });
    }
    saveOffer() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.name) {
                this.presentAlert('Please enter offer name');
            }
            else {
                yield this.presentLoading('Saving offer data...', 20000);
                const offerData = {
                    name: this.name,
                    description: this.description,
                    sortedAt: this.sortedAt,
                    link: this.bannerData
                };
                if (!this.offerId) {
                    offerData['sortedAt'] = new Date();
                }
                this.events.publish('offer:saveOffer', offerData, this.images, this.offerId);
            }
        });
    }
    deleteAlertConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this offer?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.deleteOffer();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteOffer() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Deleting offer...', 5000);
            this.events.publish('offer:deleteOffer', this.offerId);
        });
    }
    openImageActionSheet() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Select any option',
                buttons: [{
                        text: 'Camera',
                        icon: 'camera',
                        handler: () => {
                            this.uploadSingleImage('camera');
                        }
                    }, {
                        text: 'Crop and upload from gallery',
                        icon: 'image',
                        handler: () => {
                            this.uploadSingleImage('gallery');
                        }
                    }, {
                        text: 'Multiple images from gallery',
                        icon: 'images',
                        handler: () => {
                            this.uploadMultipleImages();
                        }
                    },
                    {
                        text: 'Cancel',
                        icon: 'close',
                        role: 'cancel',
                        handler: () => {
                            //console.log('Cancel clicked');
                        }
                    }]
            });
            yield actionSheet.present();
        });
    }
    uploadSingleImage(type) {
        const options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        if (type === 'gallery') {
            options['sourceType'] = 0;
        }
        this.camera.getPicture(options).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.images.push({ url: base64Image });
        }, (err) => {
            //console.log(err);
        });
    }
    uploadMultipleImages() {
        this.optionsforGallery = {
            quality: 50,
            outputType: 1
        };
        this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
            if (results.length !== 0 && results !== 'OK') {
                if (results.length <= 3) {
                    for (let i = 0; i < results.length; i++) {
                        const base64Img = 'data:image/jpeg;base64,' + results[i];
                        this.images.push({ url: base64Img });
                    }
                }
                else {
                    this.presentAlert('Please select maximum <strong>3</strong> images from gallery');
                }
            }
        }, (err) => {
            alert(err);
        });
    }
    uploadImage(files) {
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => {
                let base64Image = event.target.result;
                this.images.push({ url: base64Image });
            };
        }
    }
    removeImage(index) {
        this.images.splice(index, 1);
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'OK',
                        handler: () => {
                            this.router.navigate(['offer-settings']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading(msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: duration
            });
            yield this.loading.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('offer:saveOfferSuccess');
        this.events.unsubscribe('offer:deleteOfferSucess');
    }
    selectLinkType(i) {
        const type = this.linkTypes[i];
        this.bannerData.link.type = type;
        if (type === this.BANNER_SETTINGS_LABELS['product']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['category']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === 'subcategory') {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['service']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
            return null;
        }
        else {
            return null;
        }
        this.bannerData.link.ids = '';
        this.bannerData.link.name = '';
    }
    presentModal(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_7__["BannerLinkingModalPage"],
                cssClass: 'custom-modal',
                showBackdrop: true,
                backdropDismiss: false,
                componentProps: { linkType: type, linkId: this.bannerData.link.ids, currentType: this.bannerData.type }
            });
            modal.onDidDismiss()
                .then((res) => {
                console.log('data from modal', res);
                if (res.data) {
                    this.bannerData.link.ids = res.data.id;
                    if (res.data.id.length > 0) {
                        this.bannerData.link.id = res.data.id[0];
                    }
                    else {
                        this.bannerData.link.id = '';
                    }
                    if (res.data.name) {
                        this.bannerData.link.name = res.data.name;
                    }
                    if (res.data.hasOwnProperty('isSubcategories')) {
                        this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
                    }
                    if (type == 'subcategory') {
                        this.bannerData.link['categoryId'] = res.data.categoryId;
                    }
                    if (res.data.hasOwnProperty('serviceData')) {
                        this.bannerData.link['serviceData'] = res.data.serviceData;
                    }
                }
            });
            yield modal.present();
        });
    }
};
OfferCreatePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
    { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["ImagePicker"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
OfferCreatePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-offer-create',
        template: __webpack_require__(/*! raw-loader!./offer-create.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/offer-create/offer-create.page.html"),
        styles: [__webpack_require__(/*! ./offer-create.page.scss */ "./src/app/admin/offer-create/offer-create.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
        _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["ImagePicker"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__["LabelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
], OfferCreatePage);



/***/ })

}]);
//# sourceMappingURL=admin-offer-create-offer-create-module-es2015.js.map