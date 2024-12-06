(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["platform-videos-platform-videos-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/platform-videos/platform-videos.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/platform-videos/platform-videos.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\" />\r\n    </div>\r\n    <ion-title>Instagram Videos</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col size=\"4\">\r\n          <div class=\"upload-btn-wrapper\" style=\"display: block;margin-top: 12px;\">\r\n            <button class=\"upload-btn i-start\"> <i class=\"flaticon-null-16\"></i>upload video</button>\r\n            <input type=\"file\" (change)=\"uploadDocument($event, 'video')\" accept=\"video/*\" />\r\n          </div>\r\n          <ng-container *ngIf=\"video\">\r\n            <iframe [src]=\"video | safeItem: 'resourceUrl'\"></iframe>\r\n          </ng-container>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"4\">\r\n          <div class=\"upload-btn-wrapper\" style=\"display: block;margin-top: 12px;\">\r\n            <button class=\"upload-btn i-start\"> <i class=\"flaticon-null-16\"></i>upload Thumb</button>\r\n            <input type=\"file\" (change)=\"uploadDocument($event, 'image')\" accept=\"image/*\" />\r\n          </div>\r\n          <ng-container *ngIf=\"thumb\">\r\n            <img [src]=\"thumb\">\r\n          </ng-container>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"4\" class=\"flexCenter\">\r\n          <ion-button (click)=\"addItem()\">Add video</ion-button>\r\n        </ion-col>\r\n\r\n      </ion-row>\r\n\r\n      <ion-row style=\"margin-top: 4rem;\">\r\n        <ion-col size=\"12\">\r\n          <h3 text-center>{{instagramVideos.length ? 'Instagram Videos': 'No Videos Found'}}</h3>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <ng-container *ngIf=\"instagramVideos.length\">\r\n            <ion-list class=\"ion-no-padding row-border\">\r\n              <ion-reorder-group (ionItemReorder)=\"itemReorder($event)\" [disabled]=\"instagramVideos.length==1\"\r\n                class=\"ion-no-padding\">\r\n                <ion-item *ngFor=\"let item of instagramVideos; index as i\">\r\n                  <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row>\r\n                      <ion-col class=\"img\">\r\n                        <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                          <img [src]=\"item.thumbnail\">\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col class=\"name\">\r\n                        <p class=\"ion-text-capitalize\">\r\n                          <a [href]=\"item.link\" target=\"_blank\">{{item.link}}</a>\r\n                        </p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteItem(item.link)\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                        </ion-button>\r\n                      </ion-col>\r\n                      <ion-col class=\"reorder\">\r\n                        <ion-reorder>\r\n                          <div class=\"flat-sort\">\r\n                            <i class=\"flaticon-menu\"></i>\r\n                          </div>\r\n                        </ion-reorder>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ion-reorder-group>\r\n            </ion-list>\r\n          </ng-container>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"save()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/pipes/application-pipes.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pipes/application-pipes.module.ts ***!
  \***************************************************/
/*! exports provided: ApplicationPipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationPipesModule", function() { return ApplicationPipesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-ago.pipe */ "./src/app/pipes/date-ago.pipe.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe-item.pipe */ "./src/app/pipes/safe-item.pipe.ts");




let ApplicationPipesModule = class ApplicationPipesModule {
};
ApplicationPipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [],
        declarations: [
            _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
            _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
        ],
        exports: [
            _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
            _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
        ]
    })
], ApplicationPipesModule);



/***/ }),

/***/ "./src/app/pipes/date-ago.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/date-ago.pipe.ts ***!
  \****************************************/
/*! exports provided: DateAgoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateAgoPipe", function() { return DateAgoPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let DateAgoPipe = class DateAgoPipe {
    transform(value, args) {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }
};
DateAgoPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'dateAgo',
        pure: true
    })
], DateAgoPipe);



/***/ }),

/***/ "./src/app/pipes/safe-item.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/safe-item.pipe.ts ***!
  \*****************************************/
/*! exports provided: SafeItemPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeItemPipe", function() { return SafeItemPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let SafeItemPipe = class SafeItemPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        if (!value)
            return value;
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
};
SafeItemPipe.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
SafeItemPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'safeItem'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
], SafeItemPipe);



/***/ }),

/***/ "./src/app/platform-videos/platform-media.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/platform-videos/platform-media.service.ts ***!
  \***********************************************************/
/*! exports provided: PlatformMediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformMediaService", function() { return PlatformMediaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let PlatformMediaService = class PlatformMediaService {
    constructor(afs, fbStorage) {
        this.afs = afs;
        this.fbStorage = fbStorage;
    }
    getPlatformMedia() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                const docRef = this.afs.collection('platformMedia').doc('instagram');
                const query = yield docRef.get().toPromise();
                return query.exists ? query.data() : {};
            }
            catch (err) {
                console.error('Failed to get platform media', err);
                return {};
            }
        });
    }
    updatePlatformMedia(data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                const docRef = this.afs.collection('platformMedia').doc('instagram');
                const query = yield docRef.get().toPromise();
                if (query.exists) {
                    yield docRef.update(data);
                }
                else {
                    yield docRef.set(data);
                }
                return true;
            }
            catch (err) {
                console.error('updatePlatformMedia', err);
                return false;
            }
        });
    }
    getBase64FromFile(file) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (err) => {
                    reject(err);
                };
            });
        });
    }
    getUrlForUploadedFile(base64, route) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                const imgRef = this.fbStorage.ref(route);
                yield imgRef.putString(base64, 'data_url');
                const downloadURL = yield imgRef.getDownloadURL().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
                return downloadURL || '';
            }
            catch (err) {
                console.error('Error downloading file url', err);
            }
        });
    }
};
PlatformMediaService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] }
];
PlatformMediaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"]])
], PlatformMediaService);



/***/ }),

/***/ "./src/app/platform-videos/platform-videos.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/platform-videos/platform-videos.module.ts ***!
  \***********************************************************/
/*! exports provided: PlatformVideosPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformVideosPageModule", function() { return PlatformVideosPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _platform_videos_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./platform-videos.page */ "./src/app/platform-videos/platform-videos.page.ts");
/* harmony import */ var _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");








const routes = [
    {
        path: '',
        component: _platform_videos_page__WEBPACK_IMPORTED_MODULE_6__["PlatformVideosPage"]
    }
];
let PlatformVideosPageModule = class PlatformVideosPageModule {
};
PlatformVideosPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"]
        ],
        declarations: [_platform_videos_page__WEBPACK_IMPORTED_MODULE_6__["PlatformVideosPage"]],
    })
], PlatformVideosPageModule);



/***/ }),

/***/ "./src/app/platform-videos/platform-videos.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/platform-videos/platform-videos.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flexCenter, ion-col.reorder, ion-col.action {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.name p a {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGxhdGZvcm0tdmlkZW9zL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxwbGF0Zm9ybS12aWRlb3NcXHBsYXRmb3JtLXZpZGVvcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BsYXRmb3JtLXZpZGVvcy9wbGF0Zm9ybS12aWRlb3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNDRjs7QURDQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0VGOztBREFBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBQ0dGOztBREZFO0VBQ0Usb0JBQUE7RUFDQSxxQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7QUNJSjs7QUREQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0lGOztBRERBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUNJRiIsImZpbGUiOiJzcmMvYXBwL3BsYXRmb3JtLXZpZGVvcy9wbGF0Zm9ybS12aWRlb3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZsZXhDZW50ZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5pb24tY29sLmltZyB7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5uYW1lIHtcclxuICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xyXG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzAwcHgpO1xyXG4gIHAgYSB7XHJcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcclxuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxufVxyXG5pb24tY29sLmFjdGlvbiB7XHJcbiAgd2lkdGg6IDEyOHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbiAgQGV4dGVuZCAuZmxleENlbnRlcjtcclxufVxyXG5pb24tY29sLnJlb3JkZXIge1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIG1heC13aWR0aDogNzVweDtcclxuICBAZXh0ZW5kIC5mbGV4Q2VudGVyO1xyXG59XHJcbiIsIi5mbGV4Q2VudGVyLCBpb24tY29sLnJlb3JkZXIsIGlvbi1jb2wuYWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmlvbi1jb2wuaW1nIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLm5hbWUge1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcbn1cbmlvbi1jb2wubmFtZSBwIGEge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHdpZHRoOiAxMjhweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5yZW9yZGVyIHtcbiAgd2lkdGg6IDc1cHg7XG4gIG1heC13aWR0aDogNzVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/platform-videos/platform-videos.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/platform-videos/platform-videos.page.ts ***!
  \*********************************************************/
/*! exports provided: PlatformVideosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformVideosPage", function() { return PlatformVideosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _platform_media_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./platform-media.service */ "./src/app/platform-videos/platform-media.service.ts");




let PlatformVideosPage = class PlatformVideosPage {
    constructor(sharedService, platformMediaService) {
        this.sharedService = sharedService;
        this.platformMediaService = platformMediaService;
        this.instagramVideos = [];
        this.video = '';
        this.thumb = '';
    }
    ngOnInit() { }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                yield this.sharedService.presentLoading();
                const response = yield this.platformMediaService.getPlatformMedia();
                yield this.sharedService.loading.dismiss();
                console.log('platformMedia', response);
                this.instagramVideos = 'list' in response ? response.list : [];
            }
            catch (err) {
                console.error('ionViewWillEnter error', err);
            }
        });
    }
    uploadDocument(event, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const file = event.target.files[0];
            console.log('file: ', file);
            const base64 = yield this.platformMediaService.getBase64FromFile(file);
            console.log('base64: ', base64);
            if (type === 'video') {
                this.video = base64;
            }
            else {
                this.thumb = base64;
            }
        });
    }
    addItem() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                if (!this.video || !this.thumb) {
                    this.sharedService.presentAlert('Please enter a video and thumbnail');
                    return;
                }
                const videoObj = {
                    active: true,
                    link: '',
                    thumbnail: ''
                };
                const timeStampString = new Date().getTime().toString();
                yield this.sharedService.presentLoading('Please Wait...', 10000);
                const videoRoute = `platformVideos/instagram/${timeStampString}/video`;
                videoObj.link = yield this.platformMediaService.getUrlForUploadedFile(this.video, videoRoute);
                const thumbRoute = `platformVideos/instagram/${timeStampString}/thumb`;
                videoObj.thumbnail = yield this.platformMediaService.getUrlForUploadedFile(this.thumb, thumbRoute);
                yield this.sharedService.loading.dismiss();
                console.log('videoObj', videoObj);
                this.instagramVideos.push(videoObj);
                this.video = '';
                this.thumb = '';
            }
            catch (err) {
                console.error('add item err', err);
            }
        });
    }
    deleteItem(link) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                const matchedItem = this.instagramVideos.findIndex(el => el.link === link);
                if (matchedItem > -1) {
                    this.instagramVideos.splice(matchedItem, 1);
                }
            }
            catch (err) {
                console.error('deleing item err');
            }
        });
    }
    save() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                yield this.sharedService.presentLoading();
                const res = yield this.platformMediaService.updatePlatformMedia({ list: this.instagramVideos });
                yield this.sharedService.loading.dismiss();
                console.log('save res', res);
                if (res) {
                    yield this.sharedService.presentAlert('Successfully Saved');
                }
                else {
                    yield this.sharedService.presentAlert('Something went wrong!');
                }
            }
            catch (err) {
                console.error('saving item err', err);
            }
        });
    }
    itemReorder(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
                const b = this.instagramVideos[event.detail.from];
                this.instagramVideos[event.detail.from] = this.instagramVideos[event.detail.to];
                this.instagramVideos[event.detail.to] = b;
                event.detail.complete();
            }
            catch (err) {
                console.error('itemReorder error', err);
            }
        });
    }
};
PlatformVideosPage.ctorParameters = () => [
    { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"] },
    { type: _platform_media_service__WEBPACK_IMPORTED_MODULE_3__["PlatformMediaService"] }
];
PlatformVideosPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-platform-videos',
        template: __webpack_require__(/*! raw-loader!./platform-videos.page.html */ "./node_modules/raw-loader/index.js!./src/app/platform-videos/platform-videos.page.html"),
        styles: [__webpack_require__(/*! ./platform-videos.page.scss */ "./src/app/platform-videos/platform-videos.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"],
        _platform_media_service__WEBPACK_IMPORTED_MODULE_3__["PlatformMediaService"]])
], PlatformVideosPage);



/***/ })

}]);
//# sourceMappingURL=platform-videos-platform-videos-module-es2015.js.map