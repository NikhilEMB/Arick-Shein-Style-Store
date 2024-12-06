(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sitemap-sitemap-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/sitemap/sitemap.page.html":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/sitemap/sitemap.page.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-menu-button slot=\"start\"\n      class=\"menu-btn\">\n      <ion-icon slot=\"icon-only\"\n        name=\"menu\"></ion-icon>\n    </ion-menu-button>\n    <div class=\"header-logo\"\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\n    <ion-title>Site Map</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content style=\"--background: white;\">\n  <div class=\"main-container\">\n    <div class=\"add-points-btn\">\n      <ion-button (click)=\"addSitemapModal()\">Add Sitemap</ion-button>\n    </div>\n\n    <div class=\"tableArea\">\n      <table>\n        <thead>\n          <tr class=\"header\">\n            <th>Sr No.</th>\n            <!-- <th>Date</th> -->\n            <th>Category</th>\n            <th>Products</th>\n            <th>Details</th>\n          </tr>\n        </thead>\n        <tbody>\n          <ng-container *ngIf=\"siteMapData && siteMapData.length\">\n            <tr *ngFor=\"let sitemap of siteMapData; index as i\">\n              <td>{{i + 1}}</td>\n              <!-- <td>{{ sitemap.createdAt.toDate() | date:'medium'}}</td> -->\n              <td>{{sitemap.category}}</td>\n              <td>\n                  <span *ngFor=\"let product of sitemap.products; let j = index\">\n                    {{product.name}}<span *ngIf=\"j < sitemap.products.length - 1\">, </span>\n                  </span>\n              </td>\n              <td><ion-icon style=\"font-size: 24px;\" name=\"eye\" (click)=\"editSitemap(sitemap)\"></ion-icon></td>\n            </tr>\n          </ng-container>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n</ion-content>\n"

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

/***/ "./src/app/sitemap/sitemap.module.ts":
/*!*******************************************!*\
  !*** ./src/app/sitemap/sitemap.module.ts ***!
  \*******************************************/
/*! exports provided: SitemapPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitemapPageModule", function() { return SitemapPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sitemap_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sitemap.page */ "./src/app/sitemap/sitemap.page.ts");
/* harmony import */ var _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");








const routes = [
    {
        path: '',
        component: _sitemap_page__WEBPACK_IMPORTED_MODULE_6__["SitemapPage"]
    }
];
let SitemapPageModule = class SitemapPageModule {
};
SitemapPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"]
        ],
        declarations: [_sitemap_page__WEBPACK_IMPORTED_MODULE_6__["SitemapPage"]]
    })
], SitemapPageModule);



/***/ }),

/***/ "./src/app/sitemap/sitemap.page.scss":
/*!*******************************************!*\
  !*** ./src/app/sitemap/sitemap.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-points-btn {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZW1hcC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcc2l0ZW1hcFxcc2l0ZW1hcC5wYWdlLnNjc3MiLCJzcmMvYXBwL3NpdGVtYXAvc2l0ZW1hcC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0NGOztBRENBO0VBQ0UsZ0JBQUE7RUFFQSxrQkFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FEQ0U7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNDSjs7QURDSTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NOOztBRENJO0VBQ0UseUJBQUE7QUNDTjs7QURFRTtFQUNFLHFCQUFBO0FDQUo7O0FERUU7RUFDRSxlQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zaXRlbWFwL3NpdGVtYXAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZC1wb2ludHMtYnRuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcbi50YWJsZUFyZWEge1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgLy8gYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgdGFibGUge1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIHRkLFxyXG4gICAgdGgge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgIH1cclxuICAgIHRyOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcclxuICAgIH1cclxuICB9XHJcbiAgLmhlYWRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XHJcbiAgfVxyXG4gIC5kZWxldGVJY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcbn1cclxuIiwiLmFkZC1wb2ludHMtYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuLnRhYmxlQXJlYSAuZGVsZXRlSWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/sitemap/sitemap.page.ts":
/*!*****************************************!*\
  !*** ./src/app/sitemap/sitemap.page.ts ***!
  \*****************************************/
/*! exports provided: SitemapPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitemapPage", function() { return SitemapPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_add_sitemap_add_sitemap_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin/add-sitemap/add-sitemap.page */ "./src/app/admin/add-sitemap/add-sitemap.page.ts");
/* harmony import */ var _services_sitemap_sitemap_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/sitemap/sitemap.service */ "./src/app/services/sitemap/sitemap.service.ts");





let SitemapPage = class SitemapPage {
    constructor(modalController, sitemapService) {
        this.modalController = modalController;
        this.sitemapService = sitemapService;
        this.siteMapData = [];
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.getAllSitemaps();
        });
    }
    getAllSitemaps() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.siteMapData = yield this.sitemapService.getAllSiteMaps();
            console.log('siteMapData', this.siteMapData);
        });
    }
    addSitemapModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _admin_add_sitemap_add_sitemap_page__WEBPACK_IMPORTED_MODULE_3__["AddSitemapPage"],
                cssClass: 'add-point-css',
            });
            modal.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (res.data) {
                    this.getAllSitemaps();
                }
            }));
            yield modal.present();
        });
    }
    getProductNameForSiteMap(products) {
        return products.map(branch => branch.name).join(', ');
    }
    editSitemap(sitemap) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _admin_add_sitemap_add_sitemap_page__WEBPACK_IMPORTED_MODULE_3__["AddSitemapPage"],
                cssClass: 'add-point-css',
                componentProps: {
                    sitemap: sitemap
                }
            });
            modal.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (res.data) {
                    this.getAllSitemaps();
                }
            }));
            yield modal.present();
        });
    }
};
SitemapPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _services_sitemap_sitemap_service__WEBPACK_IMPORTED_MODULE_4__["SitemapService"] }
];
SitemapPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sitemap',
        template: __webpack_require__(/*! raw-loader!./sitemap.page.html */ "./node_modules/raw-loader/index.js!./src/app/sitemap/sitemap.page.html"),
        styles: [__webpack_require__(/*! ./sitemap.page.scss */ "./src/app/sitemap/sitemap.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _services_sitemap_sitemap_service__WEBPACK_IMPORTED_MODULE_4__["SitemapService"]])
], SitemapPage);



/***/ })

}]);
//# sourceMappingURL=sitemap-sitemap-module-es2015.js.map