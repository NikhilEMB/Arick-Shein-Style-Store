(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-vouchers-create-voucher-create-voucher-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/vouchers/create-voucher/create-voucher.page.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/vouchers/create-voucher/create-voucher.page.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{editProductId ? 'Edit' : 'New' }} Voucher</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Description</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Categories and Brands</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Images</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <!-- Voucher -->\r\n  <super-tabs-container>\r\n    <!-- Basic -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>\r\n                        Voucher Name (please don't use \"/\" in name)\r\n                      </ion-label>\r\n                    </div>\r\n                    <div class=\"flex-label\" *ngIf=\"userRole != 'vendor'\">\r\n                      <ion-label>Show</ion-label>&nbsp;&nbsp;\r\n                      <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"voucher.status\"\r\n                              [disabled]=\"editShowDisable()\" (click)=\"updateNewProductStatus(voucher.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </div>\r\n                  </div>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"voucher.prodName\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label>Allow Payment</ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"allowPaymentToggle()\"\r\n                      [checked]=\"voucher.allowPayment\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label><strong>Show out of stock for 0 quantity</strong>\r\n                </ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"stopOrderWhenNoQtyToggle()\"\r\n                      [checked]=\"voucher.stopWhenNoQty\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"headings\" style=\"display: flex;align-items: center;\" size='4'>\r\n                <div>Gst Exclusive</div>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\" (click)=\"toggleGstExclusive()\" [checked]=\"voucher.gstExclusive\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <br>\r\n              <ion-col size=\"4\">\r\n                <ion-label>\r\n                  Price ( {{ voucher.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                </ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.prodPrice\"></ion-input>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>\r\n                    Discounted Price ( {{ voucher.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                  </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.discountedPrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Purchase Price </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.purchasePrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <ion-label>Quantity</ion-label>\r\n                <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"voucher.productQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <ion-label> Min Quantity</ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.minQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Max Quantity </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.maxQty\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"10\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Keywords (Search)</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"keyword\" autocapitalize></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"2\">\r\n                <ion-button class=\"btn-2 m-t-36\" fill=\"outline\" shape=\"round\" (click)=\"addSearchKeywords()\">\r\n                  Add </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"voucher.searchKeywords\">\r\n                <ion-chip outline color=\"dark\" *ngFor=\"let x of voucher.searchKeywords; let i = index;\">\r\n                  <ion-icon name=\"close-circle\" (click)=\"removeKeyword(i)\"></ion-icon>\r\n                  <ion-label>{{x}}</ion-label>\r\n                </ion-chip>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Voucher SKU Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"voucher.productCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>HSN Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"voucher.hsnCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>GST (%)</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"voucher.gst\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Barcode Number</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"voucher.barcodeNo\"></ion-input>\r\n                </div>\r\n              </ion-col> -->\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Description -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-row>\r\n            <ion-col size=\"12\">\r\n              <p style=\"font-weight: bold;\">Voucher Description</p>\r\n              <br>\r\n              <ckeditor [(ngModel)]=\"voucher.prodDesc\" [config]=\"ckeConfig\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col size=\"12\" style=\"margin-top:1rem;\">\r\n              <p style=\"font-weight: bold;\">Voucher Short Description</p>\r\n              <br>\r\n              <ckeditor [config]=\"ckeConfig\" [(ngModel)]=\"voucher.prodShortDesc\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <br>\r\n          <ng-container *ngIf=\"editProductId\">\r\n            <ion-button shape=\"round\" class=\"btn-1 i-start\" color=\"primary\" (click)=\"addNewSection()\"\r\n              style=\"margin-bottom: 15px; margin-top: 15px;\">\r\n              <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n              Add New Section\r\n            </ion-button>\r\n            <ion-reorder-group (ionItemReorder)=\"SectionReorder($event)\" disabled=\"false\">\r\n              <ion-item *ngFor=\"let item of productSections; let i = index\">\r\n                <div class=\"section\">\r\n                  <div style=\"display: inline-flex\">\r\n                    <ion-reorder slot=\"end\"> <i class=\"flaticon-menu\"></i>\r\n                    </ion-reorder>\r\n                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <p style=\"margin-top: -12px;font-size: large\">Section\r\n                      {{i+1}}</p>\r\n                  </div>\r\n                  <br><br>\r\n                  <div class=\"sectionBlock\">\r\n                    <div style=\"display: block\">\r\n                      <p *ngIf=\"item.sectionName\" class=\"crop\">Name: {{item.sectionName}}</p>\r\n                      <br *ngIf=\"item.sectionName\">\r\n                      <p *ngIf=\"item.widgetType\">Type: {{item.widgetType}}</p>\r\n                    </div>\r\n                    <div style=\"display: flex\">\r\n                      <div>\r\n                        <ion-button (click)=\"openWidgetEdit(item.widgetType,item.widgetID,i)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Edit\r\n                        </ion-button>\r\n                        &nbsp;&nbsp;\r\n                        <ion-button (click)=\"deleteSectionConfirm(item.widgetID,i, 'web')\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Delete\r\n                        </ion-button>\r\n                      </div>\r\n                      <ion-list lines=\"none\" style=\"display: flex;margin-top: -20px;margin-left: 10px\">\r\n                        <ion-item>\r\n                          <ion-label>App</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='app' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'app')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n\r\n                        <ion-item>\r\n                          <ion-label>Website</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='web' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'web')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n                      </ion-list>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!editProductId\">\r\n            <ion-text color=\"danger\" style=\"display: flex;justify-content: center;\">\r\n              <p style=\"font-weight: bold;font-size: large;\">\r\n                * Once product is created, you can create sections for voucher description\r\n              </p>\r\n            </ion-text>\r\n          </ng-container>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Categories and Brands -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\"\r\n          style=\"display: flex;flex-wrap: nowrap;flex-direction: row;align-content: center;justify-content: space-around;align-items: flex-start;\">\r\n          <div class=\"categories-container\">\r\n            <div class=\"no-data\" *ngIf=\"showNoCategories\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No categories</h6>\r\n            </div>\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoCategories\">\r\n              <ion-searchbar [(ngModel)]=\"searchCategory\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <div class=\"categories-wrapper\" *ngIf=\"!showNoCategories\">\r\n              <ion-list>\r\n                <ion-list-header>\r\n                  <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Categories\r\n                  </ion-label>\r\n                </ion-list-header>\r\n                <div *ngFor=\"let category of categories | filter: searchCategory\">\r\n                  <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                    <ion-item (click)=\"onClickCategoryCheckBox(category.id)\" style=\"width: 100%;\">\r\n                      <ion-label>{{category.name}}</ion-label>\r\n                      <ion-checkbox [checked]=\"editCheckBoxValue(category.id)\" color=\"primary\" slot=\"start\">\r\n                      </ion-checkbox>\r\n                    </ion-item>\r\n                    <div (click)=\"getSubcategories(category.id)\" slot=\"end\"\r\n                      style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"category.isSubcategories\">\r\n                      <i class=\"flaticon-null-13\"\r\n                        *ngIf=\"(listOfSubcategoriesInView.hasOwnProperty(category.id) && !listOfSubcategoriesInView[category.id].active) || !listOfSubcategoriesInView.hasOwnProperty(category.id)\"></i>\r\n                      <i class=\"flaticon-null-14\"\r\n                        *ngIf=\"listOfSubcategoriesInView.hasOwnProperty(category.id) && listOfSubcategoriesInView[category.id].active\"></i>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    *ngIf=\"(listOfSubcategories[category.id] && listOfSubcategories[category.id].length) && listOfSubcategoriesInView[category.id].active\"\r\n                    style=\"margin-left: 10%;\">\r\n                    <ng-container *ngFor=\"let subCat of listOfSubcategories[category.id]\">\r\n                      <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                        <ion-item (click)=\"onClickCategoryCheckBox(subCat.id)\" style=\"width: 100%;\">\r\n                          <ion-label>{{subCat.name}}</ion-label>\r\n                          <ion-checkbox [checked]=\"editCheckBoxValue(subCat.id)\" color=\"primary\" slot=\"start\">\r\n                          </ion-checkbox>\r\n                        </ion-item>\r\n                        <!-- Sub-SubCategory Start -->\r\n                        <div (click)=\"getSubOfSubCategories(category.id, subCat.id)\" slot=\"end\"\r\n                          style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"subCat.isSubcategories\">\r\n                          <i class=\"flaticon-null-13\" *ngIf=\"!subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                          <i class=\"flaticon-null-14\" *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                        </div>\r\n                      </div>\r\n                      <ng-container\r\n                        *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active && subOfSubCategories[subCat.id].length\">\r\n                        <div style=\"margin-left: 10%;\">\r\n                          <ng-container *ngFor=\"let subSubCat of subOfSubCategories[subCat.id]\">\r\n                            <ion-item (click)=\"onClickCategoryCheckBox(subSubCat.id)\">\r\n                              <ion-label>{{subSubCat.name}}</ion-label>\r\n                              <ion-checkbox [checked]=\"editCheckBoxValue(subSubCat.id)\" color=\"primary\" slot=\"start\">\r\n                              </ion-checkbox>\r\n                            </ion-item>\r\n                          </ng-container>\r\n                        </div>\r\n                      </ng-container>\r\n                      <!-- Sub-SubCategory End -->\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n\r\n              </ion-list>\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"brands-container\">\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoBrands\">\r\n              <ion-searchbar [(ngModel)]=\"searchBrand\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <ion-list *ngIf=\"!showNoBrands && brands.length\">\r\n              <ion-list-header>\r\n                <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Brands</ion-label>\r\n              </ion-list-header>\r\n              <div *ngFor=\"let brand of brands | filter: searchBrand\">\r\n                <ion-item (click)=\"onClickBrandCheckBox(brand.id)\" style=\"width: 100%;\">\r\n                  <ion-label>{{brand.name}}</ion-label>\r\n                  <ion-checkbox [checked]=\"editBrandCheckBoxValue(brand.id)\" color=\"primary\" slot=\"start\">\r\n                  </ion-checkbox>\r\n                </ion-item>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Images -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <button class=\"upload-btn btn-1 i-start\" (click)=\"onDrop($event.target.files)\">Upload Voucher\r\n            Image(s)</button>\r\n          <h3>Uploads</h3>\r\n          <div class=\"no-img\" *ngIf=\"listOfBase64Image.length == 0\">\r\n            No attached images\r\n          </div>\r\n\r\n          <div class=\"imgs-container\" *ngIf=\"listOfBase64Image.length !== 0\">\r\n            <div class=\"img-wrap\" *ngFor=\"let img of listOfBase64Image; let i = index\">\r\n              <img [src]=\"img.base64Img\" (click)=\"onClickEditImage(img.url)\" />\r\n              <div class=\"overlay\">\r\n                <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" (click)=\"removeImage(i)\">\r\n                  <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == true\" class=\"btn-2 cover\" shape=\"round\">\r\n                  Cover Pic\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == false\" (click)=\"newProductCoverPic(i)\" class=\"btn-2 cover\"\r\n                  shape=\"round\">\r\n                  Make Cover\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <!-- Image List -->\r\n          <div class=\"list-header\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"reorder\">\r\n                  <p>Reorder</p>\r\n                </ion-col>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <div class=\"list-container\">\r\n            <ion-reorder-group (ionItemReorder)=\"imagesReorder($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n              <ion-item *ngFor=\"let img of voucher.images; let i = index\" lines=\"none\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"ion-align-items-center\">\r\n                    <ion-col class=\"reorder\">\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                    <ion-col class=\"img\">\r\n                      <img [src]=\"img.url\" (click)=\"onClickEditImage(img.url)\" height=\"200px\" />\r\n                    </ion-col>\r\n                    <ion-col class=\"action\">\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" large\r\n                          (click)=\"removeEditImageInData(i, img.url)\">\r\n                          <ion-icon name=\"trash\" slot=\"icon-only\" style=\" font-size: 16px;\"></ion-icon>\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"voucher.coverPic.imageId == img.imageId\" class=\"btn-2 cover\" shape=\"round\"\r\n                          disabled>\r\n                          Cover\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"voucher.coverPic.imageId != img.imageId \" class=\"btn-2 cover\" shape=\"round\"\r\n                          (click)=\"editProductCoverPicInData(i)\">\r\n                          Make Cover\r\n                        </ion-button>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n                <br>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n          <!-- Image List -->\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Advanced (optional) -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2 id=\"scroll1\">\r\n                <div class=\"statusList\">\r\n                  <div [id]=\"i\" *ngFor=\"let item of sideMenu; index as i\" (click)='changeComponent(i)'>\r\n                    <ng-container *ngIf=\"userRole !== 'vendor'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"userRole == 'vendor' && item != 'Vendor' && item != 'Specific User Discount'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=10 id=\"scroll2\" style=\"border-left: 1px solid lightgray;\">\r\n                <ng-container [ngSwitch]=\"selectedId\">\r\n                  <ion-grid>\r\n                    <!-- Vendor -->\r\n                    <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!multiVendor\">\r\n                          This option is only available when MultiVendor is on.\r\n                        </p>\r\n                      </ion-text>\r\n                      <ion-col size=\"6\">\r\n                        <div *ngIf=\"multiVendor\">\r\n                          <ion-row>\r\n                            <div class=\"headings\">\r\n                              Add Vendor\r\n                            </div>\r\n                          </ion-row>\r\n                          <ion-row>\r\n                            <ion-col size=\"12\">\r\n                              <ion-select [value]=\"voucher.vendorId\" class=\"border i-s-p-10\"\r\n                                (ionChange)=\"addVendor($event)\" placeholder=\"Select Vendor\">\r\n                                <ion-select-option value=\"\">No Vendor</ion-select-option>\r\n                                <ion-select-option [value]=\"vendor.id\" *ngFor=\"let vendor of vendors\">\r\n                                  {{vendor.name}}\r\n                                </ion-select-option>\r\n                              </ion-select>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Slug Name -->\r\n                    <ion-row *ngSwitchCase=\"1\">\r\n                      <ng-container *ngIf=\"isUniversal && editProductId else noUniversal\">\r\n                        <ion-col>\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Slug Name\r\n                              <ion-text color=\"danger\">\r\n                                (<b class=\"cursor-p\" (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug\r\n                                Instructions)\r\n                              </ion-text>\r\n                            </ion-label>\r\n                            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                              <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='voucher.slug.name'\r\n                                style=\"width: 80%;\"></ion-input>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-template #noUniversal>\r\n                        <p>Coming Soon!</p>\r\n                      </ng-template>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ng-container>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n  <!-- Voucher -->\r\n\r\n</super-tabs>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"deleteAlertConfirm();\" *ngIf=\"editProductId\" shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"danger\">\r\n      <i class=\"flaticon-null-21\"></i>\r\n      Delete\r\n    </ion-button>\r\n    <ion-button (click)=\"saveVoucher()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/vouchers/create-voucher/create-voucher.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/vouchers/create-voucher/create-voucher.module.ts ***!
  \************************************************************************/
/*! exports provided: CreateVoucherPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateVoucherPageModule", function() { return CreateVoucherPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_voucher_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-voucher.page */ "./src/app/admin/vouchers/create-voucher/create-voucher.page.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");












const routes = [
    {
        path: '',
        component: _create_voucher_page__WEBPACK_IMPORTED_MODULE_6__["CreateVoucherPage"]
    }
];
let CreateVoucherPageModule = class CreateVoucherPageModule {
};
CreateVoucherPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_10__["SuperTabsModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_11__["Ng2SearchPipeModule"],
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"],
            src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__["ApplicationDirectivesModule"]
        ],
        declarations: [_create_voucher_page__WEBPACK_IMPORTED_MODULE_6__["CreateVoucherPage"]]
    })
], CreateVoucherPageModule);



/***/ }),

/***/ "./src/app/admin/vouchers/create-voucher/create-voucher.page.scss":
/*!************************************************************************!*\
  !*** ./src/app/admin/vouchers/create-voucher/create-voucher.page.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-btn-wrapper {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.upload-btn {\n  color: #fff;\n  background-color: var(--ion-color-primary);\n  padding: 8px 20px;\n  border-radius: 42px;\n  font-size: 16px;\n  font-weight: 400;\n  cursor: pointer;\n  height: 42px;\n  margin-left: 16px;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.product-color-name {\n  max-width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n}\n\n.color-selected {\n  display: -webkit-box;\n  display: flex;\n}\n\n.color-code {\n  width: 40px;\n  height: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n  min-width: 40px;\n}\n\n.input-border {\n  border: 1px solid lightgray;\n  text-align: center;\n}\n\nion-select {\n  border: 1px solid lightgray;\n}\n\n.form-input {\n  border: 1px solid gray;\n  background: var(--ion-color-light);\n  margin-top: 12px;\n  border-radius: 8px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.product-search-wrap {\n  text-align: center;\n}\n\n.product-search-wrap ion-searchbar {\n  width: 300px;\n  max-width: 100%;\n  margin: auto;\n}\n\n/* width */\n\n::-webkit-scrollbar {\n  width: 5px;\n}\n\n/* Track */\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n/* Handle */\n\n::-webkit-scrollbar-thumb {\n  background: #888;\n}\n\n/* Handle on hover */\n\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\n.filters-col {\n  border: 1px solid lightgray;\n  padding: 8px;\n}\n\n.list-header {\n  position: static;\n  margin: 36px auto;\n}\n\n.list-container {\n  margin: 0;\n}\n\nion-col.img {\n  width: calc(100% - 400px);\n  max-width: calc(100% - 400px);\n  text-align: center;\n}\n\nion-col.action {\n  width: 200px;\n  max-width: 200px;\n}\n\nion-col.reorder {\n  width: 200px;\n  max-width: 200px;\n  text-align: center;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.m-l-5-p {\n  text-align: center;\n}\n\n.widget-type {\n  color: #999;\n  margin-left: 12px;\n}\n\n.section {\n  display: block;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px;\n}\n\n.sectionBlock {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 1000px;\n}\n\n.crop {\n  overflow: hidden;\n  width: 200px;\n  text-overflow: ellipsis;\n}\n\n.padding-start-16 {\n  --padding-start: 16px !important;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 80vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 87vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.groupInput {\n  border: none;\n  border-bottom: 1px solid;\n  padding: 5px;\n  text-align: center;\n}\n\n.groupSelect {\n  width: 150px;\n}\n\n.variantImageSelect {\n  border: 1px solid;\n  text-align: center;\n  max-width: 100%;\n  margin-top: 12px;\n}\n\n.groupDisplay {\n  display: -webkit-box;\n  display: flex;\n  margin-left: 12px;\n}\n\n.variantGroups {\n  margin-top: 0px !important;\n  text-align: center;\n}\n\n.remove-icon {\n  cursor: pointer;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n\n.select-wrap {\n  padding: 5px;\n  margin-left: 5px;\n  background: var(--ion-color-light);\n  border-radius: 5px;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n\n.flexJustifySpace {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox {\n  border-bottom: 1px solid lightgray;\n  margin-bottom: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox .firstHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  gap: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .inputWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput {\n  width: 120px;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin: 0 8px 8px 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput:hover {\n  border: 1px solid #000;\n}\n\n.schedulesBox .secondHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.schedulesBox .slotBtn {\n  color: #000;\n}\n\n.schedulesBox .slotBtn i {\n  color: #4a4a4a;\n  font-size: 22px;\n}\n\n.schedulesBox .slotBtn i:hover {\n  color: #000;\n}\n\n.copyList {\n  border: 0;\n}\n\n.selectInput {\n  width: 30%;\n  padding: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vdm91Y2hlcnMvY3JlYXRlLXZvdWNoZXIvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFx2b3VjaGVyc1xcY3JlYXRlLXZvdWNoZXJcXGNyZWF0ZS12b3VjaGVyLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vdm91Y2hlcnMvY3JlYXRlLXZvdWNoZXIvY3JlYXRlLXZvdWNoZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FERUU7RUFDRSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREVFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtBQ0NKOztBREVFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVFO0VBQ0UsMkJBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVFO0VBQ0UsMkJBQUE7QUNDSjs7QURFRTtFQUNFLHNCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURDRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNFSjs7QURDRTtFQUNFLGtCQUFBO0FDRUo7O0FEREk7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNHTjs7QURDRSxVQUFBOztBQUNBO0VBQ0UsVUFBQTtBQ0VKOztBRENFLFVBQUE7O0FBQ0E7RUFDRSxtQkFBQTtBQ0VKOztBRENFLFdBQUE7O0FBQ0E7RUFDRSxnQkFBQTtBQ0VKOztBRENFLG9CQUFBOztBQUNBO0VBQ0UsZ0JBQUE7QUNFSjs7QURDRTtFQUNFLDJCQUFBO0VBQ0EsWUFBQTtBQ0VKOztBRENFO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQ0VKOztBRENFO0VBQ0UsU0FBQTtBQ0VKOztBRENFO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FDRUo7O0FEQUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNHSjs7QURERTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDSUo7O0FEREU7RUFDRSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDSUo7O0FEREU7RUFDRSxrQkFBQTtBQ0lKOztBRERFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FDSUo7O0FERkU7RUFDRSxjQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGFBQUE7QUNLSjs7QURIRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxhQUFBO0FDTUo7O0FESkU7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtBQ09KOztBREpFO0VBQ0UsZ0NBQUE7QUNPSjs7QURKRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ09KOztBREpFO0VBQ0UsZ0JBQUE7QUNPSjs7QURKRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ09KOztBREpFO0VBQ0UsZ0JBQUE7QUNPSjs7QURKRTtFQUNFO0lBQ0UsWUFBQTtFQ09KOztFRExFO0lBQ0UsWUFBQTtFQ1FKO0FBQ0Y7O0FETEU7RUFDRSxrQkFBQTtBQ09KOztBRE5JO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ1FOOztBREpFO0VBQ0UsWUFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDT0o7O0FESkU7RUFDRSxZQUFBO0FDT0o7O0FESkU7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDT0o7O0FESkU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxpQkFBQTtBQ09KOztBREpFO0VBQ0UsMEJBQUE7RUFDQSxrQkFBQTtBQ09KOztBREpFO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtBQ09KOztBREpFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtBQ09KOztBREpFO0VBQ0UsZ0JBQUE7RUFFQSxrQkFBQTtFQUNBLGdCQUFBO0FDTUo7O0FESkk7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNNTjs7QURKTTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ01SOztBREpNO0VBQ0UseUJBQUE7QUNNUjs7QURISTtFQUNFLHFCQUFBO0FDS047O0FESEk7RUFDRSxlQUFBO0FDS047O0FERkU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0tKOztBREZFO0VBQ0Usa0NBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNLSjs7QURISTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsUUFBQTtBQ0tOOztBREZNO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGtCQUFBO0FDSVI7O0FERlE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0lWOztBREZRO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUNJVjs7QURIVTtFQUNFLHNCQUFBO0FDS1o7O0FEQUk7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxxQkFBQTtVQUFBLHlCQUFBO0FDRU47O0FEQUk7RUFDRSxXQUFBO0FDRU47O0FERE07RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQ0dSOztBREZRO0VBQ0UsV0FBQTtBQ0lWOztBRENFO0VBQ0UsU0FBQTtBQ0VKOztBREFFO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUNHSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3ZvdWNoZXJzL2NyZWF0ZS12b3VjaGVyL2NyZWF0ZS12b3VjaGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51cGxvYWQtYnRuLXdyYXBwZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB9XHJcbiAgXHJcbiAgLnVwbG9hZC1idG4ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBwYWRkaW5nOiA4cHggMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDQycHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgaGVpZ2h0OiA0MnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE2cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC51cGxvYWQtYnRuLXdyYXBwZXIgaW5wdXRbdHlwZT1cImZpbGVcIl0ge1xyXG4gICAgZm9udC1zaXplOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgei1pbmRleDogOTk7XHJcbiAgfVxyXG4gIFxyXG4gIC5wcm9kdWN0LWNvbG9yLW5hbWUge1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICB9XHJcbiAgXHJcbiAgLmNvbG9yLXNlbGVjdGVkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jb2xvci1jb2RlIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICBtaW4td2lkdGg6IDQwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5pbnB1dC1ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICBpb24tc2VsZWN0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICB9XHJcbiAgXHJcbiAgLmZvcm0taW5wdXQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMTJweDtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDEycHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xyXG4gIH1cclxuICAuZmxleCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgaW9uLXNlYXJjaGJhciB7XHJcbiAgICAgIHdpZHRoOiAzMDBweDtcclxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICBtYXJnaW46IGF1dG87XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8qIHdpZHRoICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICB3aWR0aDogNXB4O1xyXG4gIH1cclxuICBcclxuICAvKiBUcmFjayAqL1xyXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYmFja2dyb3VuZDogI2YxZjFmMTtcclxuICB9XHJcbiAgXHJcbiAgLyogSGFuZGxlICovXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjODg4O1xyXG4gIH1cclxuICBcclxuICAvKiBIYW5kbGUgb24gaG92ZXIgKi9cclxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICM1NTU7XHJcbiAgfVxyXG4gIFxyXG4gIC5maWx0ZXJzLWNvbCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5saXN0LWhlYWRlciB7XHJcbiAgICBwb3NpdGlvbjogc3RhdGljO1xyXG4gICAgbWFyZ2luOiAzNnB4IGF1dG87XHJcbiAgfVxyXG4gIFxyXG4gIC5saXN0LWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1jb2wuaW1nIHtcclxuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XHJcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgaW9uLWNvbC5hY3Rpb24ge1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICB9XHJcbiAgaW9uLWNvbC5yZW9yZGVyIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIG1heC13aWR0aDogMjAwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC5pbmZvLXR4dCB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5tLWwtNS1wIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLndpZGdldC10eXBlIHtcclxuICAgIGNvbG9yOiAjOTk5O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEycHg7XHJcbiAgfVxyXG4gIC5zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gIH1cclxuICAuc2VjdGlvbkJsb2NrIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMTAwMHB4O1xyXG4gIH1cclxuICAuY3JvcCB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgfVxyXG4gIFxyXG4gIC5wYWRkaW5nLXN0YXJ0LTE2IHtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMTZweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMSB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA4MHZoO1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMTpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMiB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA3NXZoO1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxuICBcclxuICBAbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAgICNzY3JvbGwxIHtcclxuICAgICAgaGVpZ2h0OiA5MnZoO1xyXG4gICAgfVxyXG4gICAgI3Njcm9sbDIge1xyXG4gICAgICBoZWlnaHQ6IDg3dmg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC5zdGF0dXNMaXN0IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHAge1xyXG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBtYXJnaW46IDhweDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAuZ3JvdXBJbnB1dCB7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQ7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC5ncm91cFNlbGVjdCB7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC52YXJpYW50SW1hZ2VTZWxlY3Qge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuZ3JvdXBEaXNwbGF5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLnZhcmlhbnRHcm91cHMge1xyXG4gICAgbWFyZ2luLXRvcDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC5yZW1vdmUtaWNvbiB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zZWxlY3Qtd3JhcCB7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICB9XHJcbiAgXHJcbiAgLnRhYmxlQXJlYSB7XHJcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgXHJcbiAgICB0YWJsZSB7XHJcbiAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gIFxyXG4gICAgICB0ZCxcclxuICAgICAgdGgge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgICAgfVxyXG4gICAgICB0cjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLmhlYWRlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICAgIH1cclxuICAgIC5kZWxldGVJY29uIHtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICAuZmxleEp1c3RpZnlTcGFjZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB9XHJcbiAgXHJcbiAgLnNjaGVkdWxlc0JveCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBcclxuICAgIC5maXJzdEhhbGYge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICBnYXA6IDhweDtcclxuICAgIH1cclxuICAgIC5zbG90V3JhcHBlciB7XHJcbiAgICAgIC5zY2hlZHVsZUxpc3Qge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgXHJcbiAgICAgICAgLmlucHV0V3JhcHBlciB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnNsb3RJbnB1dCB7XHJcbiAgICAgICAgICB3aWR0aDogMTIwcHg7XHJcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgICAgIG1hcmdpbjogMCA4cHggOHB4IDhweDtcclxuICAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnNlY29uZEhhbGYge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgfVxyXG4gICAgLnNsb3RCdG4ge1xyXG4gICAgICBjb2xvcjogIzAwMDtcclxuICAgICAgaSB7XHJcbiAgICAgICAgY29sb3I6ICM0YTRhNGE7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5jb3B5TGlzdCB7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgfVxyXG4gIC5zZWxlY3RJbnB1dCB7XHJcbiAgICB3aWR0aDogMzAlO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gIH1cclxuICAiLCIudXBsb2FkLWJ0bi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi51cGxvYWQtYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDQycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDQycHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xuICBmb250LXNpemU6IDEwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogOTk7XG59XG5cbi5wcm9kdWN0LWNvbG9yLW5hbWUge1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5jb2xvci1zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jb2xvci1jb2RlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWluLXdpZHRoOiA0MHB4O1xufVxuXG4uaW5wdXQtYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1zZWxlY3Qge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ucHJvZHVjdC1zZWFyY2gtd3JhcCBpb24tc2VhcmNoYmFyIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLyogd2lkdGggKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogNXB4O1xufVxuXG4vKiBUcmFjayAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG59XG5cbi8qIEhhbmRsZSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICM4ODg7XG59XG5cbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG59XG5cbi5maWx0ZXJzLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogc3RhdGljO1xuICBtYXJnaW46IDM2cHggYXV0bztcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5pb24tY29sLmltZyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDAwcHgpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xufVxuXG5pb24tY29sLnJlb3JkZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmluZm8tdHh0IHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm0tbC01LXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53aWRnZXQtdHlwZSB7XG4gIGNvbG9yOiAjOTk5O1xuICBtYXJnaW4tbGVmdDogMTJweDtcbn1cblxuLnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5zZWN0aW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAwcHg7XG59XG5cbi5jcm9wIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDIwMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnBhZGRpbmctc3RhcnQtMTYge1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHggIWltcG9ydGFudDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgwdmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG5cbiAgI3Njcm9sbDIge1xuICAgIGhlaWdodDogODd2aDtcbiAgfVxufVxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmdyb3VwSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5ncm91cFNlbGVjdCB7XG4gIHdpZHRoOiAxNTBweDtcbn1cblxuLnZhcmlhbnRJbWFnZVNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmdyb3VwRGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xufVxuXG4udmFyaWFudEdyb3VwcyB7XG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5yZW1vdmUtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5zZWxlY3Qtd3JhcCB7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuLnRhYmxlQXJlYSAuZGVsZXRlSWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmZsZXhKdXN0aWZ5U3BhY2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5zY2hlZHVsZXNCb3gge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5zY2hlZHVsZXNCb3ggLmZpcnN0SGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogOHB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdFdyYXBwZXIgLnNjaGVkdWxlTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLmlucHV0V3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLnNsb3RJbnB1dCB7XG4gIHdpZHRoOiAxMjBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90V3JhcHBlciAuc2NoZWR1bGVMaXN0IC5zbG90SW5wdXQ6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xufVxuLnNjaGVkdWxlc0JveCAuc2Vjb25kSGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIHtcbiAgY29sb3I6ICMwMDA7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIGkge1xuICBjb2xvcjogIzRhNGE0YTtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdEJ0biBpOmhvdmVyIHtcbiAgY29sb3I6ICMwMDA7XG59XG5cbi5jb3B5TGlzdCB7XG4gIGJvcmRlcjogMDtcbn1cblxuLnNlbGVjdElucHV0IHtcbiAgd2lkdGg6IDMwJTtcbiAgcGFkZGluZzogOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/vouchers/create-voucher/create-voucher.page.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/vouchers/create-voucher/create-voucher.page.ts ***!
  \**********************************************************************/
/*! exports provided: CreateVoucherPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateVoucherPage", function() { return CreateVoucherPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/admin/admin-shop/new-product/product-section/product-section.page */ "./src/app/admin/admin-shop/new-product/product-section/product-section.page.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var src_app_services_voucher_voucher_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/voucher/voucher.service */ "./src/app/services/voucher/voucher.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
















let CreateVoucherPage = class CreateVoucherPage {
    constructor(route, events, alertController, router, loadingController, platform, modalController, storage, voucherService, configService, angularFirestore, _location, vendorService, sharedService, categoryService) {
        this.route = route;
        this.events = events;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalController = modalController;
        this.storage = storage;
        this.voucherService = voucherService;
        this.configService = configService;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.vendorService = vendorService;
        this.sharedService = sharedService;
        this.categoryService = categoryService;
        // Voucher Object Start
        this.voucher = {
            approved: false,
            prodName: null,
            nameToSearch: null,
            prodDesc: null,
            prodShortDesc: null,
            prodPrice: null,
            status: true,
            createdAt: null,
            updatedAt: null,
            sortedAt: null,
            categories: null,
            brands: null,
            images: [],
            gst: null,
            discountedPrice: null,
            searchKeywords: [],
            productCode: '',
            productQty: '',
            stopWhenNoQty: false,
            coverPic: {
                imageId: '',
                mob: '',
                thumb: '',
                url: ''
            },
            minQty: null,
            maxQty: null,
            hsnCode: '',
            purchasePrice: null,
            discount: 0,
            vendorId: '',
            gstExclusive: false,
            allowPayment: false,
            productType: 'voucher',
            slug: {
                name: null,
                updatedAt: new Date(),
                updatedBy: 'admin'
            }
        };
        // Voucher Object End
        this.listOfBase64Image = [];
        this.coverValue = false;
        this.selectedCategories = [];
        this.selectedBrands = [];
        this.searchCategory = '';
        this.searchBrand = '';
        this.showNoCategories = false;
        this.showCategoriesLoader = true;
        this.editProductId = '';
        this.routeFromCategories = false;
        this.keyword = '';
        this.subcategories = [];
        this.listOfSubcategories = {};
        this.routeFromOptions = false;
        this.listOfSubcategoriesInView = {};
        this.showNoBrands = false;
        this.brands = [];
        this.subscriptionFeature = false;
        this.userRole = "";
        this.vendorData = [];
        this.vendorName = 'Select Vendor';
        this.multiVendor = false;
        this.vendors = [];
        this.productSections = [];
        this.sideMenu = [];
        this.selectedId = '0';
        this.fromAppointment = false;
        this.needToUpdateImages = false;
        this.isUniversal = false;
        this.subOfSubCategories = {};
        this.subOfSubCategoryToggle = {};
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.editProductId = this.router.getCurrentNavigation().extras.state.productId;
                this.routeFromCategories = this.router.getCurrentNavigation().extras.state.routeFromCategories;
                this.routeFromOptions = this.router.getCurrentNavigation().extras.state.routeFromOptions;
                if (this.router.getCurrentNavigation().extras.state.routeFromAppointment) {
                    this.fromAppointment = this.router.getCurrentNavigation().extras.state.routeFromAppointment;
                }
            }
        });
    }
    ngOnInit() {
        this.sectionLimit = this.configService.environment.productSectionsLimit;
        this.ckeConfig = {
            allowedContent: true,
            height: 200
        };
        this.isUniversal = this.sharedService.isUniversal();
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.initializeSubscriptions();
            this.userRole = yield this.storage.get('userRole');
            if (this.userRole == 'vendor') {
                this.roleVendorId = yield this.storage.get('uid');
                this.roleVendorData = yield this.vendorService.getVendorData(this.roleVendorId, 'details');
                if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
                    this.voucher['approved'] = true;
                    this.voucher.status = true;
                }
                else {
                    this.voucher['approved'] = false;
                    this.voucher.status = false;
                }
            }
            this.imagesLimit = this.configService.environment.productImageLimit;
            this.events.publish('voucher:getAllCategories');
            this.events.publish('brands:getAllBrandsForAdmin');
            this.events.publish('variants:getVariantsTypeData');
            this.devWidth = this.platform.width();
            if (this.editProductId) {
                this.events.publish('voucher:getProductWithId', this.editProductId);
                this.events.publish('voucher:getAllSubCategories');
                this.getSections();
            }
            this.taxType = this.configService.environment.taxType;
            this.subscriptionFeature = this.configService.environment.subscriptionFeature;
            this.multiVendor = this.configService.environment.multiVendor;
            if (this.multiVendor) {
                let vendorRes = yield this.vendorService.getAllVendors();
                console.log('vendors', vendorRes);
                if (vendorRes.length) {
                    this.vendors = vendorRes;
                }
                else {
                    this.multiVendor = false;
                }
                //this.events.publish('vendor:getAllVendors');
            }
            this.events.publish('filters:getActiveStatus');
            this.sideMenu.push('Vendor', 'Slug Name');
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('voucher:publishgetProductWithId', (data) => {
                data = this.getUpdatedFields(data);
                this.voucher = data;
                this.events.publish('vendor:getVendorName', this.voucher.vendorId);
            });
            this.events.subscribe('voucher:addSuccess', (heading, desc) => {
                this.loader.dismiss();
                this.presentAlert(heading, desc, true);
                this.voucher.prodName = null;
                this.voucher.prodDesc = null;
                this.voucher.prodPrice = null;
                this.listOfBase64Image = [];
                this.selectedCategories = [];
                this.selectedBrands = [];
            });
            this.events.subscribe('voucher:addFailure', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('voucher:editSuccess', (heading, desc) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (this.loader) {
                    this.loader.dismiss();
                }
                yield this.presentAlert(heading, desc, true);
            }));
            this.events.subscribe('voucher:editFailure', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('product-options:editSuccess', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc, true);
            });
            this.events.subscribe('product-options:editFailure', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('voucher:deleteSuccess', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this._location.back();
            });
            this.events.subscribe('voucher:deleteFailure', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, msg);
            });
            this.events.subscribe('voucher:publishAllCategoriesForAdmin', (categories) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                console.log('categories:', categories);
                if (this.loader) {
                    this.loader.dismiss();
                }
                if (this.userRole == 'vendor' && this.roleVendorId) {
                    let allCategories = categories;
                    this.categories = allCategories.filter((category) => this.roleVendorData.categories.includes(category.id));
                }
                else {
                    this.categories = categories;
                }
                this.showCategoriesLoader = false;
                this.showNoCategories = false;
            }));
            this.events.subscribe('voucher:noCategoryAvailable', () => {
                console.log('no categories');
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoCategories = true;
                this.showCategoriesLoader = false;
            });
            this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
                console.log('brands:', brands);
                if (this.loader) {
                    this.loader.dismiss();
                }
                if (this.userRole == 'vendor' && this.roleVendorId) {
                    let allBrands = brands;
                    console.log('brands', brands);
                    console.log('this.roleVendorData:', this.roleVendorData);
                    this.brands = allBrands.filter((brand) => this.roleVendorData.brands.includes(brand.id));
                }
                else {
                    this.brands = brands;
                }
                this.showNoBrands = false;
                //console.log('brands', brands);
            });
            this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoBrands = true;
            });
            this.events.subscribe('product-options:publishOptionData', (option, productOptions) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                option = this.getUpdatedFields(option);
                this.voucher = option;
            });
            this.events.subscribe('product-options:deleteProductOptionSuccess', () => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert('', 'Option Deleted Successfully!', true);
            });
            this.events.subscribe('vendor:getVendorNameSuccess', (data) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                if (data) {
                    this.vendorData = data;
                }
                this.vendorName = this.vendorData['name'];
            });
        });
    }
    editShowDisable() {
        if (this.userRole == 'vendor') {
            if (this.voucher.approved) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    removeImage(index) {
        this.listOfBase64Image.splice(index, 1);
    }
    calculateImageSize(base64String) {
        let padding, inBytes, base64StringLength;
        if (base64String.endsWith('==')) {
            padding = 2;
        }
        else if (base64String.endsWith('=')) {
            padding = 1;
        }
        else {
            padding = 0;
        }
        base64StringLength = base64String.length;
        inBytes = (base64StringLength / 4) * 3 - padding;
        const kbytes = inBytes / 1000;
        return kbytes;
    }
    saveVoucher() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.coverValue = true;
            if (this.voucher.coverPic && !this.voucher.coverPic.url) {
                this.coverValue = false;
            }
            else {
                this.coverValue = true;
            }
            if (!this.coverValue && this.listOfBase64Image.length) {
                console.log('this.listOfBase64Image', this.listOfBase64Image);
                for (let i = 0; i < this.listOfBase64Image.length; i++) {
                    if (this.listOfBase64Image[i].cover === true) {
                        this.coverValue = true;
                        break;
                    }
                    else {
                        this.coverValue = false;
                    }
                }
            }
            if (this.voucher.discountedPrice === null) {
                this.voucher.discountedPrice = this.voucher.prodPrice;
            }
            this.voucher.discount = parseFloat((((this.voucher.prodPrice - this.voucher.discountedPrice) / this.voucher.prodPrice) * 100).toFixed(2));
            if (this.voucher.productCode != '') {
                let prodCode = yield this.voucherService.checkProductSKU(this.voucher.productCode, this.editProductId);
                if (prodCode && prodCode.length) {
                    let matchingProds = [];
                    for (let i = 0; i < prodCode.length; i++) {
                        if (this.editProductId) {
                            if (this.editProductId != prodCode[i].id) {
                                matchingProds.push(prodCode[i].data.name);
                            }
                        }
                        else {
                            matchingProds.push(prodCode[i].data.name);
                        }
                    }
                    if (matchingProds && matchingProds.length) {
                        this.presentAlert('', `Please enter a unique voucher Code - Matching voucher are :- ${matchingProds}`);
                        return;
                    }
                }
            }
            if (this.voucher.prodName === null || this.voucher.prodName === '') {
                this.presentAlert('', 'Please enter voucher name');
            }
            else if (!this.voucher.prodPrice) {
                this.presentAlert('', 'Please enter voucher price');
            }
            else if (this.voucher.productCode === null || this.voucher.productCode === '') {
                this.presentAlert('', 'Please enter voucher Code');
            }
            else if (this.voucher.prodDesc === null || this.voucher.prodDesc === '') {
                this.presentAlert('', 'Please enter voucher description');
            }
            else if (!(this.voucher.categories && this.voucher.categories.length) && !(this.voucher.brands && this.voucher.brands.length)) {
                this.presentAlert('', 'Please select any category or brand');
            }
            else if (this.listOfBase64Image.length !== 0 && this.coverValue === false) {
                this.presentAlert('', 'Please make any one image as cover picture');
            }
            else if (this.voucher.gst && this.voucher.gst > 100) {
                this.presentAlert('', `${this.taxType} value must be less than 100`);
            }
            else {
                yield this.presentLoading();
                this.voucher.createdAt = new Date();
                this.voucher.updatedAt = new Date();
                this.voucher.sortedAt = new Date();
                this.voucher.nameToSearch = this.voucher.prodName.toLowerCase();
                if (!this.voucher.prodPrice) {
                    this.voucher.prodPrice = null;
                }
                if (this.userRole === 'vendor') {
                    this.voucher.vendorId = yield this.storage.get('uid');
                }
                if (this.isUniversal && this.editProductId) {
                    const slugName = this.sharedService.createSlugName(this.voucher.slug.name);
                    const sameSlugExists = yield this.sharedService.sameSlugExists('products', this.voucher, slugName);
                    if (sameSlugExists) {
                        this.presentAlert('', 'Same slug already exists, please try with another slug name');
                        return;
                    }
                    else {
                        this.voucher.slug = {
                            name: slugName,
                            updatedAt: new Date(),
                            updatedBy: 'admin'
                        };
                    }
                }
                if (this.editProductId) {
                    console.log('edit prod');
                    this.events.publish('voucher:editProduct', this.voucher, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
                }
                else {
                    console.log('new prod');
                    this.events.publish('voucher:addProduct', this.voucher, this.listOfBase64Image);
                }
            }
        });
    }
    updateNewProductStatus(status) {
        // console.log('this.voucher.approved:', this.voucher.approved);
        if (this.userRole == 'vendor' && !this.voucher.approved) {
            this.presentAlert('Alert', 'You cannot make this voucher active as it is not approved by Admin.');
            return;
        }
        if (status === true) {
            console.log('status=false');
            this.voucher.status = false;
        }
        else {
            console.log('status=true');
            this.voucher.status = true;
        }
    }
    newProductCoverPic(index) {
        //console.log('index of cover pic', index);
        for (let i = 0; i < this.listOfBase64Image.length; i++) {
            if (i === index) {
                this.listOfBase64Image[index].cover = true;
            }
            else {
                this.listOfBase64Image[i].cover = false;
            }
        }
    }
    editProductCoverPicInData(index) {
        const editImgData = this.voucher.images[index];
        this.voucher.coverPic = editImgData;
        for (let i = 0; this.listOfBase64Image.length; i++) {
            this.listOfBase64Image[i].cover = false;
        }
    }
    editProductCoverPicInList(index) {
        this.voucher.coverPic = {
            imageId: null,
            mob: null,
            thumb: null,
            url: null
        };
        for (let i = 0; i < this.listOfBase64Image.length; i++) {
            if (i === index) {
                this.listOfBase64Image[index].cover = true;
            }
            else {
                this.listOfBase64Image[i].cover = false;
            }
        }
    }
    imagesReorder(event) {
        let b = this.voucher.images[event.detail.from];
        this.voucher.images[event.detail.from] = this.voucher.images[event.detail.to];
        this.voucher.images[event.detail.to] = b;
        this.needToUpdateImages = true;
        event.detail.complete();
    }
    removeEditImageInData(index, url) {
        this.voucher.images.splice(index, 1);
        if (url === this.voucher.coverPic.url) {
            this.voucher.coverPic = {
                imageId: null,
                mob: null,
                thumb: null,
                url: null,
            };
        }
        this.needToUpdateImages = true;
    }
    cancel() {
        this.router.navigate(['voucher']);
    }
    onClickImage(img) {
        let imgZoomUrls = [];
        for (const img of this.listOfBase64Image) {
            imgZoomUrls.push({ url: img.base64Img });
        }
        let imgIndex = this.listOfBase64Image.indexOf(img);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgZoomUrls,
                index: imgIndex
            }
        }).then(modal => modal.present());
    }
    onClickEditImage(img) {
        let imgZoomUrls = [];
        let imgurl = { url: img };
        for (const img of this.listOfBase64Image) {
            imgZoomUrls.push({ url: img.base64Img });
        }
        for (const img of this.voucher.images) {
            imgZoomUrls.push({ url: img.url });
        }
        let imgIndex = imgZoomUrls.indexOf(imgurl);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgZoomUrls,
                index: imgIndex
            }
        }).then(modal => modal.present());
    }
    deleteAlertConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this product?',
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
                            this.deleteProduct();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteProduct() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loader = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loader.present();
            this.events.publish('voucher:deleteProduct', this.editProductId);
        });
    }
    presentAlert(heading, desc, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: heading,
                message: desc,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            //console.log('Confirm Okay', this.routeFromCategories, action);
                            if (action === true && !this.routeFromCategories && !this.routeFromOptions && !this.fromAppointment) {
                                this._location.back();
                            }
                            else if (action === true && this.routeFromCategories) {
                                this._location.back();
                            }
                            else if (action === true && this.routeFromOptions) {
                                this._location.back();
                            }
                            else if (action === true && this.fromAppointment) {
                                this.router.navigate(['admin-products']);
                            }
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loader = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loader.present();
        });
    }
    onClickCategoryCheckBox(cid) {
        if (this.voucher.categories) {
            if (this.voucher.categories.indexOf(cid) === -1) {
                this.voucher.categories.push(cid);
            }
            else {
                const cidIndex = this.voucher.categories.indexOf(cid);
                this.voucher.categories.splice(cidIndex, 1);
            }
        }
        else {
            this.voucher.categories = [];
            this.voucher.categories.push(cid);
        }
    }
    onClickBrandCheckBox(bid) {
        if (this.voucher.brands) {
            if (this.voucher.brands.indexOf(bid) === -1) {
                this.voucher.brands.push(bid);
            }
            else {
                const bidIndex = this.voucher.brands.indexOf(bid);
                this.voucher.brands.splice(bidIndex, 1);
            }
        }
        else {
            this.voucher.brands = [];
            this.voucher.brands.push(bid);
        }
    }
    editCheckBoxValue(id) {
        if (this.voucher.categories) {
            if (this.voucher.categories.indexOf(id) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    editBrandCheckBoxValue(id) {
        if (this.voucher.brands && this.voucher.brands.length && this.voucher.brands.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    clearSearchCategory() {
        this.searchCategory = null;
    }
    clearSearchBrand() {
        this.searchBrand = null;
    }
    allowPaymentToggle() {
        this.voucher.allowPayment = !this.voucher.allowPayment;
    }
    addSearchKeywords() {
        this.voucher.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    removeKeyword(i) {
        this.voucher.searchKeywords.splice(i, 1);
    }
    editProductAddSearchKeywords() {
        this.voucher.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    editProductRemoveKeyword(i) {
        this.voucher.searchKeywords.splice(i, 1);
    }
    stopOrderWhenNoQtyToggle() {
        this.voucher.stopWhenNoQty = !this.voucher.stopWhenNoQty;
    }
    editProductStopOrderWhenNoQtyToggle(status) {
        if (status) {
            this.voucher.stopWhenNoQty = false;
        }
        else {
            this.voucher.stopWhenNoQty = true;
        }
    }
    getSubcategories(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.listOfSubcategories.hasOwnProperty(cid)) {
                let subcategories = [];
                subcategories = yield this.voucherService.getSubcategoriesInNewProduct(cid);
                // console.log('subCate:::', subcategories);
                if (this.userRole == 'vendor' && this.roleVendorId) {
                    this.listOfSubcategories[cid] = subcategories.filter((subCat) => this.roleVendorData.categories.includes(subCat.id));
                }
                else {
                    this.listOfSubcategories[cid] = subcategories;
                }
                //console.log('listOfSubcategories', this.listOfSubcategories);
                this.listOfSubcategoriesInView[cid] = { active: true };
            }
            else {
                if (!this.listOfSubcategoriesInView[cid].active) {
                    this.listOfSubcategoriesInView[cid].active = true;
                }
                else {
                    this.listOfSubcategoriesInView[cid].active = false;
                }
            }
        });
    }
    getSubOfSubCategories(catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('catId:', catId, 'subCatId:', subCatId);
            if (!this.subOfSubCategories.hasOwnProperty(subCatId)) {
                let subOfSubCategoriesData = [];
                subOfSubCategoriesData = yield this.categoryService.getSubOfSubCategories(catId, subCatId);
                if (this.userRole == 'vendor' && this.roleVendorId) {
                    this.subOfSubCategories[subCatId] = subOfSubCategoriesData.filter((subCat) => this.roleVendorData.categories.includes(subCat.id));
                }
                else {
                    this.subOfSubCategories[subCatId] = subOfSubCategoriesData;
                }
                this.subOfSubCategoryToggle[subCatId] = { active: true };
                // console.log('subOfSubCategories:', this.subOfSubCategories);
            }
            else {
                this.subOfSubCategoryToggle[subCatId].active = !this.subOfSubCategoryToggle[subCatId].active;
                // console.log('subOfSubCategoryToggle:', this.subOfSubCategoryToggle[subCatId]);
            }
        });
    }
    changeInPrice() {
        if (this.voucher.discountedPrice === this.voucher.prodPrice) {
            this.voucher.discountedPrice = null;
        }
    }
    onDrop(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
            //console.log(this.listOfBase64Image,this.voucher)
            let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed';
            if (this.listOfBase64Image && !this.voucher && (this.listOfBase64Image.length == this.imagesLimit)) {
                // console.log('here1', this.listOfBase64Image.length)
                this.presentAlert('Upload failed', message);
            }
            else if (this.voucher && this.voucher.images && (this.voucher.images.length == this.imagesLimit)) {
                // console.log('here2')
                this.presentAlert('Upload failed', message);
            }
            else if (this.listOfBase64Image.length && this.voucher && this.voucher.images && (this.listOfBase64Image.length + this.voucher.images.length == this.imagesLimit)) {
                // console.log('here3')
                this.presentAlert('Upload failed', message);
            }
            else {
                const modal = yield this.modalController.create({
                    component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_12__["ImageEditorComponent"],
                    componentProps: {
                        aspectRatioWidthVal: 1,
                        aspectRatioHeightVal: 1,
                        type: 'product',
                    },
                    cssClass: 'custom-img-editor'
                });
                yield modal.present();
                modal.onDidDismiss().then(res => {
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            let size = this.calculateImageSize(res.data[i] || '');
                            this.listOfBase64Image.push({ base64Img: res.data[i] || '', cover: false, size: size });
                        }
                    }
                });
            }
        });
    }
    addNewSection() {
        if (this.productSections.length < this.sectionLimit) {
            this.openProductSectionModal();
        }
        else {
            this.presentAlert('Sections limit reached, Max ' + this.sectionLimit + ' allowed');
        }
    }
    openProductSectionModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_9__["ProductSectionPage"],
                backdropDismiss: false,
                cssClass: 'custom-modal',
                componentProps: { productId: this.editProductId }
            });
            modal.onDidDismiss().then(() => {
                this.getSections();
            });
            yield modal.present();
        });
    }
    openWidgetEdit(type, id, index) {
        if (type == "image-banner") {
            const navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-banner'], navigationExtras);
        }
        if (type == "image-block") {
            const navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-image-block'], navigationExtras);
        }
        else if (type == "video-block") {
            const navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-video-block'], navigationExtras);
        }
        else if (type == "text-block") {
            const navigationExtras = {
                queryParams: {
                    ID: id,
                    index: index,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-text-block'], navigationExtras);
        }
        else if (type == "product-carousel" || type == "product-list") {
            const navigationExtras = {
                queryParams: {
                    ID: id,
                    index: index,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-product-carousel'], navigationExtras);
        }
    }
    getSections() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let sections = yield this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["first"])()).toPromise();
                if (sections && sections.sections) {
                    this.productSections = sections.sections;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SectionReorder(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let draggedItem = this.productSections.splice(event.detail.from, 1)[0];
            this.productSections.splice(event.detail.to, 0, draggedItem);
            event.detail.complete();
            yield this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
            this.presentAlert('Sections saved successfully!');
        });
    }
    deleteSectionConfirm(widgetID, index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this section?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.events.publish('widgets:deleteWidget', widgetID);
                            this.deleteSection(index, type);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteSection(index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.presentLoading();
            this.productSections.splice(index, 1);
            try {
                yield this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').update({ 'sections': this.productSections });
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert('Sections saved successfully!');
            }
            catch (error) {
                console.log(error);
                this.presentAlert('Some error occured, please try again');
            }
        });
    }
    changeLocationStatus(index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            if (type == "app") {
                if (this.productSections[index].location == "app") {
                    this.productSections[index].location = "none";
                }
                else if (this.productSections[index].location == "none") {
                    this.productSections[index].location = "app";
                }
                else if (this.productSections[index].location == "all") {
                    this.productSections[index].location = "web";
                }
                else if (this.productSections[index].location == "web") {
                    this.productSections[index].location = "all";
                }
            }
            else if (type == "web") {
                if (this.productSections[index].location == "web") {
                    this.productSections[index].location = "none";
                }
                else if (this.productSections[index].location == "none") {
                    this.productSections[index].location = "web";
                }
                else if (this.productSections[index].location == "all") {
                    this.productSections[index].location = "app";
                }
                else if (this.productSections[index].location == "app") {
                    this.productSections[index].location = "all";
                }
            }
            try {
                yield this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert('Sections saved successfully!');
            }
            catch (error) {
                console.log(error);
                this.presentAlert('Some error occured, please try again');
            }
        });
    }
    toggleGstExclusive() {
        this.voucher.gstExclusive = !this.voucher.gstExclusive;
    }
    toggleGstExclusiveEdit() {
        this.voucher.gstExclusive = !this.voucher.gstExclusive;
    }
    getEditSlabInputs(slab) {
        let adminInput;
        adminInput = [
            {
                name: 'mrp',
                type: 'number',
                placeholder: "Edit price",
                value: slab.mrp
            },
            {
                name: 'price',
                type: 'number',
                placeholder: "Edit discount price",
                value: slab.price
            }
        ];
        return adminInput;
    }
    changeComponent(index) {
        let prevMsgDiv = document.getElementById(this.selectedId);
        prevMsgDiv.style.background = 'white';
        let msgDiv = document.getElementById(index.toString());
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.selectedId = index.toString();
    }
    getUpdatedFields(data) {
        if (!data.hasOwnProperty('gstExclusive')) {
            data['gstExclusive'] = this.voucher.gstExclusive;
        }
        return data;
    }
    addVendor(e) {
        //console.log('vendorId', e.target.value);
        this.voucher.vendorId = e.target.value;
    }
    removeSubscriptions() {
        this.events.unsubscribe('voucher:addSuccess');
        this.events.unsubscribe('voucher:addFailure');
        this.events.unsubscribe('voucher:editSuccess');
        this.events.unsubscribe('voucher:editFailure');
        this.events.unsubscribe('product-options:editSuccess');
        this.events.unsubscribe('product-options:editFailure');
        this.events.unsubscribe('voucher:deleteSuccess');
        this.events.unsubscribe('voucher:deleteFailure');
        this.events.unsubscribe('voucher:publishAllCategoriesForAdmin');
        this.events.unsubscribe('voucher:publishgetProductWithId');
        this.events.unsubscribe('product-options:publishOptionData');
        this.events.unsubscribe('product-options:deleteProductOptionSuccess');
        this.events.unsubscribe('brands:publishAllBrandsForAdmin');
        this.events.unsubscribe('brands:noBrandAvailableForAdmin');
        this.events.unsubscribe('voucher:noCategoryAvailable');
        this.events.unsubscribe('vendor:getVendorNameSuccess');
    }
};
CreateVoucherPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: src_app_services_voucher_voucher_service__WEBPACK_IMPORTED_MODULE_13__["VoucherService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__["AngularFirestore"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_14__["SharedService"] },
    { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__["CategoriesService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], CreateVoucherPage.prototype, "content", void 0);
CreateVoucherPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-voucher',
        template: __webpack_require__(/*! raw-loader!./create-voucher.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/vouchers/create-voucher/create-voucher.page.html"),
        styles: [__webpack_require__(/*! ./create-voucher.page.scss */ "./src/app/admin/vouchers/create-voucher/create-voucher.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
        src_app_services_voucher_voucher_service__WEBPACK_IMPORTED_MODULE_13__["VoucherService"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__["AngularFirestore"],
        _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_14__["SharedService"],
        src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__["CategoriesService"]])
], CreateVoucherPage);



/***/ })

}]);
//# sourceMappingURL=admin-vouchers-create-voucher-create-voucher-module-es2015.js.map