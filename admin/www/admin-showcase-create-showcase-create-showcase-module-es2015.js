(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-showcase-create-showcase-create-showcase-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/showcase/create-showcase/create-showcase.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/showcase/create-showcase/create-showcase.page.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{editProductId ? 'Edit' : 'New' }} Showcase</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Description</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Categories and Brands</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Images</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <!-- Showcase -->\r\n  <super-tabs-container>\r\n    <!-- Basic -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>\r\n                        Showcase Name (please don't use \"/\" in name)\r\n                      </ion-label>\r\n                    </div>\r\n                    <div class=\"flex-label\" *ngIf=\"userRole != 'vendor'\">\r\n                      <ion-label>Show</ion-label>&nbsp;&nbsp;\r\n                      <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"showcase.status\"\r\n                              [disabled]=\"editShowDisable()\" (click)=\"updateNewProductStatus(showcase.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </div>\r\n                  </div>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"showcase.prodName\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n              <ion-col size=\"4\">\r\n                <ion-label>\r\n                  Price\r\n                </ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"showcase.prodPrice\"></ion-input>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>\r\n                    Discounted Price\r\n                  </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"showcase.discountedPrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <br />\r\n            <ion-row>\r\n              <ion-col size=\"10\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Keywords (Search)</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"keyword\" autocapitalize></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"2\">\r\n                <ion-button class=\"btn-2 m-t-36\" fill=\"outline\" shape=\"round\" (click)=\"addSearchKeywords()\">\r\n                  Add </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"showcase.searchKeywords\">\r\n                <ion-chip outline color=\"dark\" *ngFor=\"let x of showcase.searchKeywords; let i = index;\">\r\n                  <ion-icon name=\"close-circle\" (click)=\"removeKeyword(i)\"></ion-icon>\r\n                  <ion-label>{{x}}</ion-label>\r\n                </ion-chip>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Showcase Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"showcase.productCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>HSN Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"showcase.hsnCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Country Of Origin</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"showcase.additionalInfo.countryOfOrigin\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Description -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-row>\r\n            <ion-col size=\"12\">\r\n              <p style=\"font-weight: bold;\">Showcase Description</p>\r\n              <br>\r\n              <ckeditor [(ngModel)]=\"showcase.prodDesc\" [config]=\"ckeConfig\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col size=\"12\" style=\"margin-top:1rem;\">\r\n              <p style=\"font-weight: bold;\">Showcase Short Description</p>\r\n              <br>\r\n              <ckeditor [config]=\"ckeConfig\" [(ngModel)]=\"showcase.prodShortDesc\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <br>\r\n          <ng-container *ngIf=\"editProductId\">\r\n            <ion-button shape=\"round\" class=\"btn-1 i-start\" color=\"primary\" (click)=\"addNewSection()\"\r\n              style=\"margin-bottom: 15px; margin-top: 15px;\">\r\n              <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n              Add New Section\r\n            </ion-button>\r\n            <ion-reorder-group (ionItemReorder)=\"SectionReorder($event)\" disabled=\"false\">\r\n              <ion-item *ngFor=\"let item of productSections; let i = index\">\r\n                <div class=\"section\">\r\n                  <div style=\"display: inline-flex\">\r\n                    <ion-reorder slot=\"end\"> <i class=\"flaticon-menu\"></i>\r\n                    </ion-reorder>\r\n                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <p style=\"margin-top: -12px;font-size: large\">Section\r\n                      {{i+1}}</p>\r\n                  </div>\r\n                  <br><br>\r\n                  <div class=\"sectionBlock\">\r\n                    <div style=\"display: block\">\r\n                      <p *ngIf=\"item.sectionName\" class=\"crop\">Name: {{item.sectionName}}</p>\r\n                      <br *ngIf=\"item.sectionName\">\r\n                      <p *ngIf=\"item.widgetType\">Type: {{item.widgetType}}</p>\r\n                    </div>\r\n                    <div style=\"display: flex\">\r\n                      <div>\r\n                        <ion-button (click)=\"openWidgetEdit(item.widgetType,item.widgetID,i)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Edit\r\n                        </ion-button>\r\n                        &nbsp;&nbsp;\r\n                        <ion-button (click)=\"deleteSectionConfirm(item.widgetID,i, 'web')\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Delete\r\n                        </ion-button>\r\n                      </div>\r\n                      <ion-list lines=\"none\" style=\"display: flex;margin-top: -20px;margin-left: 10px\">\r\n                        <ion-item>\r\n                          <ion-label>App</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='app' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'app')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n\r\n                        <ion-item>\r\n                          <ion-label>Website</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='web' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'web')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n                      </ion-list>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!editProductId\">\r\n            <ion-text color=\"danger\" style=\"display: flex;justify-content: center;\">\r\n              <p style=\"font-weight: bold;font-size: large;\">\r\n                * Once product is created, you can create sections for showcase description\r\n              </p>\r\n            </ion-text>\r\n          </ng-container>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Categories and Brands -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\"\r\n          style=\"display: flex;flex-wrap: nowrap;flex-direction: row;align-content: center;justify-content: space-around;align-items: flex-start;\">\r\n          <div class=\"categories-container\">\r\n            <div class=\"no-data\" *ngIf=\"showNoCategories\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No categories</h6>\r\n            </div>\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoCategories\">\r\n              <ion-searchbar [(ngModel)]=\"searchCategory\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <div class=\"categories-wrapper\" *ngIf=\"!showNoCategories\">\r\n              <ion-list>\r\n                <ion-list-header>\r\n                  <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Categories\r\n                  </ion-label>\r\n                </ion-list-header>\r\n                <div *ngFor=\"let category of categories | filter: searchCategory\">\r\n                  <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                    <ion-item (click)=\"onClickCategoryCheckBox(category.id)\" style=\"width: 100%;\">\r\n                      <ion-label>{{category.name}}</ion-label>\r\n                      <ion-checkbox [checked]=\"editCheckBoxValue(category.id)\" color=\"primary\" slot=\"start\">\r\n                      </ion-checkbox>\r\n                    </ion-item>\r\n                    <div (click)=\"getSubcategories(category.id)\" slot=\"end\"\r\n                      style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"category.isSubcategories\">\r\n                      <i class=\"flaticon-null-13\"\r\n                        *ngIf=\"(listOfSubcategoriesInView.hasOwnProperty(category.id) && !listOfSubcategoriesInView[category.id].active) || !listOfSubcategoriesInView.hasOwnProperty(category.id)\"></i>\r\n                      <i class=\"flaticon-null-14\"\r\n                        *ngIf=\"listOfSubcategoriesInView.hasOwnProperty(category.id) && listOfSubcategoriesInView[category.id].active\"></i>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    *ngIf=\"(listOfSubcategories[category.id] && listOfSubcategories[category.id].length) && listOfSubcategoriesInView[category.id].active\"\r\n                    style=\"margin-left: 10%;\">\r\n                    <ng-container *ngFor=\"let subCat of listOfSubcategories[category.id]\">\r\n                      <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                        <ion-item (click)=\"onClickCategoryCheckBox(subCat.id)\" style=\"width: 100%;\">\r\n                          <ion-label>{{subCat.name}}</ion-label>\r\n                          <ion-checkbox [checked]=\"editCheckBoxValue(subCat.id)\" color=\"primary\" slot=\"start\">\r\n                          </ion-checkbox>\r\n                        </ion-item>\r\n                        <!-- Sub-SubCategory Start -->\r\n                        <div (click)=\"getSubOfSubCategories(category.id, subCat.id)\" slot=\"end\"\r\n                          style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"subCat.isSubcategories\">\r\n                          <i class=\"flaticon-null-13\" *ngIf=\"!subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                          <i class=\"flaticon-null-14\" *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                        </div>\r\n                      </div>\r\n                      <ng-container\r\n                        *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active && subOfSubCategories[subCat.id].length\">\r\n                        <div style=\"margin-left: 10%;\">\r\n                          <ng-container *ngFor=\"let subSubCat of subOfSubCategories[subCat.id]\">\r\n                            <ion-item (click)=\"onClickCategoryCheckBox(subSubCat.id)\">\r\n                              <ion-label>{{subSubCat.name}}</ion-label>\r\n                              <ion-checkbox [checked]=\"editCheckBoxValue(subSubCat.id)\" color=\"primary\" slot=\"start\">\r\n                              </ion-checkbox>\r\n                            </ion-item>\r\n                          </ng-container>\r\n                        </div>\r\n                      </ng-container>\r\n                      <!-- Sub-SubCategory End -->\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n\r\n              </ion-list>\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"brands-container\">\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoBrands\">\r\n              <ion-searchbar [(ngModel)]=\"searchBrand\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <ion-list *ngIf=\"!showNoBrands && brands.length\">\r\n              <ion-list-header>\r\n                <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Brands</ion-label>\r\n              </ion-list-header>\r\n              <div *ngFor=\"let brand of brands | filter: searchBrand\">\r\n                <ion-item (click)=\"onClickBrandCheckBox(brand.id)\" style=\"width: 100%;\">\r\n                  <ion-label>{{brand.name}}</ion-label>\r\n                  <ion-checkbox [checked]=\"editBrandCheckBoxValue(brand.id)\" color=\"primary\" slot=\"start\">\r\n                  </ion-checkbox>\r\n                </ion-item>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Images -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <button class=\"upload-btn btn-1 i-start\" (click)=\"onDrop($event.target.files)\">Upload Showcase\r\n            Image(s)</button>\r\n          <h3>Uploads</h3>\r\n          <div class=\"no-img\" *ngIf=\"listOfBase64Image.length == 0\">\r\n            No attached images\r\n          </div>\r\n\r\n          <div class=\"imgs-container\" *ngIf=\"listOfBase64Image.length !== 0\">\r\n            <div class=\"img-wrap\" *ngFor=\"let img of listOfBase64Image; let i = index\">\r\n              <img [src]=\"img.base64Img\" (click)=\"onClickEditImage(img.url)\" />\r\n              <div class=\"overlay\">\r\n                <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" (click)=\"removeImage(i)\">\r\n                  <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == true\" class=\"btn-2 cover\" shape=\"round\">\r\n                  Cover Pic\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == false\" (click)=\"newProductCoverPic(i)\" class=\"btn-2 cover\"\r\n                  shape=\"round\">\r\n                  Make Cover\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Image List -->\r\n          <div class=\"list-header\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"reorder\">\r\n                  <p>Reorder</p>\r\n                </ion-col>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <div class=\"list-container\">\r\n            <ion-reorder-group (ionItemReorder)=\"imagesReorder($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n              <ion-item *ngFor=\"let img of showcase.images; let i = index\" lines=\"none\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"ion-align-items-center\">\r\n                    <ion-col class=\"reorder\">\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                    <ion-col class=\"img\">\r\n                      <img [src]=\"img.url\" (click)=\"onClickEditImage(img.url)\" height=\"200px\" />\r\n                    </ion-col>\r\n                    <ion-col class=\"action\">\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" large\r\n                          (click)=\"removeEditImageInData(i, img.url)\">\r\n                          <ion-icon name=\"trash\" slot=\"icon-only\" style=\" font-size: 16px;\"></ion-icon>\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"showcase.coverPic.imageId == img.imageId\" class=\"btn-2 cover\" shape=\"round\"\r\n                          disabled>\r\n                          Cover\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"showcase.coverPic.imageId != img.imageId \" class=\"btn-2 cover\" shape=\"round\"\r\n                          (click)=\"editProductCoverPicInData(i)\">\r\n                          Make Cover\r\n                        </ion-button>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n                <br>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n          <!-- Image List -->\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Advanced (optional) -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2 id=\"scroll1\">\r\n                <div class=\"statusList\">\r\n                  <div [id]=\"i\" *ngFor=\"let item of sideMenu; index as i\" (click)='changeComponent(i)'>\r\n                    <ng-container *ngIf=\"userRole !== 'vendor'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"userRole == 'vendor' && item != 'Vendor' && item != 'Specific User Discount'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=10 id=\"scroll2\" style=\"border-left: 1px solid lightgray;\">\r\n                <ng-container [ngSwitch]=\"selectedId\">\r\n                  <ion-grid>\r\n\r\n                    <!-- Price Slabs -->\r\n                    <!-- <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Price Slabs</h3>\r\n                      </ion-col>\r\n                      <ion-col>\r\n                        <div style=\"display: flex;align-items: center;\">\r\n                          <div>Price slabs for product</div>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\" (click)=\"toggleCheckbox('priceSlab')\"\r\n                                [checked]=\"showcase.priceSlabs.active\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                        <br>\r\n                        <div *ngIf='showcase.priceSlabs && showcase.priceSlabs.active'>\r\n                          <div>\r\n                            <div style=\"display: flex;align-items: center;\">\r\n                              <ion-button (click)=\"enterPriceSlabData()\">\r\n                                <p\r\n                                  *ngIf=\"showcase.priceSlabs.singleSlabs && showcase.priceSlabs.singleSlabs.length == 0\">\r\n                                  Create Slab</p>\r\n                                <p\r\n                                  *ngIf=\"showcase.priceSlabs.singleSlabs && showcase.priceSlabs.singleSlabs.length > 0\">\r\n                                  Add Slab</p>\r\n                              </ion-button>&nbsp;&nbsp;\r\n                              <ion-button (click)=\"removePriceSlabs()\">\r\n                                Remove All Slabs\r\n                              </ion-button>\r\n                            </div>\r\n                            <br>\r\n                            <ion-grid\r\n                              *ngIf=\"showcase.priceSlabs.singleSlabs && showcase.priceSlabs.singleSlabs.length > 0\"\r\n                              class=\"ion-no-padding data-table ion-text-center\"\r\n                              style=\"margin-top: 12px;width: 400px;margin-left: 0px;\">\r\n                              <ion-row>\r\n                                <ion-col>Quantity</ion-col>\r\n                                <ion-col>Price per product</ion-col>\r\n                                <ion-col>Discount price per product</ion-col>\r\n                                <ion-col>Edit</ion-col>\r\n                              </ion-row>\r\n                              <ion-row *ngFor=\"let slab of showcase.priceSlabs.singleSlabs; let i=index;\"\r\n                                style=\"border-top: 1px solid lightgray;\">\r\n                                <ion-col>\r\n                                  <p>{{slab.qty[0]}} - {{slab.qty[1]}}</p>\r\n                                </ion-col>\r\n                                <ion-col>\r\n                                  <p>{{slab.mrp}}</p>\r\n                                </ion-col>\r\n                                <ion-col>\r\n                                  <p>{{slab.price}}</p>\r\n                                </ion-col>\r\n                                <ion-col>\r\n                                  <p class=\"cursor-p\">\r\n                                    <i class=\"flaticon-pencil-edit-button\"\r\n                                      (click)=\"editPriceSlabDataForSingleSlab(i, slab)\">\r\n                                    </i>\r\n                                  </p>\r\n                                </ion-col>\r\n                              </ion-row>\r\n                            </ion-grid>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Colors -->\r\n                    <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Colors</h3>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <ion-label>Color</ion-label>&nbsp;&nbsp;\r\n                        <ion-button (click)=\"selectVariantColor()\" fill=\"outline\" shape=\"round\"\r\n                          *ngIf=\"!showcase.color?.hasOwnProperty('name')\">\r\n                          Select Color\r\n                        </ion-button>\r\n                        <div *ngIf=\"showcase.color?.hasOwnProperty('name')\" class=\"color-selected\">\r\n                          <p class=\"product-color-name\">\r\n                            {{showcase.color.name}}</p>\r\n                          <div [ngStyle]=\"{'background-color': showcase.color.code}\" class=\"color-code\"\r\n                            *ngIf=\"showcase.color.code && showcase.color.code !== ''\">\r\n                          </div>\r\n                          <div\r\n                            *ngIf=\"showcase.color.image && showcase.color.image !== '' && showcase.color.code === ''\">\r\n                            <img src=\"{{showcase.color.image}}\" class=\"color-code\">\r\n                          </div>\r\n                          <ion-button (click)=\"updateEditVariantColor()\" expand=\"block\" fill=\"outline\" shape=\"round\"\r\n                            size=\"small\">\r\n                            update\r\n                          </ion-button>&nbsp;&nbsp;&nbsp;\r\n                          <ion-button (click)=\"removeEditVariantColor()\" expand=\"block\" color=\"dark\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            remove\r\n                          </ion-button>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Vendors -->\r\n                    <ion-row *ngSwitchCase=\"1\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Vendors</h3>\r\n                      </ion-col>\r\n                      <ion-text *ngIf=\"!multiVendor\" color=\"danger\">\r\n                        This option is only available when MultiVendor is on.\r\n                      </ion-text>\r\n                      <ion-col size=\"6\">\r\n                        <ng-container *ngIf=\"multiVendor && vendors.length\">\r\n                          <ion-row>\r\n                            <div class=\"headings\">\r\n                              Add Vendor\r\n                            </div>\r\n                          </ion-row>\r\n                          <ion-row>\r\n                            <ion-col size=\"12\">\r\n                              <ion-select [value]=\"showcase.vendorId\" class=\"border i-s-p-10\"\r\n                                (ionChange)=\"addVendor($event)\" placeholder=\"Select Vendor\">\r\n                                <ion-select-option value=\"\">No Vendor</ion-select-option>\r\n                                <ion-select-option [value]=\"vendor.id\" *ngFor=\"let vendor of vendors\">\r\n                                  {{vendor.name}}\r\n                                </ion-select-option>\r\n                              </ion-select>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                        </ng-container>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Filters -->\r\n                    <ion-row *ngSwitchCase=\"2\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Filters</h3>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div *ngIf=\"isFilterActive\">\r\n                          <ion-row>\r\n                            <div class=\"headings\">\r\n                              Add filter\r\n                            </div>\r\n                          </ion-row>\r\n                          <ion-row>\r\n                            <ion-col size=\"6\" class=\"border content-alignment f-s-14 filters-col\"\r\n                              (click)=\"addFilters()\">\r\n                              <ion-text>\r\n                                {{getAddedFiltersLength(showcase.filters)}} Filters added\r\n                              </ion-text>\r\n                              &nbsp;&nbsp;\r\n                              <i class=\"flaticon-null-5\"></i>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Wholesale Price -->\r\n                    <!-- <ion-row *ngSwitchCase=\"4\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Wholesale Price</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Variant Groups -->\r\n                    <!-- <ion-row *ngSwitchCase=\"5\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Variant Groups</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Seo for Website -->\r\n                    <ion-row *ngSwitchCase=\"3\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Website SEO</h3>\r\n                      </ion-col>\r\n\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Title</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"showcase.metaData.pageTitle\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Description</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"showcase.metaData.metaDescription\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Keywords</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"showcase.metaData.metaKeywords\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Attributes -->\r\n                    <!-- <ion-row *ngSwitchCase=\"7\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Attributes</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Variant Chart -->\r\n                    <!-- <ion-row *ngSwitchCase=\"8\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Variant Chart</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Clone Showcase -->\r\n                    <!-- <ion-row *ngSwitchCase=\"9\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Clone Showcase</h3>\r\n                      </ion-col>\r\n\r\n                      <ion-row>\r\n                        <ion-col>\r\n                          <ng-container *ngIf=\"!editProductId\">\r\n                            <ion-text color=\"danger\">\r\n                              <p>Note: This feature is available when you edit this showcase.</p>\r\n                            </ion-text>\r\n                          </ng-container>\r\n                          <ng-container *ngIf=\"editProductId\">\r\n                            <ion-button color=\"primary\" fill=\"outline\" shape=\"round\" size=\"small\"\r\n                              (click)=\"cloneProduct()\">Clone Product</ion-button>\r\n                          </ng-container>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Custom Action -->\r\n                    <!-- <ion-row *ngSwitchCase=\"10\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Custom Action</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Stock Attributes -->\r\n                    <!-- <ion-row *ngSwitchCase=\"11\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Stock Attributes</h3>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n\r\n                    <!-- Slug Name -->\r\n                    <ion-row *ngSwitchCase=\"4\">\r\n                      <ng-container *ngIf=\"isUniversal && editProductId else noUniversal\">\r\n                        <ion-col>\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Slug Name\r\n                              <ion-text color=\"danger\">\r\n                                (<b class=\"cursor-p\" (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug\r\n                                Instructions)\r\n                              </ion-text>\r\n                            </ion-label>\r\n                            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                              <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='showcase.slug.name'\r\n                                style=\"width: 80%;\"></ion-input>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-template #noUniversal>\r\n                        <p>Coming Soon!</p>\r\n                      </ng-template>\r\n                    </ion-row>\r\n\r\n                  </ion-grid>\r\n\r\n                </ng-container>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n  <!-- Showcase -->\r\n\r\n</super-tabs>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"deleteAlertConfirm();\" *ngIf=\"editProductId\" shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"danger\">\r\n      <i class=\"flaticon-null-21\"></i>\r\n      Delete\r\n    </ion-button>\r\n    <ion-button (click)=\"saveProduct()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/showcase/create-showcase/create-showcase.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/showcase/create-showcase/create-showcase.module.ts ***!
  \**************************************************************************/
/*! exports provided: CreateShowcasePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateShowcasePageModule", function() { return CreateShowcasePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_showcase_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-showcase.page */ "./src/app/admin/showcase/create-showcase/create-showcase.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");












const routes = [
    {
        path: '',
        component: _create_showcase_page__WEBPACK_IMPORTED_MODULE_6__["CreateShowcasePage"]
    }
];
let CreateShowcasePageModule = class CreateShowcasePageModule {
};
CreateShowcasePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__["CKEditorModule"],
            src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_11__["ApplicationDirectivesModule"]
        ],
        declarations: [_create_showcase_page__WEBPACK_IMPORTED_MODULE_6__["CreateShowcasePage"]],
        entryComponents: []
    })
], CreateShowcasePageModule);



/***/ }),

/***/ "./src/app/admin/showcase/create-showcase/create-showcase.page.scss":
/*!**************************************************************************!*\
  !*** ./src/app/admin/showcase/create-showcase/create-showcase.page.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-btn-wrapper {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.upload-btn {\n  color: #fff;\n  background-color: var(--ion-color-primary);\n  padding: 8px 20px;\n  border-radius: 42px;\n  font-size: 16px;\n  font-weight: 400;\n  cursor: pointer;\n  height: 42px;\n  margin-left: 16px;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.product-color-name {\n  max-width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n}\n\n.color-selected {\n  display: -webkit-box;\n  display: flex;\n}\n\n.color-code {\n  width: 40px;\n  height: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n  min-width: 40px;\n}\n\n.input-border {\n  border: 1px solid lightgray;\n  text-align: center;\n}\n\nion-select {\n  border: 1px solid lightgray;\n}\n\n.form-input {\n  border: 1px solid gray;\n  background: var(--ion-color-light);\n  margin-top: 12px;\n  border-radius: 8px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.product-search-wrap {\n  text-align: center;\n}\n\n.product-search-wrap ion-searchbar {\n  width: 300px;\n  max-width: 100%;\n  margin: auto;\n}\n\n/* width */\n\n::-webkit-scrollbar {\n  width: 5px;\n}\n\n/* Track */\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n/* Handle */\n\n::-webkit-scrollbar-thumb {\n  background: #888;\n}\n\n/* Handle on hover */\n\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\n.filters-col {\n  border: 1px solid lightgray;\n  padding: 8px;\n}\n\n.list-header {\n  position: static;\n  margin: 36px auto;\n}\n\n.list-container {\n  margin: 0;\n}\n\nion-col.img {\n  width: calc(100% - 400px);\n  max-width: calc(100% - 400px);\n  text-align: center;\n}\n\nion-col.action {\n  width: 200px;\n  max-width: 200px;\n}\n\nion-col.reorder {\n  width: 200px;\n  max-width: 200px;\n  text-align: center;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.m-l-5-p {\n  text-align: center;\n}\n\n.widget-type {\n  color: #999;\n  margin-left: 12px;\n}\n\n.section {\n  display: block;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px;\n}\n\n.sectionBlock {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 1000px;\n}\n\n.crop {\n  overflow: hidden;\n  width: 200px;\n  text-overflow: ellipsis;\n}\n\n.padding-start-16 {\n  --padding-start: 16px !important;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 80vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 87vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.groupInput {\n  border: none;\n  border-bottom: 1px solid;\n  padding: 5px;\n  text-align: center;\n}\n\n.groupSelect {\n  width: 150px;\n}\n\n.variantImageSelect {\n  border: 1px solid;\n  text-align: center;\n  max-width: 100%;\n  margin-top: 12px;\n}\n\n.groupDisplay {\n  display: -webkit-box;\n  display: flex;\n  margin-left: 12px;\n}\n\n.variantGroups {\n  margin-top: 0px !important;\n  text-align: center;\n}\n\n.remove-icon {\n  cursor: pointer;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n\n.select-wrap {\n  padding: 5px;\n  margin-left: 5px;\n  background: var(--ion-color-light);\n  border-radius: 5px;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n\n.flexJustifySpace {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox {\n  border-bottom: 1px solid lightgray;\n  margin-bottom: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox .firstHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  gap: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .inputWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput {\n  width: 120px;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin: 0 8px 8px 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput:hover {\n  border: 1px solid #000;\n}\n\n.schedulesBox .secondHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.schedulesBox .slotBtn {\n  color: #000;\n}\n\n.schedulesBox .slotBtn i {\n  color: #4a4a4a;\n  font-size: 22px;\n}\n\n.schedulesBox .slotBtn i:hover {\n  color: #000;\n}\n\n.copyList {\n  border: 0;\n}\n\n.selectInput {\n  width: 30%;\n  padding: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc2hvd2Nhc2UvY3JlYXRlLXNob3djYXNlL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcc2hvd2Nhc2VcXGNyZWF0ZS1zaG93Y2FzZVxcY3JlYXRlLXNob3djYXNlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vc2hvd2Nhc2UvY3JlYXRlLXNob3djYXNlL2NyZWF0ZS1zaG93Y2FzZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7RUFDQSwwQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSwwQkFBQTtBQ0NGOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSwyQkFBQTtBQ0NGOztBREVBO0VBQ0Usc0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBQ0NGOztBRENBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0VGOztBRENBO0VBQ0Usa0JBQUE7QUNFRjs7QURERTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ0dKOztBRENBLFVBQUE7O0FBQ0E7RUFDRSxVQUFBO0FDRUY7O0FEQ0EsVUFBQTs7QUFDQTtFQUNFLG1CQUFBO0FDRUY7O0FEQ0EsV0FBQTs7QUFDQTtFQUNFLGdCQUFBO0FDRUY7O0FEQ0Esb0JBQUE7O0FBQ0E7RUFDRSxnQkFBQTtBQ0VGOztBRENBO0VBQ0UsMkJBQUE7RUFDQSxZQUFBO0FDRUY7O0FEQ0E7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FDRUY7O0FEQ0E7RUFDRSxTQUFBO0FDRUY7O0FEQ0E7RUFDRSx5QkFBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7QUNFRjs7QURBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0dGOztBRERBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNJRjs7QUREQTtFQUNFLFVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNJRjs7QUREQTtFQUNFLGtCQUFBO0FDSUY7O0FEREE7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUNJRjs7QURGQTtFQUNFLGNBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsYUFBQTtBQ0tGOztBREhBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLGFBQUE7QUNNRjs7QURKQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0FDT0Y7O0FESkE7RUFDRSxnQ0FBQTtBQ09GOztBREpBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtBQ09GOztBREpBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtBQ09GOztBREpBO0VBQ0U7SUFDRSxZQUFBO0VDT0Y7O0VETEE7SUFDRSxZQUFBO0VDUUY7QUFDRjs7QURMQTtFQUNFLGtCQUFBO0FDT0Y7O0FETkU7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDUUo7O0FESkE7RUFDRSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNPRjs7QURKQTtFQUNFLFlBQUE7QUNPRjs7QURKQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNPRjs7QURKQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGlCQUFBO0FDT0Y7O0FESkE7RUFDRSwwQkFBQTtFQUNBLGtCQUFBO0FDT0Y7O0FESkE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0FDT0Y7O0FESkE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtFQUVBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNNRjs7QURKRTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQ01KOztBREpJOztFQUVFLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDTU47O0FESkk7RUFDRSx5QkFBQTtBQ01OOztBREhFO0VBQ0UscUJBQUE7QUNLSjs7QURIRTtFQUNFLGVBQUE7QUNLSjs7QURGQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDS0Y7O0FERkE7RUFDRSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0tGOztBREhFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsdUJBQUE7VUFBQSwyQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxRQUFBO0FDS0o7O0FERkk7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUNJTjs7QURGTTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDSVI7O0FERk07RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQ0lSOztBREhRO0VBQ0Usc0JBQUE7QUNLVjs7QURBRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHFCQUFBO1VBQUEseUJBQUE7QUNFSjs7QURBRTtFQUNFLFdBQUE7QUNFSjs7QURESTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FDR047O0FERk07RUFDRSxXQUFBO0FDSVI7O0FEQ0E7RUFDRSxTQUFBO0FDRUY7O0FEQUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQ0dGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vc2hvd2Nhc2UvY3JlYXRlLXNob3djYXNlL2NyZWF0ZS1zaG93Y2FzZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXBsb2FkLWJ0bi13cmFwcGVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi51cGxvYWQtYnRuIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgcGFkZGluZzogOHB4IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNDJweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgaGVpZ2h0OiA0MnB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG59XHJcblxyXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9XCJmaWxlXCJdIHtcclxuICBmb250LXNpemU6IDEwMHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHotaW5kZXg6IDk5O1xyXG59XHJcblxyXG4ucHJvZHVjdC1jb2xvci1uYW1lIHtcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG5cclxuLmNvbG9yLXNlbGVjdGVkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4uY29sb3ItY29kZSB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxuICBtaW4td2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5pbnB1dC1ib3JkZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmlvbi1zZWxlY3Qge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuLmZvcm0taW5wdXQge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xyXG4gIC0tcGFkZGluZy1ib3R0b206IDEycHg7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xyXG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XHJcbn1cclxuLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBpb24tc2VhcmNoYmFyIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi8qIHdpZHRoICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA1cHg7XHJcbn1cclxuXHJcbi8qIFRyYWNrICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiAjODg4O1xyXG59XHJcblxyXG4vKiBIYW5kbGUgb24gaG92ZXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogIzU1NTtcclxufVxyXG5cclxuLmZpbHRlcnMtY29sIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4ubGlzdC1oZWFkZXIge1xyXG4gIHBvc2l0aW9uOiBzdGF0aWM7XHJcbiAgbWFyZ2luOiAzNnB4IGF1dG87XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5pb24tY29sLmltZyB7XHJcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcclxuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb24ge1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG59XHJcbmlvbi1jb2wucmVvcmRlciB7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIG1heC13aWR0aDogMjAwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaW5mby10eHQge1xyXG4gIGNvbG9yOiByZWQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4ubS1sLTUtcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ud2lkZ2V0LXR5cGUge1xyXG4gIGNvbG9yOiAjOTk5O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xyXG59XHJcbi5zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5zZWN0aW9uQmxvY2sge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiAxMDAwcHg7XHJcbn1cclxuLmNyb3Age1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4ucGFkZGluZy1zdGFydC0xNiB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODB2aDtcclxufVxyXG5cclxuI3Njcm9sbDE6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxufVxyXG5cclxuI3Njcm9sbDI6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbiAgI3Njcm9sbDIge1xyXG4gICAgaGVpZ2h0OiA4N3ZoO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1c0xpc3Qge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwIHtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG5cclxuLmdyb3VwSW5wdXQge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQ7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmdyb3VwU2VsZWN0IHtcclxuICB3aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbi52YXJpYW50SW1hZ2VTZWxlY3Qge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXRvcDogMTJweDtcclxufVxyXG5cclxuLmdyb3VwRGlzcGxheSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tbGVmdDogMTJweDtcclxufVxyXG5cclxuLnZhcmlhbnRHcm91cHMge1xyXG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnJlbW92ZS1pY29uIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuLnNlbGVjdC13cmFwIHtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnRhYmxlQXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAvLyBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICB0YWJsZSB7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgdGQsXHJcbiAgICB0aCB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgfVxyXG4gICAgdHI6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxuICAuaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICB9XHJcbiAgLmRlbGV0ZUljb24ge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gIH1cclxufVxyXG4uZmxleEp1c3RpZnlTcGFjZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLnNjaGVkdWxlc0JveCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gIC5maXJzdEhhbGYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgfVxyXG4gIC5zbG90V3JhcHBlciB7XHJcbiAgICAuc2NoZWR1bGVMaXN0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG5cclxuICAgICAgLmlucHV0V3JhcHBlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgfVxyXG4gICAgICAuc2xvdElucHV0IHtcclxuICAgICAgICB3aWR0aDogMTIwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XHJcbiAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAuc2Vjb25kSGFsZiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICB9XHJcbiAgLnNsb3RCdG4ge1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBpIHtcclxuICAgICAgY29sb3I6ICM0YTRhNGE7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuLmNvcHlMaXN0IHtcclxuICBib3JkZXI6IDA7XHJcbn1cclxuLnNlbGVjdElucHV0IHtcclxuICB3aWR0aDogMzAlO1xyXG4gIHBhZGRpbmc6IDhweDtcclxufVxyXG4iLCIudXBsb2FkLWJ0bi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi51cGxvYWQtYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDQycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDQycHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xuICBmb250LXNpemU6IDEwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogOTk7XG59XG5cbi5wcm9kdWN0LWNvbG9yLW5hbWUge1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5jb2xvci1zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jb2xvci1jb2RlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWluLXdpZHRoOiA0MHB4O1xufVxuXG4uaW5wdXQtYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1zZWxlY3Qge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ucHJvZHVjdC1zZWFyY2gtd3JhcCBpb24tc2VhcmNoYmFyIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLyogd2lkdGggKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogNXB4O1xufVxuXG4vKiBUcmFjayAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG59XG5cbi8qIEhhbmRsZSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICM4ODg7XG59XG5cbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG59XG5cbi5maWx0ZXJzLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogc3RhdGljO1xuICBtYXJnaW46IDM2cHggYXV0bztcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5pb24tY29sLmltZyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDAwcHgpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xufVxuXG5pb24tY29sLnJlb3JkZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmluZm8tdHh0IHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm0tbC01LXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53aWRnZXQtdHlwZSB7XG4gIGNvbG9yOiAjOTk5O1xuICBtYXJnaW4tbGVmdDogMTJweDtcbn1cblxuLnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5zZWN0aW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAwcHg7XG59XG5cbi5jcm9wIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDIwMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnBhZGRpbmctc3RhcnQtMTYge1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHggIWltcG9ydGFudDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgwdmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG5cbiAgI3Njcm9sbDIge1xuICAgIGhlaWdodDogODd2aDtcbiAgfVxufVxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmdyb3VwSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5ncm91cFNlbGVjdCB7XG4gIHdpZHRoOiAxNTBweDtcbn1cblxuLnZhcmlhbnRJbWFnZVNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmdyb3VwRGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xufVxuXG4udmFyaWFudEdyb3VwcyB7XG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5yZW1vdmUtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5zZWxlY3Qtd3JhcCB7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuLnRhYmxlQXJlYSAuZGVsZXRlSWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmZsZXhKdXN0aWZ5U3BhY2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5zY2hlZHVsZXNCb3gge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5zY2hlZHVsZXNCb3ggLmZpcnN0SGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogOHB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdFdyYXBwZXIgLnNjaGVkdWxlTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLmlucHV0V3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLnNsb3RJbnB1dCB7XG4gIHdpZHRoOiAxMjBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90V3JhcHBlciAuc2NoZWR1bGVMaXN0IC5zbG90SW5wdXQ6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xufVxuLnNjaGVkdWxlc0JveCAuc2Vjb25kSGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIHtcbiAgY29sb3I6ICMwMDA7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIGkge1xuICBjb2xvcjogIzRhNGE0YTtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdEJ0biBpOmhvdmVyIHtcbiAgY29sb3I6ICMwMDA7XG59XG5cbi5jb3B5TGlzdCB7XG4gIGJvcmRlcjogMDtcbn1cblxuLnNlbGVjdElucHV0IHtcbiAgd2lkdGg6IDMwJTtcbiAgcGFkZGluZzogOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/showcase/create-showcase/create-showcase.page.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/showcase/create-showcase/create-showcase.page.ts ***!
  \************************************************************************/
/*! exports provided: CreateShowcasePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateShowcasePage", function() { return CreateShowcasePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/showcase/showcase.service */ "./src/app/services/showcase/showcase.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/admin/admin-shop/new-product/product-section/product-section.page */ "./src/app/admin/admin-shop/new-product/product-section/product-section.page.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/multi-region/multi-region.service */ "./src/app/services/multi-region/multi-region.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
/* harmony import */ var _variants_colors_modal_colors_modal_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../variants/colors-modal/colors-modal.page */ "./src/app/admin/variants/colors-modal/colors-modal.page.ts");
/* harmony import */ var _filter_settings_select_filter_select_filter_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../filter-settings/select-filter/select-filter.page */ "./src/app/admin/filter-settings/select-filter/select-filter.page.ts");



















let CreateShowcasePage = class CreateShowcasePage {
    constructor(route, events, alertController, router, loadingController, platform, modalController, storage, showcaseService, configService, angularFirestore, _location, vendorService, multiRegionService, sharedService, categoryService) {
        this.route = route;
        this.events = events;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalController = modalController;
        this.storage = storage;
        this.showcaseService = showcaseService;
        this.configService = configService;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.vendorService = vendorService;
        this.multiRegionService = multiRegionService;
        this.sharedService = sharedService;
        this.categoryService = categoryService;
        // Showcase Object Start
        this.showcase = {
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
            discountedPrice: null,
            searchKeywords: [],
            productCode: '',
            coverPic: {
                imageId: '',
                mob: '',
                thumb: '',
                url: ''
            },
            hsnCode: '',
            discount: 0,
            metaData: {
                pageTitle: '',
                metaDescription: '',
                metaKeywords: ''
            },
            productType: 'showcase',
            slug: {
                name: null,
                updatedAt: new Date(),
                updatedBy: 'admin'
            },
            additionalInfo: {
                countryOfOrigin: "",
            },
            priceSlabs: {
                active: false,
                singleSlabs: [],
            },
            color: {},
            vendorId: '',
            filters: {},
        };
        // Showcase Object End
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
        this.multiRegion = false;
        this.multiRegionData = [];
        this.userRole = "";
        this.vendorData = [];
        this.vendorName = 'Select Vendor';
        this.productSections = [];
        this.sideMenu = [];
        this.selectedId = '0';
        this.fromAppointment = false;
        this.needToUpdateImages = false;
        this.isUniversal = false;
        this.subOfSubCategories = {};
        this.subOfSubCategoryToggle = {};
        this.multiVendor = false;
        this.vendors = [];
        this.isFilterActive = false;
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
        // this.SHARED_LABELS = this.labelService.labels['SHARED'];
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
                    this.showcase['approved'] = true;
                    this.showcase.status = true;
                }
                else {
                    this.showcase['approved'] = false;
                    this.showcase.status = false;
                }
            }
            this.imagesLimit = this.configService.environment.productImageLimit;
            this.events.publish('showcase:getAllCategories');
            this.events.publish('brands:getAllBrandsForAdmin');
            this.events.publish('variants:getVariantsTypeData');
            this.devWidth = this.platform.width();
            if (this.editProductId) {
                this.events.publish('showcase:getProductWithId', this.editProductId);
                this.events.publish('showcase:getAllSubCategories');
                this.getSections();
            }
            this.taxType = this.configService.environment.taxType;
            this.multiRegion = this.configService.environment.multiRegion;
            this.multiVendor = this.configService.environment.multiVendor;
            if (this.multiRegion) {
                this.events.publish('multi-region:getActiveStatus');
                this.events.publish('multi-region:getAllActiveRegions');
                this.multiRegionData = yield this.multiRegionService.getAllActiveRegions('service');
                console.log('multiRegionData:', this.multiRegionData);
            }
            if (this.multiVendor) {
                this.vendors = yield this.vendorService.getAllVendors();
                if (this.vendors.length) {
                    this.vendors = this.vendors;
                }
                else {
                    this.multiVendor = false;
                }
                //this.events.publish('vendor:getAllVendors');
            }
            this.events.publish('filters:getActiveStatus');
            this.sideMenu.push(
            // "Price Slabs",
            "Colors", "Vendors", "Filters", 
            // "Wholesale Price",
            // "Variant Groups",
            "Seo for Website", 
            // "Attributes",
            // "Variant Chart",
            // "Clone Showcase",
            // "Custom Action",
            // "Stock Attributes",
            "Slug Name");
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('showcase:publishgetProductWithId', (data) => {
                data = this.getUpdatedFields(data);
                this.showcase = data;
            });
            this.events.subscribe('showcase:addSuccess', (heading, desc) => {
                this.loader.dismiss();
                this.presentAlert(heading, desc, true);
                this.showcase.prodName = null;
                this.showcase.prodDesc = null;
                this.showcase.prodPrice = null;
                this.listOfBase64Image = [];
                this.selectedCategories = [];
                this.selectedBrands = [];
            });
            this.events.subscribe('showcase:addFailure', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('showcase:editSuccess', (heading, desc) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (this.loader) {
                    this.loader.dismiss();
                }
                yield this.presentAlert(heading, desc, true);
            }));
            this.events.subscribe('showcase:editFailure', (heading, desc) => {
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
            this.events.subscribe('showcase:deleteSuccess', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this._location.back();
            });
            this.events.subscribe('showcase:deleteFailure', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, msg);
            });
            this.events.subscribe('showcase:publishAllCategoriesForAdmin', (categories) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
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
            this.events.subscribe('showcase:noCategoryAvailable', () => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoCategories = true;
                this.showCategoriesLoader = false;
            });
            this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
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
                this.showcase = option;
                // if (!this.showcase.deal.specificUsers) {
                //   this.showcase.deal.specificUsers = this.showcase.deal.specificUsers;
                // }
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
            this.events.subscribe('filters:publishActiveStatus', (data) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                if (data) {
                    this.isFilterActive = data.active;
                }
            });
        });
    }
    editShowDisable() {
        if (this.userRole == 'vendor') {
            if (this.showcase.approved) {
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
        //console.log(base64StringLength);
        inBytes = (base64StringLength / 4) * 3 - padding;
        //console.log(inBytes);
        const kbytes = inBytes / 1000;
        return kbytes;
    }
    saveProduct() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.coverValue = true;
            if (this.showcase.coverPic && !this.showcase.coverPic.url) {
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
            if (this.showcase.discountedPrice === null) {
                this.showcase.discountedPrice = this.showcase.prodPrice;
            }
            this.showcase.discount = parseFloat((((this.showcase.prodPrice - this.showcase.discountedPrice) / this.showcase.prodPrice) * 100).toFixed(2));
            if (this.showcase.productCode != '') {
                let prodCode = yield this.showcaseService.checkProductSKU(this.showcase.productCode, this.editProductId);
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
                        this.presentAlert('', `Please enter a unique Showcase Code - Matching products are :- ${matchingProds}`);
                        return;
                    }
                }
            }
            if (this.showcase.prodName === null || this.showcase.prodName === '') {
                this.presentAlert('', 'Please enter showcase name');
            }
            else if (!this.showcase.prodPrice) {
                this.presentAlert('', 'Please enter showcase price');
            }
            else if (this.showcase.productCode === null || this.showcase.productCode === '') {
                this.presentAlert('', 'Please enter showcase Code');
            }
            else if (this.showcase.prodDesc === null || this.showcase.prodDesc === '') {
                this.presentAlert('', 'Please enter showcase description');
            }
            else if (!(this.showcase.categories && this.showcase.categories.length) && !(this.showcase.brands && this.showcase.brands.length)) {
                this.presentAlert('', 'Please select any category or brand');
            }
            else if (this.coverValue === false) {
                this.presentAlert('', 'Please make any one image as cover picture');
            }
            else {
                yield this.presentLoading();
                this.showcase.createdAt = new Date();
                this.showcase.updatedAt = new Date();
                this.showcase.sortedAt = new Date();
                this.showcase.nameToSearch = this.showcase.prodName.toLowerCase();
                if (!this.showcase.prodPrice) {
                    this.showcase.prodPrice = null;
                }
                if (this.userRole === 'vendor') {
                    this.showcase.vendorId = yield this.storage.get('uid');
                }
                if (this.isUniversal && this.editProductId) {
                    const slugName = this.sharedService.createSlugName(this.showcase.slug.name);
                    const sameSlugExists = yield this.sharedService.sameSlugExists('products', this.showcase, slugName);
                    if (sameSlugExists) {
                        this.presentAlert('', 'Same slug already exists, please try with another slug name');
                        return;
                    }
                    else {
                        this.showcase.slug = {
                            name: slugName,
                            updatedAt: new Date(),
                            updatedBy: 'admin'
                        };
                    }
                }
                if (this.editProductId) {
                    console.log('edit prod');
                    this.events.publish('showcase:editProduct', this.showcase, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
                }
                else {
                    console.log('new prod');
                    this.events.publish('showcase:addProduct', this.showcase, this.listOfBase64Image);
                }
            }
        });
    }
    updateNewProductStatus(status) {
        console.log('this.showcase.approved:', this.showcase.approved);
        if (this.userRole == 'vendor' && !this.showcase.approved) {
            this.presentAlert('Alert', 'You cannot make this showcase active as it is not approved by Admin.');
            return;
        }
        if (status === true) {
            console.log('status=false');
            this.showcase.status = false;
        }
        else {
            console.log('status=true');
            this.showcase.status = true;
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
        const editImgData = this.showcase.images[index];
        this.showcase.coverPic = editImgData;
        for (let i = 0; this.listOfBase64Image.length; i++) {
            this.listOfBase64Image[i].cover = false;
        }
    }
    editProductCoverPicInList(index) {
        this.showcase.coverPic = {
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
        let b = this.showcase.images[event.detail.from];
        this.showcase.images[event.detail.from] = this.showcase.images[event.detail.to];
        this.showcase.images[event.detail.to] = b;
        this.needToUpdateImages = true;
        event.detail.complete();
    }
    removeEditImageInData(index, url) {
        this.showcase.images.splice(index, 1);
        if (url === this.showcase.coverPic.url) {
            this.showcase.coverPic = {
                imageId: null,
                mob: null,
                thumb: null,
                url: null,
            };
        }
        this.needToUpdateImages = true;
    }
    cancel() {
        //console.log('in cancel');
        this.router.navigate(['showcase']);
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
        for (const img of this.showcase.images) {
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
            this.events.publish('showcase:deleteProduct', this.editProductId);
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
        if (this.showcase.categories) {
            if (this.showcase.categories.indexOf(cid) === -1) {
                this.showcase.categories.push(cid);
            }
            else {
                const cidIndex = this.showcase.categories.indexOf(cid);
                this.showcase.categories.splice(cidIndex, 1);
            }
        }
        else {
            this.showcase.categories = [];
            this.showcase.categories.push(cid);
        }
    }
    onClickBrandCheckBox(bid) {
        if (this.showcase.brands) {
            if (this.showcase.brands.indexOf(bid) === -1) {
                this.showcase.brands.push(bid);
            }
            else {
                const bidIndex = this.showcase.brands.indexOf(bid);
                this.showcase.brands.splice(bidIndex, 1);
            }
        }
        else {
            this.showcase.brands = [];
            this.showcase.brands.push(bid);
        }
    }
    editCheckBoxValue(id) {
        if (this.showcase.categories) {
            if (this.showcase.categories.indexOf(id) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    editBrandCheckBoxValue(id) {
        if (this.showcase.brands && this.showcase.brands.length && this.showcase.brands.indexOf(id) !== -1) {
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
    addSearchKeywords() {
        this.showcase.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    removeKeyword(i) {
        this.showcase.searchKeywords.splice(i, 1);
    }
    editProductAddSearchKeywords() {
        this.showcase.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    editProductRemoveKeyword(i) {
        this.showcase.searchKeywords.splice(i, 1);
    }
    getSubcategories(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.listOfSubcategories.hasOwnProperty(cid)) {
                let subcategories = [];
                subcategories = yield this.showcaseService.getSubcategoriesInNewProduct(cid);
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
        if (this.showcase.discountedPrice === this.showcase.prodPrice) {
            this.showcase.discountedPrice = null;
        }
    }
    onDrop(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
            //console.log(this.listOfBase64Image,this.showcase)
            let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed';
            if (this.listOfBase64Image && !this.showcase && (this.listOfBase64Image.length == this.imagesLimit)) {
                // console.log('here1', this.listOfBase64Image.length)
                this.presentAlert('Upload failed', message);
            }
            else if (this.showcase && this.showcase.images && (this.showcase.images.length == this.imagesLimit)) {
                // console.log('here2')
                this.presentAlert('Upload failed', message);
            }
            else if (this.listOfBase64Image.length && this.showcase && this.showcase.images && (this.listOfBase64Image.length + this.showcase.images.length == this.imagesLimit)) {
                // console.log('here3')
                this.presentAlert('Upload failed', message);
            }
            else {
                const modal = yield this.modalController.create({
                    component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_13__["ImageEditorComponent"],
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
                component: src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_10__["ProductSectionPage"],
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
                let sections = yield this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_12__["first"])()).toPromise();
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
        if (!data.hasOwnProperty('additionalInfo')) {
            data['additionalInfo'] = this.showcase.additionalInfo;
        }
        return data;
    }
    cloneProduct() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const cloneAlert = yield this.alertController.create({
                subHeader: 'Clone Product',
                message: 'Use this to make clone of this product.',
                inputs: [
                    {
                        name: 'clones',
                        type: 'number',
                        placeholder: 'Enter the number of clones you want to make'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Add',
                        handler: (alertData) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            const clones = parseInt(alertData.clones);
                            if (clones) {
                                console.log('editProductId', this.editProductId);
                                yield this.showcaseService.makeProductClones(clones, this.editProductId);
                                this.presentAlert('Clones successful', 'Product Clones will be created in couple of minutes.');
                            }
                            else {
                                this.presentAlert('Warning', 'Provide valid input.');
                            }
                        })
                    }
                ]
            });
            yield cloneAlert.present();
        });
    }
    // ? Toggle checkbox function for various input
    toggleCheckbox(type) {
        // Price Slab Toggle
        if (type == 'priceSlab') {
            this.showcase.priceSlabs.active = !this.showcase.priceSlabs.active;
        }
    }
    // ? Toggle checkbox function for various input
    // ? Price Slab Start
    // activePriceSlabEdit() {
    //   this.showcase.priceSlabs.active = !this.showcase.priceSlabs.active;
    // }
    enterPriceSlabData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let adminInput;
            adminInput = [
                {
                    name: 'qty',
                    type: 'number',
                    placeholder: "Add quantity for slab"
                },
                {
                    name: 'mrp',
                    type: 'number',
                    placeholder: "Add price"
                },
                {
                    name: 'price',
                    type: 'number',
                    placeholder: "Add discount price"
                }
            ];
            const alert = yield this.alertController.create({
                subHeader: "Enter Slab Details",
                inputs: adminInput,
                buttons: [
                    {
                        text: "cancel",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    }, {
                        text: "done",
                        handler: (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            if (!data.qty || !data.price || !data.mrp) {
                                this.presentAlert("Please enter all details!");
                            }
                            else {
                                if (this.showcase.priceSlabs.singleSlabs.length == 0) {
                                    this.showcase.priceSlabs.singleSlabs.push({
                                        qty: [1, 1 + parseInt(data.qty)],
                                        mrp: parseFloat(data.mrp),
                                        price: parseFloat(data.price)
                                    });
                                }
                                else {
                                    let lastIndex = this.showcase.priceSlabs.singleSlabs.length;
                                    this.showcase.priceSlabs.singleSlabs.push({
                                        qty: [this.showcase.priceSlabs.singleSlabs[lastIndex - 1].qty[1],
                                            this.showcase.priceSlabs.singleSlabs[lastIndex - 1].qty[1] + parseInt(data.qty)],
                                        mrp: parseFloat(data.mrp),
                                        price: parseFloat(data.price)
                                    });
                                }
                            }
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    removePriceSlabs() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: "Are you sure you want to remove all slabs ?",
                buttons: [
                    {
                        text: "No",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => { }
                    }, {
                        text: "Yes",
                        handler: (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            this.showcase.priceSlabs.singleSlabs = [];
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    editPriceSlabDataForSingleSlab(index, slab) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: "Edit Slab Details",
                inputs: this.getEditSlabInputs(slab),
                buttons: [
                    {
                        text: "cancel",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    }, {
                        text: "done",
                        handler: (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            if (!data.price || !data.mrp) {
                                this.presentAlert("Please enter all details!");
                            }
                            else {
                                this.showcase.priceSlabs.singleSlabs[index]['mrp'] = parseFloat(data.mrp);
                                this.showcase.priceSlabs.singleSlabs[index]['price'] = parseFloat(data.price);
                            }
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    // ? Price Slab End
    // ? Colors Start
    selectVariantColor() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _variants_colors_modal_colors_modal_page__WEBPACK_IMPORTED_MODULE_17__["ColorsModalPage"],
                componentProps: {
                    name: '',
                    image: '',
                    code: ''
                }
            });
            modal.onDidDismiss()
                .then((res) => {
                //console.log('data from modal', res);
                if (res.data) {
                    this.showcase.color = res.data;
                }
            });
            yield modal.present();
        });
    }
    updateEditVariantColor() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _variants_colors_modal_colors_modal_page__WEBPACK_IMPORTED_MODULE_17__["ColorsModalPage"],
                componentProps: {
                    name: this.showcase.color.name,
                    image: this.showcase.color.image,
                    code: this.showcase.color.code
                }
            });
            modal.onDidDismiss()
                .then((res) => {
                //console.log('data from modal', res);
                if (res.data) {
                    this.showcase.color = res.data;
                }
            });
            yield modal.present();
        });
    }
    removeEditVariantColor() {
        this.showcase.color = {};
    }
    // ? Colors End
    // ? Vendors Start
    addVendor(e) {
        this.showcase.vendorId = e.target.value;
    }
    // ? Vendors End
    // ? Filter Start
    addFilters() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _filter_settings_select_filter_select_filter_page__WEBPACK_IMPORTED_MODULE_18__["SelectFilterPage"],
                componentProps: { addedFilters: this.showcase.filters }
            });
            modal.onDidDismiss().then((res) => {
                //console.log('res', res);
                if (res.data) {
                    const addedFilters = res.data.addedFilters;
                    //console.log('addedFilters', addedFilters);
                    if (addedFilters.length) {
                        let filtersObj = {};
                        addedFilters.forEach(filter => {
                            if (filter.active) {
                                let values = [];
                                filter.values.forEach(v => {
                                    if (v.isChecked) {
                                        values.push(v.value);
                                    }
                                });
                                filtersObj[filter.name] = values;
                            }
                        });
                        //console.log('filtersObj', filtersObj);
                        this.showcase.filters = filtersObj;
                    }
                }
            });
            yield modal.present();
        });
    }
    getAddedFiltersLength(filters) {
        return Object.keys(filters).length;
    }
    // ? Filter End
    removeSubscriptions() {
        this.events.unsubscribe('showcase:addSuccess');
        this.events.unsubscribe('showcase:addFailure');
        this.events.unsubscribe('showcase:editSuccess');
        this.events.unsubscribe('showcase:editFailure');
        this.events.unsubscribe('product-options:editSuccess');
        this.events.unsubscribe('product-options:editFailure');
        this.events.unsubscribe('showcase:deleteSuccess');
        this.events.unsubscribe('showcase:deleteFailure');
        this.events.unsubscribe('showcase:publishAllCategoriesForAdmin');
        this.events.unsubscribe('showcase:publishgetProductWithId');
        this.events.unsubscribe('product-options:publishOptionData');
        this.events.unsubscribe('product-options:deleteProductOptionSuccess');
        this.events.unsubscribe('brands:publishAllBrandsForAdmin');
        this.events.unsubscribe('brands:noBrandAvailableForAdmin');
        this.events.unsubscribe('showcase:noCategoryAvailable');
        this.events.unsubscribe('vendor:getVendorNameSuccess');
        this.events.unsubscribe('filters:publishActiveStatus');
    }
};
CreateShowcasePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_6__["ShowcaseService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestore"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] },
    { type: src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__["MultiRegionService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_15__["SharedService"] },
    { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_16__["CategoriesService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], CreateShowcasePage.prototype, "content", void 0);
CreateShowcasePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-showcase',
        template: __webpack_require__(/*! raw-loader!./create-showcase.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/showcase/create-showcase/create-showcase.page.html"),
        styles: [__webpack_require__(/*! ./create-showcase.page.scss */ "./src/app/admin/showcase/create-showcase/create-showcase.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
        src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_6__["ShowcaseService"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestore"],
        _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"],
        src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__["MultiRegionService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_15__["SharedService"],
        src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_16__["CategoriesService"]])
], CreateShowcasePage);



/***/ })

}]);
//# sourceMappingURL=admin-showcase-create-showcase-create-showcase-module-es2015.js.map