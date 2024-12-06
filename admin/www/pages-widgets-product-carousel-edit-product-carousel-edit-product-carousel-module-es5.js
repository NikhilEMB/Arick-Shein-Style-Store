(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-product-carousel-edit-product-carousel-edit-product-carousel-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">{{title}}</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n  </div>\r\n</ion-header>\r\n\r\n\r\n  <ion-content>\r\n    <div class=\"main-container\">\r\n     <ion-grid *ngIf=\"widgetData\">\r\n       <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Section Name</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"title == 'Product List'\">\r\n          <!-- Showcase image upload -->\r\n          <div style=\"margin-top: 4px;\">\r\n            <div class=\"upload-btn-wrapper\">\r\n              <ion-button class=\"\" shape=\"round\">\r\n                 <i class=\"flaticon-null-16\"></i>&nbsp;Upload showcase image\r\n              </ion-button>\r\n              <input type=\"file\" name=\"myFile\" (change)=\"uploadShowcaseImg($event.target.files)\" />\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"imgUrlData\">\r\n            <div class=\"dFlex\">\r\n              <!-- <p>Background image Preview</p> -->\r\n              <ion-button shape=\"round\" size=\"small\" color=\"danger\" (click)=\"deleteShowcaseImage()\">\r\n                <i class=\"flaticon-null-21\"></i>&nbsp;\r\n                Delete showcase image\r\n              </ion-button>\r\n            </div>\r\n            <br>\r\n            <img  class=\"showcaseImage\" [src]='imgUrlData'>\r\n          </div>\r\n        </ion-col>\r\n\r\n         <div *ngIf=\"widgetData.type == 'product-carousel'\" class=\"flex-space-between\">\r\n            <div><ion-label>Show Products With Reel: </ion-label></div>\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle [checked]=\"productsWithReel\" [(ngModel)]=\"productsWithReel\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n\r\n        <ion-col size=\"12\">\r\n          <ion-button class=\"t-a-c\" (click)=\"saveWidget()\"  shape=\"round\" *ngIf=\"mode == 'new'\">\r\n            Save\r\n          </ion-button>\r\n          <ion-button class=\"t-a-c\" (click)=\"saveWidget()\"  shape=\"round\" *ngIf=\"mode == 'edit'\">\r\n            Update\r\n          </ion-button>\r\n        </ion-col>\r\n       </ion-row>\r\n     </ion-grid>\r\n\r\n     <div class=\"\" *ngIf=\"mode == 'edit'\">\r\n      <ion-button (click)=\"addNewProduct()\">Add Products</ion-button>\r\n      <div class=\"no-data ion-text-center\" *ngIf=\"noCaraouselProducts; else showCaraouselProducts\">\r\n        <img src=\"assets/img/no-product.png\" alt=\"\">\r\n        <h6>No Products</h6>\r\n      </div>\r\n      <ng-template #showCaraouselProducts>\r\n        <div *ngIf=\"title !== 'Product List'\" style=\"margin-top: 8px;\">\r\n          <ion-button (click)=\"addGroup()\" *ngIf=\"!vendorId\">Add Group</ion-button>\r\n          <!-- Group Table Start-->\r\n               <div *ngIf=\"widgetData.groups?.length\" class=\"m-t-10\">\r\n                 <h4 class=\"t-a-c\">Grouping of Product Carousel</h4>\r\n                 <p class=\"impText\" >Only 10 products per group allowed</p>\r\n                 <div class=\"tableArea\">\r\n                  <table>\r\n                    <thead>\r\n                      <tr>\r\n                        <th>S.No:</th>\r\n                        <!-- <th>Group Image</th> -->\r\n                        <th>Group Name</th>\r\n                        <th>Products</th>\r\n                        <th>Action</th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let group of widgetData.groups; let i=index;\">\r\n                        <td>{{i+1}}</td>\r\n                        <!-- <td style=\"width: 25%;\">\r\n                          <div class=\"imageWrapper\">\r\n                            <div class=\"upload-btn-wrapper\">\r\n                              <ion-button size=\"small\" shape=\"round\">upload image</ion-button>\r\n                              <input type=\"file\" name=\"myFile\" (change)=\"uploadGroupImage($event.target.files, i)\"/>\r\n                            </div>\r\n                            <img [src]=\"group.groupImg\" *ngIf=\"group.groupImg\" style=\"width: 20%;\" alt=\"\">\r\n                            <p *ngIf=\"!group.groupImg\">No Image</p>\r\n                          </div>\r\n                        </td> -->\r\n                        <td> {{group.name}}</td>\r\n                        <td class=\"prodTd\">\r\n                         <ion-select multiple placeholder=\"Select Products\" [value]=\"group.products\" [(ngModel)]=\"group.products\">\r\n                           <ion-select-option *ngFor=\"let item of caraouselProducts\" [value]=\"item.productID\">{{item.productData.prodName}}\r\n                           </ion-select-option>\r\n                         </ion-select>\r\n                        </td>\r\n                        <td>\r\n                          \r\n                      <i class=\"flaticon-null-21 cursor-p deleteIcon\" color=\"danger\"  (click)=\"removeGroup(i)\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                 </div>             \r\n               <ion-button color=\"success\" (click)=\"saveGroups()\" *ngIf=\"!vendorId\" style=\"margin-top: 8px;\">Save Groups</ion-button>\r\n             </div>\r\n             <ion-button color=\"success\" (click)=\"saveGroups()\" *ngIf=\"!vendorId && !widgetData.groups?.length\" style=\"margin-left: 8px;\">Save Groups</ion-button>\r\n          <!-- Group Table end -->\r\n\r\n         \r\n        </div>\r\n        \r\n       \r\n        <!-- heading -->\r\n        <div class=\"list-header\">\r\n          \r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row >\r\n              <ion-col class=\"img\">\r\n                <p>image</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p>name</p>\r\n              </ion-col>\r\n              <ion-col class=\"action\">\r\n                <p>Action</p>\r\n              </ion-col>\r\n              <ion-col class=\"reorder\">\r\n                <p>reorder</p>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n          </div>\r\n          <!-- heading -->\r\n           <!-- product  list -->\r\n           <div class=\"list-container\">\r\n       \r\n        <ion-list class=\"ion-no-padding row-border\" *ngIf=\"caraouselProducts; else loadingProducts\">\r\n          <ion-reorder-group (ionItemReorder)=\"onReorderProducts($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n            <div *ngFor=\"let item of caraouselProducts; let i = index\">\r\n            <ion-item *ngIf=\"item.productData\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"ion-align-items-center\">\r\n                    <ion-col class=\"img\">\r\n                      <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                        <img class=\"loading\" *ngIf=\"item.productData.coverPic && !item.productData.coverPic.thumb && item.productData.coverPic.url\" [src]=\"item.productData.coverPic.url\">\r\n                        <img class=\"loading\" *ngIf=\"item.productData.coverPic && item.productData.coverPic.thumb\" [src]=\"item.productData.coverPic.thumb\">\r\n                        <img *ngIf=\"!item.productData.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                      </ion-thumbnail>\r\n                    </ion-col>\r\n                    <ion-col class=\"name\">\r\n                      <p class=\"\">{{item.productData.prodName}}</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"action\">\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteCaraouselProductsConfirm(item.productID, i)\">\r\n                        <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                    </ion-col>\r\n                    <ion-col class=\"reorder\">\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n            </ion-item>\r\n            </div>\r\n          </ion-reorder-group>\r\n        </ion-list>\r\n        <ng-template #loadingProducts>\r\n          <ion-grid class=\"row-border ion-no-padding\" >\r\n            <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n              <ion-col size=\"3\">\r\n                <ion-thumbnail>\r\n                  <ion-skeleton-text style=\"margin: auto;\"></ion-skeleton-text>\r\n                </ion-thumbnail>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <h3>\r\n                  <ion-skeleton-text animated style=\"width: 90%;margin: auto;\"></ion-skeleton-text>\r\n                </h3>\r\n              </ion-col>\r\n              <ion-col size=\"3\">\r\n                <h3>\r\n                  <ion-skeleton-text animated style=\"width: 60%;margin: auto;\"></ion-skeleton-text>\r\n                </h3>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ng-template>\r\n           </div>\r\n       \r\n      </ng-template>\r\n       \r\n     </div>\r\n  </div>\r\n  </ion-content>\r\n  \r\n"

/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.module.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.module.ts ***!
  \******************************************************************************************************/
/*! exports provided: EditProductCarouselPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProductCarouselPageModule", function() { return EditProductCarouselPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_product_carousel_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-product-carousel.page */ "./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.ts");







var routes = [
    {
        path: '',
        component: _edit_product_carousel_page__WEBPACK_IMPORTED_MODULE_6__["EditProductCarouselPage"]
    }
];
var EditProductCarouselPageModule = /** @class */ (function () {
    function EditProductCarouselPageModule() {
    }
    EditProductCarouselPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_product_carousel_page__WEBPACK_IMPORTED_MODULE_6__["EditProductCarouselPage"]]
        })
    ], EditProductCarouselPageModule);
    return EditProductCarouselPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  position: static;\n  margin: 36px auto;\n}\n\n.list-container {\n  margin: 0;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.deleteIcon {\n  font-size: 20px;\n}\n\n.impText {\n  color: #cc0e0e;\n  margin-top: 0.5rem;\n  text-align: center;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.imageWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 8px;\n}\n\n.showcaseImage {\n  width: 30%;\n}\n\n.dFlex {\n  display: -webkit-box;\n  display: flex;\n}\n\n.prodTd {\n  max-width: 200px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvd2lkZ2V0cy9wcm9kdWN0LWNhcm91c2VsL2VkaXQtcHJvZHVjdC1jYXJvdXNlbC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxccGFnZXNcXHdpZGdldHNcXHByb2R1Y3QtY2Fyb3VzZWxcXGVkaXQtcHJvZHVjdC1jYXJvdXNlbFxcZWRpdC1wcm9kdWN0LWNhcm91c2VsLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvd2lkZ2V0cy9wcm9kdWN0LWNhcm91c2VsL2VkaXQtcHJvZHVjdC1jYXJvdXNlbC9lZGl0LXByb2R1Y3QtY2Fyb3VzZWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREVBO0VBQWdCLFNBQUE7QUNFaEI7O0FEQUE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUNHSjs7QURERTtFQUNFLHlCQUFBO0VBQ0EsNkJBQUE7QUNJSjs7QURGRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0tKOztBREhFO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUNNSjs7QURGSTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ0tKOztBREZBO0VBQ0UsZUFBQTtBQ0tGOztBREhBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUNNRjs7QURKQTtFQUNFLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDT0Y7O0FESkU7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNNSjs7QURKSTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ01OOztBREpJO0VBQ0UseUJBQUE7QUNNTjs7QURGQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsUUFBQTtBQ0tGOztBREhBO0VBQ0UsVUFBQTtBQ01GOztBREpBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtBQ09GIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvd2lkZ2V0cy9wcm9kdWN0LWNhcm91c2VsL2VkaXQtcHJvZHVjdC1jYXJvdXNlbC9lZGl0LXByb2R1Y3QtY2Fyb3VzZWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaGVhZGVye1xyXG4gICAgcG9zaXRpb246IHN0YXRpYztcclxuICAgIG1hcmdpbjozNnB4IGF1dG87XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lcnttYXJnaW46IDA7fVxyXG5cclxuaW9uLWNvbC5pbWd7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICBpb24tY29sLm5hbWV7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xyXG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbiAgfVxyXG4gIGlvbi1jb2wuYWN0aW9ue1xyXG4gICAgd2lkdGg6IDEyOHB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMDBweDtcclxuICB9XHJcbiAgaW9uLWNvbC5yZW9yZGVye1xyXG4gICAgd2lkdGg6IDc1cHg7XHJcbiAgICBtYXgtd2lkdGg6IDc1cHg7XHJcbiAgfVxyXG5cclxuICAuZGF0YS10YWJsZXsgIFxyXG4gICAgaW9uLWNvbHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4XHJcbiAgfVxyXG59XHJcbi5kZWxldGVJY29ue1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4uaW1wVGV4dCB7XHJcbiAgY29sb3I6IHJnYigyMDQsIDE0LCAxNCk7XHJcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4udGFibGVBcmVhe1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAvLyBwYWRkaW5nOiAwLjVyZW07XHJcblxyXG4gIHRhYmxlIHtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIFxyXG4gICAgdGQsXHJcbiAgICB0aCB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgfVxyXG4gICAgdHI6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4uaW1hZ2VXcmFwcGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxufVxyXG4uc2hvd2Nhc2VJbWFnZXtcclxuICB3aWR0aDogMzAlO1xyXG59XHJcbi5kRmxleHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4ucHJvZFRke1xyXG4gIG1heC13aWR0aDogMjAwcHg7XHJcbiAgLy8gaW9uLXNlbGVjdHtcclxuICAvLyAgIG1heC13aWR0aDogMjAwcHg7XHJcbiAgLy8gfVxyXG59IiwiLmxpc3QtaGVhZGVyIHtcbiAgcG9zaXRpb246IHN0YXRpYztcbiAgbWFyZ2luOiAzNnB4IGF1dG87XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMDtcbn1cblxuaW9uLWNvbC5pbWcge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzAwcHgpO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHdpZHRoOiAxMjhweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5yZW9yZGVyIHtcbiAgd2lkdGg6IDc1cHg7XG4gIG1heC13aWR0aDogNzVweDtcbn1cblxuLmRhdGEtdGFibGUgaW9uLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuLmRlbGV0ZUljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5pbXBUZXh0IHtcbiAgY29sb3I6ICNjYzBlMGU7XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuXG4uaW1hZ2VXcmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnNob3djYXNlSW1hZ2Uge1xuICB3aWR0aDogMzAlO1xufVxuXG4uZEZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4ucHJvZFRkIHtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.ts ***!
  \****************************************************************************************************/
/*! exports provided: EditProductCarouselPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProductCarouselPage", function() { return EditProductCarouselPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _product_list_modal_product_list_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../product-list-modal/product-list-modal.page */ "./src/app/pages/widgets/product-list-modal/product-list-modal.page.ts");
/* harmony import */ var _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/widgets/widgets.service */ "./src/app/services/widgets/widgets.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");














var EditProductCarouselPage = /** @class */ (function () {
    function EditProductCarouselPage(events, router, alertController, loadingController, modalController, activatedRoute, widgetsService, sharedServic, toastController, angularFirestore, storage, _location, configService) {
        //console.log('constructor');
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.modalController = modalController;
        this.activatedRoute = activatedRoute;
        this.widgetsService = widgetsService;
        this.sharedServic = sharedServic;
        this.toastController = toastController;
        this.angularFirestore = angularFirestore;
        this.storage = storage;
        this._location = _location;
        this.configService = configService;
        this.webSections = [];
        this.mode = 'new';
        this.noCaraouselProducts = true;
        this.pageId = '';
        this.productId = '';
        this.vendorId = '';
        this.imgUrlData = '';
        this.productsWithReel = false;
        this.widgetProductsLimit = this.configService.environment.widgetProductsLimit || 10;
    }
    EditProductCarouselPage.prototype.ngOnInit = function () {
    };
    EditProductCarouselPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID) {
                    this.widgetID = params.ID;
                    this.events.publish('widgets:getWidgetData', this.widgetID);
                }
                if (params && params.pageId) {
                    this.pageId = params.pageId;
                }
                if (params && params.vendorId) {
                    this.vendorId = params.vendorId;
                }
                if (params && params.type) {
                    this.widgetData = {
                        title: '',
                        type: params.type,
                    };
                    if (params.type == "product-carousel") {
                        this.title = "Product Carousel";
                    }
                    else {
                        this.title = "Product List";
                    }
                }
                if (params && params.index) {
                    this.sectionIndex = params.index;
                }
                if (params && params.productId) {
                    // console.log('cc');
                    this.productId = params.productId;
                }
                return [2 /*return*/];
            });
        }); });
        // console.log(this.productId);
        this.initializeSubscriptions();
        if (this.widgetData.type == "'product-carousel" && this.widgetData.sectionType == "video-products") {
            this.productsWithReel = true;
        }
        console.log('widgetdata', this.widgetData);
    };
    EditProductCarouselPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:publishCarouselProduct');
        this.events.unsubscribe('widgets:noCarouselProducts');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:widgetAddedSuccess');
        this.events.unsubscribe('widgets:widgetAddedError');
        this.events.unsubscribe('widgets:widgetUpdateSuccess');
        this.events.unsubscribe('widgets:widgetUpdateError');
        this.events.unsubscribe('widgets:deleteCarouselProductSuccess');
        this.events.unsubscribe('widgets:deleteCarouselProductError');
        this.events.unsubscribe('widgets:updateProductCaraouselPositionSuccess');
    };
    EditProductCarouselPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:publishCarouselProducts', function (data) {
            _this.caraouselProducts = data;
            console.log('carouselProd:', data);
            _this.noCaraouselProducts = false;
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
        this.events.subscribe('widgets:noCarouselProducts', function () {
            _this.noCaraouselProducts = true;
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
        this.events.subscribe('widgets:publishWidgetDataSuccess', function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sections;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.widgetData = data;
                        if (!this.widgetData.hasOwnProperty('groups')) {
                            this.widgetData['groups'] = [];
                        }
                        this.imgUrlData = this.widgetData.showcaseImg ? this.widgetData.showcaseImg : '';
                        console.log('widgetData:', data);
                        if (!(this.pageId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 1:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 3:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(this.vendorId != '')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 5:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        _a.label = 6;
                    case 6:
                        this.mode = 'edit';
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this.presentLoading();
                        this.events.publish('widgets:getCarouselProducts', this.widgetID);
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:widgetAddedSuccess', function (ID) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sectionRef;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (this.loading) {
                        //   this.loading.dismiss();
                        // }
                        this.widgetID = ID;
                        this.widget = {
                            widgetID: this.widgetID,
                            widgetType: this.widgetData.type,
                            sectionName: this.sectionName,
                            location: "all"
                        };
                        // if(this.widget.widgetType === "product-carousel"){
                        //   this.widget.sectionType = "video-products"
                        // }
                        if (this.widgetData.type == "'product-carousel" && this.productsWithReel == true) {
                            this.widgetData.sectionType == "video-products";
                        }
                        if (!(this.pageId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_9__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets')];
                    case 3:
                        sectionRef = _a.sent();
                        return [4 /*yield*/, sectionRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 4:
                        if (!!(_a.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, sectionRef.set({ sections: firebase__WEBPACK_IMPORTED_MODULE_9__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, sectionRef.update({ sections: firebase__WEBPACK_IMPORTED_MODULE_9__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        if (!(this.vendorId != '')) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_9__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!(this.widgetData.type == 'product-list')) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.widgetsService.setProductListImg(this.imgUrlData, this.widgetID)];
                    case 12:
                        _a.sent();
                        // console.log(this.imgUrlData);        
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        _a.label = 13;
                    case 13:
                        if (this.widgetData.type == 'product-list') {
                            this.sharedServic.presentAlert('Product List Saved Successfully, Now Start Adding Products');
                        }
                        else {
                            this.sharedServic.presentAlert('Carousel Saved Successfully, Now Start Adding Products');
                        }
                        this.mode = 'edit';
                        this.events.publish('widgets:getCarouselProducts', this.widgetID);
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this._location.back();
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:widgetAddedError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedServic.presentAlert('Some Error Occured, please try again');
        });
        this.events.subscribe('widgets:widgetUpdateSuccess', function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.widgetData.type == 'product-list')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.widgetsService.setProductListImg(this.imgUrlData, this.widgetID)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        if (this.widgetData.type == 'product-list') {
                            this.sharedServic.presentAlert('Product List Updated Successfully');
                        }
                        else {
                            this.sharedServic.presentAlert('Carousel Updated Successfully');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:widgetUpdateError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedServic.presentAlert('Some Error Occured, please try again');
        });
        this.events.subscribe('widgets:deleteCarouselProductSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedServic.presentAlert('Product Deleted Successfuly');
        });
        this.events.subscribe('widgets:deleteCarouselProductError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedServic.presentAlert('Some Error Occured, please try again');
        });
        this.events.subscribe('widgets:updateProductCaraouselPositionSuccess', function () {
            _this.events.publish('widgets:getCarouselProducts', _this.widgetID);
        });
    };
    EditProductCarouselPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProductCarouselPage.prototype.saveWidget = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var userRole;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.sectionName) return [3 /*break*/, 1];
                        this.presentAlert('Please Fill the name Properly');
                        return [3 /*break*/, 14];
                    case 1:
                        if (!(this.sectionName.length < 5)) return [3 /*break*/, 2];
                        this.presentAlert('Name should be atleast 5 characters');
                        return [3 /*break*/, 14];
                    case 2:
                        if (!(this.mode == 'new')) return [3 /*break*/, 3];
                        this.events.publish('widgets:addWidget', this.widgetData);
                        this.presentLoading();
                        return [3 /*break*/, 14];
                    case 3:
                        this.presentLoading();
                        if (this.sectionIndex) {
                            this.webSections[this.sectionIndex].sectionName = this.sectionName;
                            console.log('this.widgetData', this.widgetData);
                            console.log('this.productsWithReel ', this.productsWithReel);
                            if (this.widgetData.type == "product-carousel" && this.productsWithReel == true) {
                                // this.productsWithReel = true 
                                console.log('true');
                                this.webSections[this.sectionIndex].sectionType = "video-products";
                                console.log('this.webSections[this.sectionIndex].sectionType', this.webSections[this.sectionIndex].sectionType);
                            }
                        }
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 4:
                        userRole = _a.sent();
                        if (!(userRole !== 'vendor')) return [3 /*break*/, 11];
                        if (!(this.pageId != '')) return [3 /*break*/, 6];
                        console.log('insidde pg:', this.pageId);
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.webSections })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(this.productId != '')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').set({ 'sections': this.webSections })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        if (!(this.vendorId != '')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        if (!(userRole == 'vendor')) return [3 /*break*/, 13];
                        //let vendorId = await this.storage.get('uid');
                        console.log('vendor:', this.vendorId);
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        console.log('name:', this.sectionName);
                        this.events.publish('widgets:updateWidget', this.widgetData, this.widgetID);
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    EditProductCarouselPage.prototype.addNewProduct = function () {
        if (this.caraouselProducts && this.caraouselProducts.length > (this.widgetProductsLimit - 1) && this.vendorId == '') {
            this.presentAlert("Sorry, max " + this.widgetProductsLimit + " products can be added");
        }
        else {
            this.modalController.create({
                component: _product_list_modal_product_list_modal_page__WEBPACK_IMPORTED_MODULE_4__["ProductListModalPage"],
                cssClass: 'custom-modal',
                componentProps: {
                    'widgetID': this.widgetID,
                    'vendorId': this.vendorId
                }
            })
                .then(function (modalEl) {
                modalEl.present();
            });
        }
    };
    EditProductCarouselPage.prototype.deleteCaraouselProductsConfirm = function (id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this product?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        _this.deleteBestSellerProduct(id, index);
                                    }
                                }
                            ]
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
    EditProductCarouselPage.prototype.deleteBestSellerProduct = function (id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.caraouselProducts.splice(index, 1);
                        this.events.publish('widgets:deleteCarouselProduct', this.widgetID, id);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProductCarouselPage.prototype.onReorderProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var start, id, end, firstDate, secondDate, changedDate, changedDate, firstDate, secondDate, changedDate, changedDate, draggedItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        start = event.detail.from;
                        id = this.caraouselProducts[start].productID;
                        end = event.detail.to;
                        if (!(start < end && end !== this.caraouselProducts.length - 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.caraouselProducts[end].sortedAt.toDate().getTime()];
                    case 2:
                        firstDate = _a.sent();
                        return [4 /*yield*/, this.caraouselProducts[end + 1].sortedAt.toDate().getTime()];
                    case 3:
                        secondDate = _a.sent();
                        changedDate = (firstDate + secondDate) / 2;
                        // //console.log('finalDate', new Date(changedDate));
                        this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(start < end && end === this.caraouselProducts.length - 1)) return [3 /*break*/, 6];
                        // //console.log('from top to bottom');
                        console.log(this.caraouselProducts[end].sortedAt);
                        return [4 /*yield*/, this.caraouselProducts[end].sortedAt.toDate().getTime()];
                    case 5:
                        changedDate = (_a.sent()) - 5 * 60000;
                        this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
                        return [3 /*break*/, 11];
                    case 6:
                        if (!(start > end && end !== 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.caraouselProducts[end].sortedAt.toDate().getTime()];
                    case 7:
                        firstDate = _a.sent();
                        return [4 /*yield*/, this.caraouselProducts[end - 1].sortedAt.toDate().getTime()];
                    case 8:
                        secondDate = _a.sent();
                        changedDate = (firstDate + secondDate) / 2;
                        // //console.log('finalDate', new Date(changedDate));
                        this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.caraouselProducts[end].sortedAt.toDate().getTime()];
                    case 10:
                        changedDate = (_a.sent()) + 5 * 60000;
                        this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
                        _a.label = 11;
                    case 11:
                        draggedItem = this.caraouselProducts.splice(event.detail.from, 1)[0];
                        this.caraouselProducts.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProductCarouselPage.prototype.uploadShowcaseImg = function (files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i, reader;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.presentLoading();
                for (i = 0; i < files.length; i++) {
                    reader = new FileReader();
                    reader.readAsDataURL(files.item(i));
                    reader.onload = function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var base64Image, _a;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    base64Image = event.target.result;
                                    _a = this;
                                    return [4 /*yield*/, this.widgetsService.uploadImg(base64Image, this.widgetID)];
                                case 1:
                                    _a.imgUrlData = _b.sent();
                                    // console.log(base64Image);
                                    if (this.loading) {
                                        this.loading.dismiss();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                }
                return [2 /*return*/];
            });
        });
    };
    EditProductCarouselPage.prototype.deleteShowcaseImage = function () {
        this.imgUrlData = "";
        this.presentAlert('Background image deleted successfully');
    };
    EditProductCarouselPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
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
    EditProductCarouselPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
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
    EditProductCarouselPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditProductCarouselPage.prototype.addGroup = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Add Group',
                            inputs: [
                                {
                                    name: 'groupName',
                                    type: 'text',
                                    placeholder: 'Enter Group Name'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (data) {
                                        if (!data.groupName) {
                                            _this.presentToast('Please enter valid group name');
                                        }
                                        else {
                                            _this.widgetData['groups'].push({ name: data.groupName, groupImg: '', products: [] });
                                        }
                                    }
                                }
                            ]
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
    EditProductCarouselPage.prototype.removeGroup = function (index) {
        this.widgetData['groups'].splice(index, 1);
    };
    EditProductCarouselPage.prototype.saveGroups = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prodLength, _i, _a, group, success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('widgetData:', this.widgetData, ' id:', this.widgetID);
                        return [4 /*yield*/, this.sharedServic.presentLoading()];
                    case 1:
                        _b.sent();
                        if (this.widgetData.groups && this.widgetData.groups.length) {
                            for (_i = 0, _a = this.widgetData.groups; _i < _a.length; _i++) {
                                group = _a[_i];
                                prodLength = group.products.length;
                                console.log(prodLength);
                                if (prodLength > 10) {
                                    if (this.sharedServic.loading) {
                                        this.sharedServic.loading.dismiss();
                                    }
                                    this.sharedServic.presentAlert('Only 10 products per group allowed');
                                    return [2 /*return*/];
                                }
                            }
                        }
                        return [4 /*yield*/, this.widgetsService.updateWidgetData(this.widgetID, { groups: this.widgetData.groups })];
                    case 2:
                        success = _b.sent();
                        if (success) {
                            this.sharedServic.presentAlert('Data saved Successfully');
                            if (this.sharedServic.loading) {
                                this.sharedServic.loading.dismiss();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProductCarouselPage.prototype.uploadGroupImage = function (files, groupId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var groupImgUrl, i, reader;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.presentLoading();
                for (i = 0; i < files.length; i++) {
                    reader = new FileReader();
                    reader.readAsDataURL(files.item(i));
                    reader.onload = function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var base64Image;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    base64Image = event.target.result;
                                    return [4 /*yield*/, this.widgetsService.uploadGroupImg(base64Image, groupId, this.widgetID)];
                                case 1:
                                    groupImgUrl = _a.sent();
                                    this.widgetData.groups[groupId].groupImg = groupImgUrl;
                                    // console.log(this.widgetData.groups[groupId],groupImgUrl);
                                    if (this.loading) {
                                        this.loading.dismiss();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                }
                return [2 /*return*/];
            });
        });
    };
    EditProductCarouselPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_5__["WidgetsService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestore"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__["Location"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_12__["ConfigService"] }
    ]; };
    EditProductCarouselPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-product-carousel',
            template: __webpack_require__(/*! raw-loader!./edit-product-carousel.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.html"),
            styles: [__webpack_require__(/*! ./edit-product-carousel.page.scss */ "./src/app/pages/widgets/product-carousel/edit-product-carousel/edit-product-carousel.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_5__["WidgetsService"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestore"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"],
            _angular_common__WEBPACK_IMPORTED_MODULE_11__["Location"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_12__["ConfigService"]])
    ], EditProductCarouselPage);
    return EditProductCarouselPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-product-carousel-edit-product-carousel-edit-product-carousel-module-es5.js.map