(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-products-import-products-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-products/import-products.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-products/import-products.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Import Products</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div>\r\n    <ion-grid>\r\n      <ion-row class=\"ion-text-center\">\r\n          <ion-col size=\"4\" >\r\n            <ion-button class=\"csv-sample-btn\" [disabled]=\"isImporting\">\r\n              <a href=\"../../../assets/files/sample-csv-format.csv\" download>Download CSV FORMAT</a>\r\n              </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"4\">\r\n            <div class=\"upload-btn-wrapper\">\r\n              <button class=\"upload-btn btn-1 i-start\" [disabled]=\"isImporting\"> <i class=\"flaticon-null-16\"></i>Upload CSV</button>\r\n              <input type=\"file\" name=\"myfile\" (change)=\"convertFile($event)\" [disabled]=\"isImporting\" />\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"4\" *ngIf=\"!isImporting\">\r\n            <ion-button [disabled]=\"!isValidCSV\" (click)=\"importProducts()\">\r\n              Start Import Process\r\n             </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"4\" *ngIf=\"isImporting\">\r\n           <h3>Importing Products........</h3>\r\n          </ion-col>\r\n      </ion-row>\r\n      <ion-row class=\"ion-text-center\" *ngIf=\"jsonData && jsonData.length > 1 && isValidCSV\">\r\n        <ion-col>\r\n            <h2>{{jsonData.length - 1}} Products to be Imported </h2>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  \r\n    <div  class=\"table-container\">\r\n\r\n      <div class=\"head\" *ngIf=\"jsonData\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row>\r\n            <ion-col *ngFor=\"let item of headers; let i=index\">{{item}}</ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n      <div class=\"body\" *ngIf=\"jsonData\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ng-container *ngFor=\"let items of jsonData; let di=index\">\r\n          <ion-row *ngIf=\"di > 0\">\r\n            <ion-col [class.error]=\"true\" [ngClass]=\"{'imported':importedProducts[di]}\" *ngFor=\"let item of items; let i=index\">{{item}}</ion-col>\r\n          </ion-row>\r\n          </ng-container>\r\n        </ion-grid>\r\n      </div>\r\n\r\n      <div class=\"import-data\">\r\n        <h2>\r\n          CSV Import Rules:\r\n        </h2>\r\n        <p>\r\n          1. Format of CSV will be exactly similar to sample CSV which you can download by clicking on Download CSV FORMAT Button. \r\n        </p>\r\n        <p>\r\n          2. SKU is mandatory. Rest all fields you can leave empty. Don't delete or change order of any column. If you don't want to add data, just leave those fields empty.\r\n          Example: - if you want to update just price and discount price, just fill data in those 2 columns. \r\n        </p>\r\n        <p>\r\n          3. First row will be same header row present in sample and from 2nd row, your data will be entered. No other information.\r\n        </p>\r\n        <p>\r\n          4. Max 1000 products can be added or updated in a single process. \r\n        </p>\r\n        <p>\r\n          5. SKU should be unique and you need to maintian that in your csv. It would be easier for you to create different csv for different groups. \r\n        </p>\r\n        <br/>\r\n        <br/>\r\n        <h2>\r\n          CSV Import Rules:\r\n        </h2>\r\n        <p>\r\n          1. SKU : Mandatory\r\n          Unique Id like 1,2,3 or alphanumeric like PRD001, PRD 002 or VEG1,VEG2…FRUITS1,FRUITS2…. Or you can use unique product ids if you have.\r\n          Please keep these ids as safe because next time time when you update the product you will use only these ids to update. Make it according to your convenience. Keep short CSV for upto 500 products separated by categories or brands. It will be easy for you to manage.\r\n          Make sure these values are different for all csvs like for pulses csv, you can start with PUL1, PUL2…\r\n        </p>\r\n        <p>\r\n         2. NAME: Name of the product\r\n        </p>\r\n        <p>\r\n          3. ACTIVE: YES or NO. If YES, product will show to customer, if NO, product will not show to customer. You can change this anytime from admin panel\r\n         </p>\r\n         <p>\r\n          4. IS VARIANT: YES or NO. \r\n           No - for single price product\r\n           Yes - for variants\r\n           This option is to create multiple variants of the product like multiple weights, sizes, pieces, packs  or any other variants you like to create\r\n         </p>\r\n         <p>\r\n          5. VARIANT TYPE : YES or NO. Empty if variants is NO. If Variants is yes, choose weight, size, pieces, other.\r\n         </p>\r\n         <p>\r\n          6. VARIANT NAME : Empty if variants is NO. Variants separated by comma.\r\n          Weight example :                    1 Kg, 2 Kg, 3 Kg, 5 kg, 10 Kg\r\n          Size example : XXS, XS, S, M, L, XL, XXL, XXL\r\n          Pieces example: 100, 200, 500, 1000.  For pieces, just specify numbers and in case of variant as pieces, price will be per piece price.\r\n          Other example: pack of 2, pack of 3, pack of 10\r\n         </p>\r\n         <p>\r\n          7. PRICE : Numeric (Incl GST)\r\n          If variants is YES, all prices by comma separated like 100,200,300,400,500 where price is for respective variant\r\n         </p>\r\n         <p>\r\n          8. DISCOUNTED PRICE :  Numeric (Incl GST)\r\n          Discount % will be calculated automatically based on this price\r\n          If variants is yes, all discounted prices by comma separated like 80,180,280,380,480\r\n         </p>\r\n         <p>\r\n          9. PURCHASE PRICE : Numeric. Optional\r\n          Will be used for displaying profit reports in coming release. \r\n         </p>\r\n         <p>\r\n          10. QUANTITY :For inventory management\r\n          If variants is yes, all quantities by comma separated like 10,5,20,15,30,40\r\n         </p>\r\n         <p>\r\n          11. SHIPPING WEIGHT : (in Grams)\r\n          If variants is yes, all shipping weights by comma separated like 50,100,150, 200, 250\r\n         </p>\r\n         <p>\r\n          12. MIN QUANTITY : In number should be greater than 0. A customer has to order atleast this number to buy this product.\r\n          If variants is yes, it will be same for all variants\r\n         </p>\r\n         <p>\r\n          13. MAX QUANTITY :In number should be greater than 0 and minimum quantity. A Customer can't buy more than this number for this product.\r\n          If variants is yes, it will be same for all variants\r\n         </p>\r\n         <p>\r\n          14. DESCRIPTION : Text / HTML, Please note just basic HTML, no video or external scripts.\r\n         </p>\r\n         <p>\r\n          15. HSN CODE : FOR TAX Return Management\r\n         </p>\r\n         <p>\r\n          16. TAX: In Number , example:  5. Dont add % to this number.\r\n         </p>\r\n         <p>\r\n          17. COLOR: Name, hex code\r\n          Example :Red, #FF0000\r\n         </p>\r\n         <p>\r\n          18. KEYWORDS: All Keywords Separated by comma\r\n          Example: Aata, Flour, పిండి….. You can use any language. Add ing names in native language will help users to search with those names\r\n         </p>\r\n         <p>\r\n          19. OUT OF STOCK : YES /  No, if this is yes, system will show out of stock when quantity is 0. Please note, this will not work if there is no value in quantity.\r\n          Default value is NO\r\n         </p>\r\n         <p>\r\n          20. CATEGORIES - SUBCATEGORIES : All categories and subcategories semi colon separated. While writing subcategories add \"category-\" to subcategories.\r\n          Category Name 1; Category Name 1-Subcategory 1;  Category Name 1-Subcategory 2;  Category Name 2; Category Name 2-Subcategory 1;  Category Name 2-Subcategory 2;...\r\n          Please use exact names of categories and subcategories which you have created in admin panel. Make sure you don’t have multiple categories with same name.\r\n         </p>\r\n         <p>\r\n          21. BRANDS: Name of brands semi colon separated\r\n          brand1;brand2;brand3\r\n          Please use exact names of brands which you have created in admin panel.\r\n         </p>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/import-products/import-products.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/import-products/import-products.module.ts ***!
  \*****************************************************************/
/*! exports provided: ImportProductsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportProductsPageModule", function() { return ImportProductsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _import_products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./import-products.page */ "./src/app/admin/import-products/import-products.page.ts");







var routes = [
    {
        path: '',
        component: _import_products_page__WEBPACK_IMPORTED_MODULE_6__["ImportProductsPage"]
    }
];
var ImportProductsPageModule = /** @class */ (function () {
    function ImportProductsPageModule() {
    }
    ImportProductsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_import_products_page__WEBPACK_IMPORTED_MODULE_6__["ImportProductsPage"]]
        })
    ], ImportProductsPageModule);
    return ImportProductsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-products/import-products.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/import-products/import-products.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-wrap {\n  padding: 16px;\n}\n\nion-row {\n  flex-flow: nowrap;\n}\n\n.table-container {\n  padding: 16px 50px 25px 10px;\n  margin: 20px;\n  /*width: 100%;*/\n  overflow-x: scroll;\n}\n\n.table-container .head ion-col {\n  text-align: center;\n  background: #000;\n  color: #fff;\n  border-right: #000 1px solid;\n}\n\n.table-container .head ion-col:last-child {\n  border-right: 0;\n}\n\n.table-container .head ion-col:nth-child(1), .table-container .head ion-col:nth-child(3), .table-container .head ion-col:nth-child(4), .table-container .head ion-col:nth-child(5), .table-container .head ion-col:nth-child(6), .table-container .head ion-col:nth-child(7), .table-container .head ion-col:nth-child(8), .table-container .head ion-col:nth-child(9), .table-container .head ion-col:nth-child(10), .table-container .head ion-col:nth-child(11), .table-container .head ion-col:nth-child(12), .table-container .head ion-col:nth-child(13), .table-container .head ion-col:nth-child(15), .table-container .head ion-col:nth-child(17), .table-container .head ion-col:nth-child(18) {\n  width: 124px;\n  min-width: 124px;\n  max-width: 124px;\n}\n\n.table-container .head ion-col:nth-child(2), .table-container .head ion-col:nth-child(19), .table-container .head ion-col:nth-child(20), .table-container .head ion-col:nth-child(21), .table-container .head ion-col:nth-child(22) {\n  width: 250px;\n  min-width: 250px;\n  max-width: 250px;\n}\n\n.table-container .head ion-col:nth-child(14) {\n  width: 350px;\n  min-width: 350px;\n  max-width: 350px;\n}\n\n.table-container .head ion-col:nth-child(16) {\n  width: 300px;\n  min-width: 300px;\n  max-width: 300px;\n}\n\n.table-container .body ion-col {\n  background: #fff;\n  color: #000;\n  border-bottom: #ccc 1px solid;\n  border-right: #ccc 1px solid;\n}\n\n.table-container .body ion-col .error {\n  border: red 1px solid;\n}\n\n.table-container .body ion-col .error:before {\n  content: \"*\";\n}\n\n.table-container .body ion-col:last-child {\n  border-right: 0;\n}\n\n.table-container .body ion-col:nth-child(1), .table-container .body ion-col:nth-child(3), .table-container .body ion-col:nth-child(4), .table-container .body ion-col:nth-child(5), .table-container .body ion-col:nth-child(6), .table-container .body ion-col:nth-child(7), .table-container .body ion-col:nth-child(8), .table-container .body ion-col:nth-child(9), .table-container .body ion-col:nth-child(10), .table-container .body ion-col:nth-child(11), .table-container .body ion-col:nth-child(12), .table-container .body ion-col:nth-child(13), .table-container .body ion-col:nth-child(15), .table-container .body ion-col:nth-child(17), .table-container .body ion-col:nth-child(18) {\n  width: 124px;\n  min-width: 124px;\n  max-width: 124px;\n}\n\n.table-container .body ion-col:nth-child(2), .table-container .body ion-col:nth-child(19), .table-container .body ion-col:nth-child(20), .table-container .body ion-col:nth-child(21), .table-container .body ion-col:nth-child(22) {\n  width: 250px;\n  min-width: 250px;\n  max-width: 250px;\n}\n\n.table-container .body ion-col:nth-child(14) {\n  width: 350px;\n  min-width: 350px;\n  max-width: 350px;\n}\n\n.table-container .body ion-col:nth-child(16) {\n  width: 300px;\n  min-width: 300px;\n  max-width: 300px;\n}\n\n.csv-sample-btn a {\n  color: #fff !important;\n  text-decoration: none;\n}\n\n.imported {\n  background-color: #99FFCC !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LXByb2R1Y3RzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LXByb2R1Y3RzXFxpbXBvcnQtcHJvZHVjdHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtcHJvZHVjdHMvaW1wb3J0LXByb2R1Y3RzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUNDSjs7QURFQTtFQUFRLGlCQUFBO0FDRVI7O0FEREE7RUFDSSw0QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNJSjs7QUREUTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsNEJBQUE7QUNHWjs7QURGWTtFQUFhLGVBQUE7QUNLekI7O0FESlk7RUFlSSxZQUFBO0VBQWEsZ0JBQUE7RUFBaUIsZ0JBQUE7QUNOOUM7O0FEUVk7RUFDSSxZQUFBO0VBQWEsZ0JBQUE7RUFBaUIsZ0JBQUE7QUNKOUM7O0FETVk7RUFDSSxZQUFBO0VBQWEsZ0JBQUE7RUFBaUIsZ0JBQUE7QUNGOUM7O0FESVk7RUFDSSxZQUFBO0VBQWEsZ0JBQUE7RUFBaUIsZ0JBQUE7QUNBOUM7O0FETVE7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0FDSlo7O0FES1k7RUFDSSxxQkFBQTtBQ0hoQjs7QURJZ0I7RUFDSSxZQUFBO0FDRnBCOztBREtZO0VBQWEsZUFBQTtBQ0Z6Qjs7QURHWTtFQWVJLFlBQUE7RUFBYSxnQkFBQTtFQUFpQixnQkFBQTtBQ2I5Qzs7QURlWTtFQUNJLFlBQUE7RUFBYSxnQkFBQTtFQUFpQixnQkFBQTtBQ1g5Qzs7QURhWTtFQUNJLFlBQUE7RUFBYSxnQkFBQTtFQUFpQixnQkFBQTtBQ1Q5Qzs7QURXWTtFQUNJLFlBQUE7RUFBYSxnQkFBQTtFQUFpQixnQkFBQTtBQ1A5Qzs7QURhSTtFQUNJLHNCQUFBO0VBQ0EscUJBQUE7QUNWUjs7QURhQTtFQUNJLG9DQUFBO0FDVkoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9pbXBvcnQtcHJvZHVjdHMvaW1wb3J0LXByb2R1Y3RzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4td3JhcCB7XHJcbiAgICBwYWRkaW5nOiAxNnB4O1xyXG5cclxufVxyXG5pb24tcm93e2ZsZXgtZmxvdzpub3dyYXB9XHJcbi50YWJsZS1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMTZweCA1MHB4IDI1cHggMTBweDtcclxuICAgIG1hcmdpbjogMjBweDtcclxuICAgIC8qd2lkdGg6IDEwMCU7Ki9cclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIC5oZWFke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlvbi1jb2x7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAwO1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAjMDAwIDFweCBzb2xpZDtcclxuICAgICAgICAgICAgJjpsYXN0LWNoaWxke2JvcmRlci1yaWdodDowfVxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMyksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDQpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCg1KSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoNiksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDcpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCg4KSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoOSksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDEwKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMTEpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxMiksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDEzKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMTUpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxNyksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDE4KSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTI0cHg7bWluLXdpZHRoOiAxMjRweDttYXgtd2lkdGg6IDEyNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDIpLCAmOm50aC1jaGlsZCgxOSksICY6bnRoLWNoaWxkKDIwKSwgJjpudGgtY2hpbGQoMjEpLCY6bnRoLWNoaWxkKDIyKSAge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDI1MHB4O21pbi13aWR0aDogMjUwcHg7bWF4LXdpZHRoOiAyNTBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxNCkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM1MHB4O21pbi13aWR0aDogMzUwcHg7bWF4LXdpZHRoOiAzNTBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxNikge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMHB4O21pbi13aWR0aDogMzAwcHg7bWF4LXdpZHRoOiAzMDBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5ib2R5e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlvbi1jb2x7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAjY2NjIDFweCBzb2xpZDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAjY2NjIDFweCBzb2xpZDtcclxuICAgICAgICAgICAgLmVycm9ye1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyOnJlZCAxcHggc29saWQ7XHJcbiAgICAgICAgICAgICAgICAmOmJlZm9yZXtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnKic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJjpsYXN0LWNoaWxke2JvcmRlci1yaWdodDowfVxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMyksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDQpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCg1KSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoNiksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDcpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCg4KSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoOSksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDEwKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMTEpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxMiksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDEzKSxcclxuICAgICAgICAgICAgJjpudGgtY2hpbGQoMTUpLFxyXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgxNyksXHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDE4KSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTI0cHg7bWluLXdpZHRoOiAxMjRweDttYXgtd2lkdGg6IDEyNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDIpLCAmOm50aC1jaGlsZCgxOSksICY6bnRoLWNoaWxkKDIwKSwgJjpudGgtY2hpbGQoMjEpLCY6bnRoLWNoaWxkKDIyKSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUwcHg7bWluLXdpZHRoOiAyNTBweDttYXgtd2lkdGg6IDI1MHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDE0KSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzUwcHg7bWluLXdpZHRoOiAzNTBweDttYXgtd2lkdGg6IDM1MHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICY6bnRoLWNoaWxkKDE2KSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwcHg7bWluLXdpZHRoOiAzMDBweDttYXgtd2lkdGg6IDMwMHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi5jc3Ytc2FtcGxlLWJ0bntcclxuICAgIGF7XHJcbiAgICAgICAgY29sb3I6I2ZmZiAhaW1wb3J0YW50O1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIH1cclxufVxyXG4uaW1wb3J0ZWR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiM5OUZGQ0MgIWltcG9ydGFudDtcclxufSIsIi5idG4td3JhcCB7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbmlvbi1yb3cge1xuICBmbGV4LWZsb3c6IG5vd3JhcDtcbn1cblxuLnRhYmxlLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDE2cHggNTBweCAyNXB4IDEwcHg7XG4gIG1hcmdpbjogMjBweDtcbiAgLyp3aWR0aDogMTAwJTsqL1xuICBvdmVyZmxvdy14OiBzY3JvbGw7XG59XG4udGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2wge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXItcmlnaHQ6ICMwMDAgMXB4IHNvbGlkO1xufVxuLnRhYmxlLWNvbnRhaW5lciAuaGVhZCBpb24tY29sOmxhc3QtY2hpbGQge1xuICBib3JkZXItcmlnaHQ6IDA7XG59XG4udGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDEpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDMpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDQpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDUpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDYpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDcpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDgpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDkpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDEwKSwgLnRhYmxlLWNvbnRhaW5lciAuaGVhZCBpb24tY29sOm50aC1jaGlsZCgxMSksIC50YWJsZS1jb250YWluZXIgLmhlYWQgaW9uLWNvbDpudGgtY2hpbGQoMTIpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDEzKSwgLnRhYmxlLWNvbnRhaW5lciAuaGVhZCBpb24tY29sOm50aC1jaGlsZCgxNSksIC50YWJsZS1jb250YWluZXIgLmhlYWQgaW9uLWNvbDpudGgtY2hpbGQoMTcpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDE4KSB7XG4gIHdpZHRoOiAxMjRweDtcbiAgbWluLXdpZHRoOiAxMjRweDtcbiAgbWF4LXdpZHRoOiAxMjRweDtcbn1cbi50YWJsZS1jb250YWluZXIgLmhlYWQgaW9uLWNvbDpudGgtY2hpbGQoMiksIC50YWJsZS1jb250YWluZXIgLmhlYWQgaW9uLWNvbDpudGgtY2hpbGQoMTkpLCAudGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDIwKSwgLnRhYmxlLWNvbnRhaW5lciAuaGVhZCBpb24tY29sOm50aC1jaGlsZCgyMSksIC50YWJsZS1jb250YWluZXIgLmhlYWQgaW9uLWNvbDpudGgtY2hpbGQoMjIpIHtcbiAgd2lkdGg6IDI1MHB4O1xuICBtaW4td2lkdGg6IDI1MHB4O1xuICBtYXgtd2lkdGg6IDI1MHB4O1xufVxuLnRhYmxlLWNvbnRhaW5lciAuaGVhZCBpb24tY29sOm50aC1jaGlsZCgxNCkge1xuICB3aWR0aDogMzUwcHg7XG4gIG1pbi13aWR0aDogMzUwcHg7XG4gIG1heC13aWR0aDogMzUwcHg7XG59XG4udGFibGUtY29udGFpbmVyIC5oZWFkIGlvbi1jb2w6bnRoLWNoaWxkKDE2KSB7XG4gIHdpZHRoOiAzMDBweDtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cbi50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMDAwO1xuICBib3JkZXItYm90dG9tOiAjY2NjIDFweCBzb2xpZDtcbiAgYm9yZGVyLXJpZ2h0OiAjY2NjIDFweCBzb2xpZDtcbn1cbi50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbCAuZXJyb3Ige1xuICBib3JkZXI6IHJlZCAxcHggc29saWQ7XG59XG4udGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2wgLmVycm9yOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiKlwiO1xufVxuLnRhYmxlLWNvbnRhaW5lciAuYm9keSBpb24tY29sOmxhc3QtY2hpbGQge1xuICBib3JkZXItcmlnaHQ6IDA7XG59XG4udGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDEpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDMpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDQpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDUpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDYpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDcpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDgpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDkpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDEwKSwgLnRhYmxlLWNvbnRhaW5lciAuYm9keSBpb24tY29sOm50aC1jaGlsZCgxMSksIC50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbDpudGgtY2hpbGQoMTIpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDEzKSwgLnRhYmxlLWNvbnRhaW5lciAuYm9keSBpb24tY29sOm50aC1jaGlsZCgxNSksIC50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbDpudGgtY2hpbGQoMTcpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDE4KSB7XG4gIHdpZHRoOiAxMjRweDtcbiAgbWluLXdpZHRoOiAxMjRweDtcbiAgbWF4LXdpZHRoOiAxMjRweDtcbn1cbi50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbDpudGgtY2hpbGQoMiksIC50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbDpudGgtY2hpbGQoMTkpLCAudGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDIwKSwgLnRhYmxlLWNvbnRhaW5lciAuYm9keSBpb24tY29sOm50aC1jaGlsZCgyMSksIC50YWJsZS1jb250YWluZXIgLmJvZHkgaW9uLWNvbDpudGgtY2hpbGQoMjIpIHtcbiAgd2lkdGg6IDI1MHB4O1xuICBtaW4td2lkdGg6IDI1MHB4O1xuICBtYXgtd2lkdGg6IDI1MHB4O1xufVxuLnRhYmxlLWNvbnRhaW5lciAuYm9keSBpb24tY29sOm50aC1jaGlsZCgxNCkge1xuICB3aWR0aDogMzUwcHg7XG4gIG1pbi13aWR0aDogMzUwcHg7XG4gIG1heC13aWR0aDogMzUwcHg7XG59XG4udGFibGUtY29udGFpbmVyIC5ib2R5IGlvbi1jb2w6bnRoLWNoaWxkKDE2KSB7XG4gIHdpZHRoOiAzMDBweDtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cblxuLmNzdi1zYW1wbGUtYnRuIGEge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5pbXBvcnRlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OUZGQ0MgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/import-products/import-products.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/import-products/import-products.page.ts ***!
  \***************************************************************/
/*! exports provided: ImportProductsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportProductsPage", function() { return ImportProductsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var ImportProductsPage = /** @class */ (function () {
    function ImportProductsPage(papa, events, alertController, loadingController, afs) {
        this.papa = papa;
        this.events = events;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.afs = afs;
        this.isValidCSV = false;
        this.importedProducts = {};
        this.isImporting = false;
        this.needBrands = false;
        this.needCategories = false;
        this.allProducts = [];
        this.skuArr = [];
        this.importSkuArr = [];
        this.skuCount = 0;
        this.headers = ["SKU", "NAME", "BARCODE", "ACTIVE", "IS VARIANT", "VARIANT TYPE", "VARIANT NAME", "PRICE", "DISCOUNTED PRICE", "PURCHASE PRICE", "QUANTITY", "SHIPPING WEIGHT", "MIN QUANTITY", "MAX QUANTITY", "DESCRIPTION", "HSN CODE", "TAX", "COLOR", "KEYWORDS", "OUT OF STOCK", "CATEGORIES - SUBCATEGORIES", "BRANDS"];
    }
    ImportProductsPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.fetchCategoriesBrands();
        this.fetchAllProducts();
    };
    ImportProductsPage.prototype.fetchCategoriesBrands = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ImportProductsPage.prototype.presentAlert = function (heading, desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: heading,
                            message: desc,
                            buttons: ['Ok']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportProductsPage.prototype.initializeSubscriptions = function () {
    };
    ImportProductsPage.prototype.presentLoading = function (duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: "Please Wait...",
                                duration: duration ? duration : 10000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportProductsPage.prototype.fetchAllProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var productRef, allProductsref;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                productRef = this.afs.collection('products');
                allProductsref = productRef.get().subscribe(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        _this.allProducts.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: doc.id }, doc.data()));
                    });
                    for (var i = 0; i < _this.allProducts.length; i++) {
                        _this.skuArr.push(_this.allProducts[i].productCode);
                    }
                    console.log('all skus : ', _this.skuArr);
                });
                return [2 /*return*/];
            });
        });
    };
    ImportProductsPage.prototype.checkValidCsv = function (data) {
        var isValid = true;
        if (data[0].indexOf('sku') < 0 || data[0].length > 22) {
            isValid = false;
        }
        return isValid;
    };
    ImportProductsPage.prototype.convertFile = function (csv) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var csvFile, options;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.jsonData = [];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.isValidCSV = false;
                        this.isImporting = false;
                        this.importedProducts = {};
                        csvFile = csv.target.files[0];
                        options = {
                            complete: function (results, file) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var block, productsAll, impSkuArr, i;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    // console.log('Parsed: ', results, file);
                                    if (this.loading) {
                                        this.loading.dismiss();
                                    }
                                    if (results.data && results.data.length > 5001) {
                                        this.presentAlert('Product Limit Reached', 'Please import less than 1000 product in a single import process');
                                    }
                                    else {
                                        this.jsonData = results.data;
                                        block = false;
                                        productsAll = this.jsonData;
                                        impSkuArr = [];
                                        // console.log('productsAll : ', productsAll);
                                        for (i = 1; i < productsAll.length; i++) {
                                            impSkuArr.push(productsAll[i][0]);
                                            if (this.skuArr.includes(productsAll[i][0])) {
                                                console.log('matched!!!');
                                                this.skuCount += 1;
                                                block = false;
                                            }
                                            else {
                                                console.log('not matched!!!');
                                                block = true;
                                            }
                                        }
                                        console.log('SKU-JSON : ', impSkuArr);
                                        // if (impSkuArr.length) {
                                        //   if () {
                                        //     console.log('matched!!!');
                                        //     this.skuCount += 1
                                        //     block = false
                                        //   } else {
                                        //     console.log('not matched!!!');
                                        //     block = true
                                        //   }
                                        // }
                                        // if (this.checkValidCsv(this.jsonData) && block) {
                                        if (this.checkValidCsv(this.jsonData)) {
                                            this.isValidCSV = true;
                                            this.presentAlert('Products ready to import !', 'Please review all products and click on start Import Process');
                                        }
                                        else {
                                            this.presentAlert('Invalid CSV !', 'Please check that CSV upload is correct. Please download sample csv format to get correct CSV');
                                            if (this.skuCount > 0) {
                                                this.presentAlert('Matching SKU Alert!', 'There are product(s) in your CSV with matching SKUs to already existing products.');
                                                // block = false
                                            }
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); }
                            // Add your options here
                        };
                        this.papa.parse(csvFile, options);
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportProductsPage.prototype.importProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, i, catList, subCategories, brandsRef, brandsSnap, brandsDocs, catgeoryRef, catgeorySnap, catDocs, i, subcatgeoryRef, subcatgeorySnap, subCatDocs, matchingProds, _loop_1, this_1, i;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isImporting = true;
                        this.presentAlert('Import process Started !', 'It may take few mins. Please do not close the browser or go back. Products which are successfully imported will turn to green.');
                        products = this.jsonData;
                        for (i = 1; i < products.length; i++) {
                            if (products[i][20] && products[i][20] != '') {
                                this.needCategories = true;
                            }
                            if (products[i][21] && products[i][21] != '') {
                                this.needBrands = true;
                            }
                        }
                        catList = [];
                        subCategories = [];
                        if (!(!this.brands && this.needBrands)) return [3 /*break*/, 2];
                        this.brands = {};
                        brandsRef = this.afs.collection('brands');
                        brandsSnap = brandsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, brandsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise()];
                    case 1:
                        brandsDocs = _a.sent();
                        brandsDocs.forEach(function (brand) {
                            _this.brands[brand.name.toLowerCase().trim()] = brand.id;
                        });
                        _a.label = 2;
                    case 2:
                        if (!(!this.categories && this.needCategories)) return [3 /*break*/, 7];
                        this.categories = {};
                        catgeoryRef = this.afs.collection('categories');
                        catgeorySnap = catgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, catgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise()];
                    case 3:
                        catDocs = _a.sent();
                        catDocs.forEach(function (cat) {
                            _this.categories[cat.name.toLowerCase().trim()] = { id: cat.id, subcategories: {} };
                            catList.push({ id: cat.id, name: cat.name.toLowerCase().trim() });
                        });
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < catList.length)) return [3 /*break*/, 7];
                        subcatgeoryRef = this.afs.collection('categories').doc(catList[i]['id']).collection('subcategories');
                        subcatgeorySnap = subcatgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, subcatgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise()];
                    case 5:
                        subCatDocs = _a.sent();
                        subCatDocs.forEach(function (cat) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                this.categories[catList[i]['name']]['subcategories'][cat.name.toLowerCase().trim()] = cat.id;
                                return [2 /*return*/];
                            });
                        }); });
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        console.log('this.brands : ' + JSON.stringify(this.brands));
                        console.log('this.categories : ' + JSON.stringify(this.categories));
                        matchingProds = [];
                        _loop_1 = function () {
                            var item, orgProduct, prodId_1, product_1, formattedSKU_1, prodRef, productsSnap, pdtDocs, variantItems, priceItems, discountedPriceItems, purchasePriceItems, quantityItems, shippingItems, bds, cats, colorVals, keywords, bds, cats, colorVals, keywords, variantItems, priceItems_1, discountedPriceItems_1, purchasePriceItems_1, quantityItems_1, shippingItems_1;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = {
                                            sku: products[i][0],
                                            name: products[i][1],
                                            barcodeNo: products[i][2],
                                            active: products[i][3],
                                            variants: products[i][4],
                                            variantType: products[i][5],
                                            variantName: products[i][6],
                                            price: products[i][7],
                                            discountedPrice: products[i][8],
                                            purchasePrice: products[i][9],
                                            quantity: products[i][10],
                                            shippingWt: products[i][11],
                                            minQuantity: products[i][12],
                                            maxQuantity: products[i][13],
                                            productDescription: products[i][14],
                                            hsnCode: products[i][15],
                                            gst: products[i][16],
                                            color: products[i][17],
                                            keywords: products[i][18],
                                            out_of_stock: products[i][19],
                                            catSubcat: products[i][20],
                                            brands: products[i][21],
                                        };
                                        orgProduct = {};
                                        if (!item.sku) return [3 /*break*/, 2];
                                        prodId_1 = null, product_1 = {};
                                        formattedSKU_1 = '';
                                        if (item['sku'].includes('\t')) {
                                            formattedSKU_1 = item['sku'].slice(1);
                                        }
                                        else {
                                            formattedSKU_1 = item['sku'];
                                        }
                                        prodRef = this_1.afs.collection("products", function (ref) { return ref.where("productCode", "==", formattedSKU_1); });
                                        productsSnap = prodRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); }));
                                        return [4 /*yield*/, productsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise()];
                                    case 1:
                                        pdtDocs = _a.sent();
                                        console.log('pdtDocs : ', pdtDocs);
                                        if (pdtDocs) {
                                            pdtDocs.forEach(function (pdt) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                    prodId_1 = pdt.id;
                                                    orgProduct = pdt;
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        }
                                        if (prodId_1) {
                                            // if (productCode == item.sku) {
                                            //   console.log('match : ', item.name);
                                            //   matchingProds.push(item.name)
                                            //   console.log('mprds', matchingProds);
                                            //   if (matchingProds.length <= matchingProds.length - 1) {
                                            //     this.presentAlert('SKU already exists!', `Products with matching SKU Code are as follows :- ${matchingProds}`)
                                            //   }
                                            // }          
                                            if (item['name'] && item['name'].trim() != '') {
                                                product_1['prodName'] = item['name'] ? item['name'].trim() : '';
                                                product_1['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                            }
                                            if (item['active'] && item['active'].trim() != '') {
                                                product_1['status'] = item['active'] && item.active.toLowerCase() == 'yes' ? true : false;
                                            }
                                            product_1['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                            product_1['updatedAt'] = new Date();
                                            product_1['productType'] = '';
                                            product_1['isPriceList'] = item.variants && item.variants.toLowerCase() == 'yes' ? true : orgProduct && orgProduct.isPriceList ? orgProduct.isPriceList : false;
                                            if (!product_1['isPriceList']) {
                                                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                                    product_1['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                                }
                                                if (item['price'] && item['price'].trim() != '') {
                                                    product_1['prodPrice'] = parseFloat(item['price'].trim());
                                                }
                                                if (item['quantity'] && item['quantity'].trim() != '') {
                                                    product_1['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                                }
                                                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                                    product_1['shippingWeight'] = parseInt(item['shippingWt'].trim());
                                                }
                                                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                                    product_1['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
                                                }
                                            }
                                            else {
                                                product_1['priceList'] = orgProduct.priceList ? orgProduct.priceList : [];
                                                if (item['variantName'] && item['variantName'].trim() != '') {
                                                    variantItems = item['variantName'].split(',');
                                                    variantItems.forEach(function (variant, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['weight'] = variant.trim();
                                                    });
                                                }
                                                if (item['price'] && item['price'].trim() != '') {
                                                    priceItems = item['price'].split(',');
                                                    priceItems.forEach(function (price, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['price'] = price ? parseFloat(price.trim()) : 0;
                                                    });
                                                }
                                                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                                    discountedPriceItems = item['discountedPrice'].split(',');
                                                    discountedPriceItems.forEach(function (discountedPrice, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['discountedPrice'] = discountedPrice ? parseFloat(discountedPrice.trim()) : product_1['priceList'][index]['price'] ? parseFloat(product_1['priceList'][index]['price'].trim()) : 0;
                                                    });
                                                }
                                                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                                    purchasePriceItems = item['purchasePrice'].split(',');
                                                    purchasePriceItems.forEach(function (purchasePrice, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['purchasePrice'] = purchasePrice ? parseFloat(purchasePrice.trim()) : 0;
                                                    });
                                                }
                                                if (item['quantity'] && item['quantity'].trim() != '') {
                                                    quantityItems = item['quantity'].split(',');
                                                    quantityItems.forEach(function (quantity, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['totalQuantity'] = quantity ? quantity.trim() : '0';
                                                    });
                                                }
                                                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                                    shippingItems = item['shippingWt'].split(',');
                                                    shippingItems.forEach(function (shippingWt, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['shippingWeight'] = shippingWt ? shippingWt.trim() : '0';
                                                    });
                                                }
                                            }
                                            if (item['variantType'] && item['variantType'].trim() != '') {
                                                product_1['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                            }
                                            if (item['productDescription'] && item['productDescription'].trim() != '') {
                                                product_1['prodDesc'] = item['productDescription'] ? item['productDescription'].trim() : '';
                                            }
                                            if (item['hsnCode'] && item['hsnCode'].trim() != '') {
                                                product_1['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                            }
                                            if (item['gst'] && item['gst'].trim() != '') {
                                                product_1['gst'] = item['gst'] ? item['gst'] : 0;
                                            }
                                            if (item['brands'] && item['brands'].trim() != '') {
                                                product_1['brands'] = [];
                                                bds = item['brands'].split(";");
                                                bds.forEach(function (brand) {
                                                    brand = brand.toLowerCase().trim();
                                                    if (_this.brands[brand]) {
                                                        product_1['brands'].push(_this.brands[brand]);
                                                    }
                                                });
                                            }
                                            if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                                product_1['categories'] = [];
                                                cats = item['catSubcat'].split(";");
                                                // console.log(cats);
                                                cats.forEach(function (cat) {
                                                    cat = cat.toLowerCase().trim();
                                                    var catsubcat = cat.split("-");
                                                    if (catsubcat[0]) {
                                                        catsubcat[0] = catsubcat[0].trim();
                                                    }
                                                    if (catsubcat[1]) {
                                                        catsubcat[1] = catsubcat[1].trim();
                                                    }
                                                    if (catsubcat[0] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['id']) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['id']);
                                                    }
                                                    if (catsubcat[1] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && _this.categories[catsubcat[0]]['subcategories'] && _this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                                    }
                                                    // console.log(product['categories']);
                                                });
                                            }
                                            if (item['color'] && item['color'].trim() != '') {
                                                colorVals = item['color'].split(',');
                                                product_1['color'] = {
                                                    code: colorVals[1] ? colorVals[1].trim() : '',
                                                    name: colorVals[0] ? colorVals[0].trim() : ''
                                                };
                                            }
                                            if (item['keywords'] && item['keywords'].trim() != '') {
                                                product_1['searchKeywords'] = [];
                                                keywords = item['keywords'].split(',');
                                                keywords.forEach(function (key) {
                                                    product_1['searchKeywords'].push(key.trim());
                                                });
                                            }
                                            if (item['out_of_stock'] && item['out_of_stock'].trim() != '') {
                                                product_1['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                            }
                                            if (item['minQuantity'] && item['minQuantity'].trim() != '') {
                                                product_1['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                            }
                                            if (item['maxQuantity'] && item['maxQuantity'].trim() != '') {
                                                product_1['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                            }
                                            // console.log(product);
                                            this_1.afs.collection('products').doc(prodId_1).update(product_1);
                                        }
                                        else {
                                            product_1['productCode'] = item['sku'].trim();
                                            product_1['prodName'] = item['name'] ? item['name'].trim() : '';
                                            product_1['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                            product_1['productType'] = '';
                                            product_1['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                            product_1['createdAt'] = new Date();
                                            product_1['status'] = item['active'] && item.active.toLowerCase() == 'yes' ? true : false;
                                            product_1['updatedAt'] = new Date();
                                            product_1['sortedAt'] = new Date();
                                            product_1['isPriceList'] = item.variants && item.variants.toLowerCase() == 'yes' ? true : false;
                                            product_1['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                            product_1['prodDesc'] = item['productDescription'] ? item['productDescription'].trim() : '';
                                            product_1['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                            product_1['gst'] = item['gst'] ? item['gst'] : 0;
                                            product_1['categories'] = [];
                                            if (item['brands'] && item['brands'].trim() != '') {
                                                product_1['brands'] = [];
                                                bds = item['brands'].split(";");
                                                bds.forEach(function (brand) {
                                                    brand = brand.toLowerCase().trim();
                                                    if (_this.brands[brand]) {
                                                        product_1['brands'].push(_this.brands[brand]);
                                                    }
                                                });
                                            }
                                            if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                                product_1['categories'] = [];
                                                cats = item['catSubcat'].split(";");
                                                cats.forEach(function (cat) {
                                                    cat = cat.toLowerCase().trim();
                                                    var catsubcat = cat.split("-");
                                                    if (catsubcat[0]) {
                                                        catsubcat[0] = catsubcat[0].trim();
                                                    }
                                                    if (catsubcat[1]) {
                                                        catsubcat[1] = catsubcat[1].trim();
                                                    }
                                                    if (catsubcat[0] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['id']) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['id']);
                                                    }
                                                    if (catsubcat[1] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && _this.categories[catsubcat[0]]['subcategories'] && _this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                                    }
                                                });
                                            }
                                            product_1['images'] = [];
                                            product_1['coverPic'] = {
                                                url: 'assets/img/placeholder-img.jpg',
                                                mob: 'assets/img/placeholder-img.jpg',
                                                thumb: 'assets/img/placeholder-img.jpg'
                                            };
                                            if (item['color']) {
                                                colorVals = item['color'].split(',');
                                                product_1['color'] = {
                                                    code: colorVals[1] ? colorVals[1].trim() : '',
                                                    name: colorVals[0] ? colorVals[0].trim() : ''
                                                };
                                            }
                                            else {
                                                product_1['color'] = {};
                                            }
                                            product_1['searchKeywords'] = [];
                                            if (item['keywords']) {
                                                keywords = item['keywords'].split(',');
                                                keywords.forEach(function (key) {
                                                    product_1['searchKeywords'].push(key.trim());
                                                });
                                            }
                                            product_1['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                            product_1['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                            product_1['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                            product_1['priceList'] = [];
                                            if (!product_1['isPriceList']) {
                                                product_1['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                                product_1['prodPrice'] = item['price'] ? parseFloat(item['price'].trim()) : 0;
                                                product_1['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
                                                product_1['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                                product_1['shippingWeight'] = item['shippingWt'] ? item['shippingWt'].trim() : null;
                                            }
                                            else {
                                                if (item['variantName']) {
                                                    variantItems = item['variantName'].split(',');
                                                    priceItems_1 = item['price'].split(',');
                                                    discountedPriceItems_1 = item['discountedPrice'].split(',');
                                                    purchasePriceItems_1 = item['purchasePrice'].split(',');
                                                    quantityItems_1 = item['quantity'].split(',');
                                                    shippingItems_1 = item['shippingWt'].split(',');
                                                    variantItems.forEach(function (variant, index) {
                                                        product_1['priceList'].push({
                                                            price: priceItems_1[index] ? parseFloat(priceItems_1[index].trim()) : 0,
                                                            discountedPrice: discountedPriceItems_1[index] ? parseFloat(discountedPriceItems_1[index].trim()) : priceItems_1[index] ? parseFloat(priceItems_1[index].trim()) : 0,
                                                            purchasePrice: purchasePriceItems_1[index] ? parseFloat(purchasePriceItems_1[index].trim()) : 0,
                                                            weight: variant.trim(),
                                                            totalQuantity: quantityItems_1[index] ? quantityItems_1[index].trim() : '0',
                                                            shippingWeight: shippingItems_1[index] ? shippingItems_1[index].trim() : ''
                                                        });
                                                    });
                                                }
                                            }
                                            // console.log(product);
                                            this_1.afs.collection('products').add(product_1);
                                        }
                                        this_1.importedProducts[i] = true;
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 1;
                        _a.label = 8;
                    case 8:
                        if (!(i < products.length)) return [3 /*break*/, 11];
                        return [5 /*yield**/, _loop_1()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 8];
                    case 11:
                        this.isImporting = false;
                        this.presentAlert('Import process Finished !', 'Products which are in green colour are successfully imported.');
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportProductsPage.ctorParameters = function () { return [
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] }
    ]; };
    ImportProductsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-products',
            template: __webpack_require__(/*! raw-loader!./import-products.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-products/import-products.page.html"),
            styles: [__webpack_require__(/*! ./import-products.page.scss */ "./src/app/admin/import-products/import-products.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], ImportProductsPage);
    return ImportProductsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-products-import-products-module-es5.js.map