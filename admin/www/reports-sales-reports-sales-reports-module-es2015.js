(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-sales-reports-sales-reports-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/sales-reports/sales-reports.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/sales-reports/sales-reports.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Sales Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content> <div class=\"main-container\">\r\n  <div class=\"verticle-tab-container\">\r\n    <div class=\"tabs-buttons\">\r\n    <ion-button expand=\"full\" class=\"btn-1 tab-btn\">Sales</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\">Brands</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\">Products</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\">Services</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\">Brands</ion-button>\r\n    <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\">Tax</ion-button>\r\n    </div>\r\n    <div class=\"tabs-content\">\r\n      <ion-grid >\r\n        <ion-row>\r\n          <ion-col size=\"6\"><ion-item>\r\n            <ion-label>Start Date</ion-label>\r\n            <ion-datetime displayFormat=\"MM DD YYYY\" placeholder=\"Select Date\"></ion-datetime>\r\n          </ion-item></ion-col>\r\n          <ion-col size=\"6\"><ion-item>\r\n            <ion-label>End Date</ion-label>\r\n            <ion-datetime displayFormat=\"MM DD YYYY\" placeholder=\"Select Date\"></ion-datetime>\r\n          </ion-item></ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n      <div class=\"details\">\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"4\" class=\"ion-text-center\">\r\n              <h3>Total no of Orders</h3>\r\n              <p>567</p>\r\n            </ion-col>\r\n            <ion-col size=\"4\" class=\"ion-text-center\">\r\n              <h3>Total Sales</h3>\r\n              <p>Rs 10,265</p>\r\n            </ion-col>\r\n            <ion-col size=\"4\" class=\"ion-text-center\">\r\n              <h3>Total Profit</h3>\r\n              <p>Rs 1,265</p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n      <div class=\"chart-bx\">\r\n        <canvas #orderChart></canvas>\r\n      </div>\r\n\r\n      <div class=\"chart-bx\">\r\n        <canvas #salesChart></canvas>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/reports/sales-reports/sales-reports.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/reports/sales-reports/sales-reports.module.ts ***!
  \***************************************************************/
/*! exports provided: SalesReportsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesReportsPageModule", function() { return SalesReportsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sales_reports_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sales-reports.page */ "./src/app/reports/sales-reports/sales-reports.page.ts");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");








const routes = [
    {
        path: '',
        component: _sales_reports_page__WEBPACK_IMPORTED_MODULE_6__["SalesReportsPage"]
    }
];
let SalesReportsPageModule = class SalesReportsPageModule {
};
SalesReportsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_charts__WEBPACK_IMPORTED_MODULE_7__["ChartsModule"]
        ],
        declarations: [_sales_reports_page__WEBPACK_IMPORTED_MODULE_6__["SalesReportsPage"]]
    })
], SalesReportsPageModule);



/***/ }),

/***/ "./src/app/reports/sales-reports/sales-reports.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/reports/sales-reports/sales-reports.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  padding: 0;\n}\n\n.chart-bx {\n  margin: 26px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy9zYWxlcy1yZXBvcnRzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxyZXBvcnRzXFxzYWxlcy1yZXBvcnRzXFxzYWxlcy1yZXBvcnRzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy9zYWxlcy1yZXBvcnRzL3NhbGVzLXJlcG9ydHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQWdCLFVBQUE7QUNDaEI7O0FEQ0E7RUFBVSxjQUFBO0FDR1YiLCJmaWxlIjoic3JjL2FwcC9yZXBvcnRzL3NhbGVzLXJlcG9ydHMvc2FsZXMtcmVwb3J0cy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLm1haW4tY29udGFpbmVye3BhZGRpbmc6IDA7fVxyXG5cclxuLmNoYXJ0LWJ4e21hcmdpbjogMjZweCAwO30iLCIubWFpbi1jb250YWluZXIge1xuICBwYWRkaW5nOiAwO1xufVxuXG4uY2hhcnQtYngge1xuICBtYXJnaW46IDI2cHggMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/reports/sales-reports/sales-reports.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/reports/sales-reports/sales-reports.page.ts ***!
  \*************************************************************/
/*! exports provided: SalesReportsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesReportsPage", function() { return SalesReportsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let SalesReportsPage = class SalesReportsPage {
    constructor(router) {
        this.router = router;
        this.chartOptions = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
    }
    ngOnInit() {
    }
    goToPage(page) {
        this.router.navigate([page]);
    }
    ionViewDidEnter() {
        this.createOrdersChart();
        this.createSalesChart();
    }
    createOrdersChart() {
        this.bars = new chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"](this.barChart.nativeElement, {
            type: 'line',
            data: {
                labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
                datasets: [{
                        label: 'Orders',
                        data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
                        backgroundColor: 'rgb(38, 194, 129)',
                        borderColor: 'rgb(38, 194, 129)',
                        borderWidth: 1
                    }]
            },
            options: this.chartOptions
        });
    }
    createSalesChart() {
        this.bars = new chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"](this.salesChart.nativeElement, {
            type: 'line',
            data: {
                labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
                datasets: [{
                        label: 'Sales',
                        data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
                        backgroundColor: '#4b526d',
                        borderColor: '#373f5d',
                        borderWidth: 1
                    }]
            },
            options: this.chartOptions
        });
    }
};
SalesReportsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('orderChart', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SalesReportsPage.prototype, "barChart", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('salesChart', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SalesReportsPage.prototype, "salesChart", void 0);
SalesReportsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sales-reports',
        template: __webpack_require__(/*! raw-loader!./sales-reports.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/sales-reports/sales-reports.page.html"),
        styles: [__webpack_require__(/*! ./sales-reports.page.scss */ "./src/app/reports/sales-reports/sales-reports.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], SalesReportsPage);



/***/ })

}]);
//# sourceMappingURL=reports-sales-reports-sales-reports-module-es2015.js.map