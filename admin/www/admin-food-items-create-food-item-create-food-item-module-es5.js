(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-food-items-create-food-item-create-food-item-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/food-items/create-food-item/create-food-item.page.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/food-items/create-food-item/create-food-item.page.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{editProductId ? 'Edit' : 'New' }} Food item</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Description</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Categories and Brands</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Images</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <!-- FoodItem -->\r\n  <super-tabs-container>\r\n    <!-- Basic -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>\r\n                        Food Name (please don't use \"/\" in name)\r\n                      </ion-label>\r\n                    </div>\r\n                    <div class=\"flex-label\" *ngIf=\"userRole != 'vendor'\">\r\n                      <ion-label>Show</ion-label>&nbsp;&nbsp;\r\n                      <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"food.status\"\r\n                              [disabled]=\"editShowDisable()\" (click)=\"updateNewProductStatus(food.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </div>\r\n                  </div>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"food.prodName\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label>Allow Payment</ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"allowPaymentToggle()\" [checked]=\"food.allowPayment\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label><strong>Show out of stock for 0 quantity</strong>\r\n                </ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"stopOrderWhenNoQtyToggle()\"\r\n                      [checked]=\"food.stopWhenNoQty\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"headings\" style=\"display: flex;align-items: center;\" size='4'>\r\n                <div>Gst Exclusive</div>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\" (click)=\"toggleGstExclusive()\" [checked]=\"food.gstExclusive\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <br>\r\n              <ion-col size=\"4\">\r\n                <ion-label>\r\n                  Price ( {{ food.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                </ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.prodPrice\"></ion-input>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>\r\n                    Discounted Price ( {{ food.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                  </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.discountedPrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Purchase Price </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.purchasePrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <ion-label>Quantity</ion-label>\r\n                <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"food.productQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <ion-label> Min Quantity</ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.minQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Max Quantity </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.maxQty\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <br />\r\n            <ion-row>\r\n              <ion-col size=\"10\">\r\n                <div class=\"input-wrap\">\r\n                  <label>Food Type:</label>&nbsp;<br>\r\n                  <select class=\"selectInput\" (change)=\"changeFoodType($event.target.value)\"\r\n                    [(ngModel)]='food.foodType'>\r\n                    <option value=\"\" disabled selected hidden>Please choose</option>\r\n                    <option value=\"{{type}}\" *ngFor=\"let type of foodTypes\">\r\n                      {{type}}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"10\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Keywords (Search)</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"keyword\" autocapitalize></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"2\">\r\n                <ion-button class=\"btn-2 m-t-36\" fill=\"outline\" shape=\"round\" (click)=\"addSearchKeywords()\">\r\n                  Add </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"food.searchKeywords\">\r\n                <ion-chip outline color=\"dark\" *ngFor=\"let x of food.searchKeywords; let i = index;\">\r\n                  <ion-icon name=\"close-circle\" (click)=\"removeKeyword(i)\"></ion-icon>\r\n                  <ion-label>{{x}}</ion-label>\r\n                </ion-chip>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Food Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"food.productCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>HSN Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"food.hsnCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>GST (%)</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.gst\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Barcode Number</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"food.barcodeNo\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Description -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-row>\r\n            <ion-col size=\"12\">\r\n              <p style=\"font-weight: bold;\">Food Description</p>\r\n              <br>\r\n              <ckeditor [(ngModel)]=\"food.prodDesc\" [config]=\"ckeConfig\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col size=\"12\" style=\"margin-top:1rem;\">\r\n              <p style=\"font-weight: bold;\">Food Short Description</p>\r\n              <br>\r\n              <ckeditor [config]=\"ckeConfig\" [(ngModel)]=\"food.prodShortDesc\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <br>\r\n          <ng-container *ngIf=\"editProductId\">\r\n            <ion-button shape=\"round\" class=\"btn-1 i-start\" color=\"primary\" (click)=\"addNewSection()\"\r\n              style=\"margin-bottom: 15px; margin-top: 15px;\">\r\n              <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n              Add New Section\r\n            </ion-button>\r\n            <ion-reorder-group (ionItemReorder)=\"SectionReorder($event)\" disabled=\"false\">\r\n              <ion-item *ngFor=\"let item of productSections; let i = index\">\r\n                <div class=\"section\">\r\n                  <div style=\"display: inline-flex\">\r\n                    <ion-reorder slot=\"end\"> <i class=\"flaticon-menu\"></i>\r\n                    </ion-reorder>\r\n                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <p style=\"margin-top: -12px;font-size: large\">Section\r\n                      {{i+1}}</p>\r\n                  </div>\r\n                  <br><br>\r\n                  <div class=\"sectionBlock\">\r\n                    <div style=\"display: block\">\r\n                      <p *ngIf=\"item.sectionName\" class=\"crop\">Name: {{item.sectionName}}</p>\r\n                      <br *ngIf=\"item.sectionName\">\r\n                      <p *ngIf=\"item.widgetType\">Type: {{item.widgetType}}</p>\r\n                    </div>\r\n                    <div style=\"display: flex\">\r\n                      <div>\r\n                        <ion-button (click)=\"openWidgetEdit(item.widgetType,item.widgetID,i)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Edit\r\n                        </ion-button>\r\n                        &nbsp;&nbsp;\r\n                        <ion-button (click)=\"deleteSectionConfirm(item.widgetID,i, 'web')\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Delete\r\n                        </ion-button>\r\n                      </div>\r\n                      <ion-list lines=\"none\" style=\"display: flex;margin-top: -20px;margin-left: 10px\">\r\n                        <ion-item>\r\n                          <ion-label>App</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='app' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'app')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n\r\n                        <ion-item>\r\n                          <ion-label>Website</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='web' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'web')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n                      </ion-list>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!editProductId\">\r\n            <ion-text color=\"danger\" style=\"display: flex;justify-content: center;\">\r\n              <p style=\"font-weight: bold;font-size: large;\">\r\n                * Once product is created, you can create sections for food description\r\n              </p>\r\n            </ion-text>\r\n          </ng-container>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Categories and Brands -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\"\r\n          style=\"display: flex;flex-wrap: nowrap;flex-direction: row;align-content: center;justify-content: space-around;align-items: flex-start;\">\r\n          <div class=\"categories-container\">\r\n            <div class=\"no-data\" *ngIf=\"showNoCategories\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No categories</h6>\r\n            </div>\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoCategories\">\r\n              <ion-searchbar [(ngModel)]=\"searchCategory\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <div class=\"categories-wrapper\" *ngIf=\"!showNoCategories\">\r\n              <ion-list>\r\n                <ion-list-header>\r\n                  <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Categories\r\n                  </ion-label>\r\n                </ion-list-header>\r\n                <div *ngFor=\"let category of categories | filter: searchCategory\">\r\n                  <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                    <ion-item (click)=\"onClickCategoryCheckBox(category.id)\" style=\"width: 100%;\">\r\n                      <ion-label>{{category.name}}</ion-label>\r\n                      <ion-checkbox [checked]=\"editCheckBoxValue(category.id)\" color=\"primary\" slot=\"start\">\r\n                      </ion-checkbox>\r\n                    </ion-item>\r\n                    <div (click)=\"getSubcategories(category.id)\" slot=\"end\"\r\n                      style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"category.isSubcategories\">\r\n                      <i class=\"flaticon-null-13\"\r\n                        *ngIf=\"(listOfSubcategoriesInView.hasOwnProperty(category.id) && !listOfSubcategoriesInView[category.id].active) || !listOfSubcategoriesInView.hasOwnProperty(category.id)\"></i>\r\n                      <i class=\"flaticon-null-14\"\r\n                        *ngIf=\"listOfSubcategoriesInView.hasOwnProperty(category.id) && listOfSubcategoriesInView[category.id].active\"></i>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    *ngIf=\"(listOfSubcategories[category.id] && listOfSubcategories[category.id].length) && listOfSubcategoriesInView[category.id].active\"\r\n                    style=\"margin-left: 10%;\">\r\n                    <ng-container *ngFor=\"let subCat of listOfSubcategories[category.id]\">\r\n                      <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                        <ion-item (click)=\"onClickCategoryCheckBox(subCat.id)\" style=\"width: 100%;\">\r\n                          <ion-label>{{subCat.name}}</ion-label>\r\n                          <ion-checkbox [checked]=\"editCheckBoxValue(subCat.id)\" color=\"primary\" slot=\"start\">\r\n                          </ion-checkbox>\r\n                        </ion-item>\r\n                        <!-- Sub-SubCategory Start -->\r\n                        <div (click)=\"getSubOfSubCategories(category.id, subCat.id)\" slot=\"end\"\r\n                          style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"subCat.isSubcategories\">\r\n                          <i class=\"flaticon-null-13\" *ngIf=\"!subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                          <i class=\"flaticon-null-14\" *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                        </div>\r\n                      </div>\r\n                      <ng-container\r\n                        *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active && subOfSubCategories[subCat.id].length\">\r\n                        <div style=\"margin-left: 10%;\">\r\n                          <ng-container *ngFor=\"let subSubCat of subOfSubCategories[subCat.id]\">\r\n                            <ion-item (click)=\"onClickCategoryCheckBox(subSubCat.id)\">\r\n                              <ion-label>{{subSubCat.name}}</ion-label>\r\n                              <ion-checkbox [checked]=\"editCheckBoxValue(subSubCat.id)\" color=\"primary\" slot=\"start\">\r\n                              </ion-checkbox>\r\n                            </ion-item>\r\n                          </ng-container>\r\n                        </div>\r\n                      </ng-container>\r\n                      <!-- Sub-SubCategory End -->\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n\r\n              </ion-list>\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"brands-container\">\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoBrands\">\r\n              <ion-searchbar [(ngModel)]=\"searchBrand\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <ion-list *ngIf=\"!showNoBrands && brands.length\">\r\n              <ion-list-header>\r\n                <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Brands</ion-label>\r\n              </ion-list-header>\r\n              <div *ngFor=\"let brand of brands | filter: searchBrand\">\r\n                <ion-item (click)=\"onClickBrandCheckBox(brand.id)\" style=\"width: 100%;\">\r\n                  <ion-label>{{brand.name}}</ion-label>\r\n                  <ion-checkbox [checked]=\"editBrandCheckBoxValue(brand.id)\" color=\"primary\" slot=\"start\">\r\n                  </ion-checkbox>\r\n                </ion-item>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Images -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <button class=\"upload-btn btn-1 i-start\" (click)=\"onDrop($event.target.files)\">Upload Food\r\n            Image(s)</button>\r\n          <h3>Uploads</h3>\r\n          <div class=\"no-img\" *ngIf=\"listOfBase64Image.length == 0\">\r\n            No attached images\r\n          </div>\r\n\r\n          <div class=\"imgs-container\" *ngIf=\"listOfBase64Image.length !== 0\">\r\n            <div class=\"img-wrap\" *ngFor=\"let img of listOfBase64Image; let i = index\">\r\n              <img [src]=\"img.base64Img\" (click)=\"onClickEditImage(img.url)\" />\r\n              <div class=\"overlay\">\r\n                <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" (click)=\"removeImage(i)\">\r\n                  <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == true\" class=\"btn-2 cover\" shape=\"round\">\r\n                  Cover Pic\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == false\" (click)=\"newProductCoverPic(i)\" class=\"btn-2 cover\"\r\n                  shape=\"round\">\r\n                  Make Cover\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Image List -->\r\n          <div class=\"list-header\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"reorder\">\r\n                  <p>Reorder</p>\r\n                </ion-col>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <div class=\"list-container\">\r\n            <ion-reorder-group (ionItemReorder)=\"imagesReorder($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n              <ion-item *ngFor=\"let img of food.images; let i = index\" lines=\"none\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"ion-align-items-center\">\r\n                    <ion-col class=\"reorder\">\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                    <ion-col class=\"img\">\r\n                      <img [src]=\"img.url\" (click)=\"onClickEditImage(img.url)\" height=\"200px\" />\r\n                    </ion-col>\r\n                    <ion-col class=\"action\">\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" large\r\n                          (click)=\"removeEditImageInData(i, img.url)\">\r\n                          <ion-icon name=\"trash\" slot=\"icon-only\" style=\" font-size: 16px;\"></ion-icon>\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"food.coverPic.imageId == img.imageId\" class=\"btn-2 cover\" shape=\"round\"\r\n                          disabled>\r\n                          Cover\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"food.coverPic.imageId != img.imageId \" class=\"btn-2 cover\" shape=\"round\"\r\n                          (click)=\"editProductCoverPicInData(i)\">\r\n                          Make Cover\r\n                        </ion-button>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n                <br>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n          <!-- Image List -->\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Advanced (optional) -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2 id=\"scroll1\">\r\n                <div class=\"statusList\">\r\n                  <div [id]=\"i\" *ngFor=\"let item of sideMenu; index as i\" (click)='changeComponent(i)'>\r\n                    <ng-container *ngIf=\"userRole !== 'vendor'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"userRole == 'vendor' && item != 'Vendor' && item != 'Specific User Discount'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=10 id=\"scroll2\" style=\"border-left: 1px solid lightgray;\">\r\n                <ng-container [ngSwitch]=\"selectedId\">\r\n                  <ion-grid>\r\n                    <!-- Cash on delivery -->\r\n                    <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Cash On Delivery</h3>\r\n                      </ion-col>\r\n                      <ion-col style=\"display: flex;align-items: center;\">\r\n                        <div>Cash on delivery (COD) for food</div>\r\n                        &nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"toggleCod()\" [checked]=\"food.isCod\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <!-- Extra Charges -->\r\n                    <ion-row *ngSwitchCase=\"1\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Extra Charges</h3>\r\n                      </ion-col>\r\n                      <ion-col style=\"display: flex;align-items: center;\">\r\n                        <ion-label>Extra Charges</ion-label>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"toggleExtraCharges()\" [checked]=\"food.extraCharges.active\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                      <br>\r\n                      <ng-container *ngIf='food.extraCharges.active'>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-label>Charge Name / Label</ion-label>\r\n                            <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"food.extraCharges.label\">\r\n                            </ion-input>\r\n                          </ion-col>\r\n                          <br>\r\n                          <ion-col size=\"6\">\r\n                            <ion-label>Cost</ion-label>\r\n                            <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.extraCharges.charge\">\r\n                            </ion-input>\r\n                          </ion-col>\r\n                          <br>\r\n                          <ion-col style=\"display: flex;align-items: center;\">\r\n                            <ion-label>Apply this charge for each food\r\n                              seperately when multiple purchased together\r\n                            </ion-label>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" (click)=\"toggleChargeQty()\"\r\n                                  [checked]=\"food.extraCharges.chargeAllQty\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </ion-col>\r\n                          <br>\r\n                        </ion-row>\r\n                      </ng-container>\r\n                    </ion-row>\r\n                    <!-- Subscription -->\r\n                    <ion-row *ngSwitchCase=\"2\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Subscription</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!subscriptionFeature\">This option is only\r\n                          available when Subscription feature is on</p>\r\n                      </ion-text>\r\n                      <ion-col>\r\n                        <div *ngIf=\"subscriptionFeature\">\r\n                          <ion-row class=\"ion-justify-content-between ion-align-items-center\">\r\n                            <ion-col class=\"ion-no-padding\" style=\"display: flex;\">\r\n                              <ion-label>Allow Subscriptions</ion-label>\r\n                              &nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input color=\"primary\" type=\"checkbox\" (click)=\"subIsAllowedToggle()\"\r\n                                    [checked]=\"food.subscription.isAllowed\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                          <div *ngIf=\"food.subscription.isAllowed\">\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Daily Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"food.subscription.dailyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Weekly Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"food.subscription.weeklyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Monthly Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"food.subscription.monthlyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <!-- Limited Time Deal -->\r\n                    <ion-row *ngSwitchCase=\"3\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Limited Time Deal</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!limitedTimeDeal\">This option is only\r\n                          available when Limited Time Deal feature is on</p>\r\n                      </ion-text>\r\n                      <ion-col>\r\n                        <div *ngIf=\"limitedTimeDeal\">\r\n                          <ion-row>\r\n                            <ion-col class=\"ion-no-padding\" style=\"display: flex;\">\r\n                              <ion-label>Limited Time Offer</ion-label>\r\n                              &nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input color=\"primary\" type=\"checkbox\" (click)=\"dealIsAllowedToggle()\"\r\n                                    [checked]=\"food.deal.isAllowed\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                          <div class=\"headings\">\r\n                            Start date time\r\n                          </div>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!food.deal.isAllowed\"\r\n                                placeholder=\"Date\" displayFormat=\"DD MMM YYYY\" [(ngModel)]=\"food.deal.start.date\"\r\n                                [min]=\"minDate\"></ion-datetime>\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" style=\"text-align: center;\">\r\n                              -\r\n                            </ion-col>\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!food.deal.isAllowed\"\r\n                                placeholder=\"Time\" displayFormat=\"hh:mm A\" pickerFormat=\"hh:mm A\"\r\n                                [(ngModel)]=\"food.deal.start.time\">\r\n                              </ion-datetime>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <div class=\"headings\">\r\n                            End date time\r\n                          </div>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!food.deal.isAllowed\"\r\n                                placeholder=\"Date\" displayFormat=\"DD MMM YYYY\" [(ngModel)]=\"food.deal.end.date\"\r\n                                [min]=\"minDate\"></ion-datetime>\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" style=\"text-align: center;\">\r\n                              -\r\n                            </ion-col>\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!food.deal.isAllowed\"\r\n                                placeholder=\"Time\" displayFormat=\"hh:mm A\" pickerFormat=\"hh:mm A\"\r\n                                [(ngModel)]=\"food.deal.end.time\">\r\n                              </ion-datetime>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"6\">\r\n                              <div class=\"headings\">\r\n                                Deal discount\r\n                              </div>\r\n                              <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"food.deal.discount\">\r\n                              </ion-input>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <!-- Specific User Discount -->\r\n                    <ion-row *ngSwitchCase=\"4\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Specific User Discount</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!food.deal.isAllowed\">This option is only\r\n                          available when limited time deal is on</p>\r\n                      </ion-text>\r\n                      <ng-container *ngIf=\"food.deal.isAllowed\">\r\n                        <ion-col size=\"6\">\r\n                          <div class=\"input-wrap\">\r\n                            <div class=\"flex-label\">\r\n                              <ion-label>Give user specific discount on this\r\n                                product</ion-label>\r\n                              <ion-toggle [(ngModel)]=\"food.deal.specificUsers.active\">\r\n                              </ion-toggle>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"6\" *ngIf=\"food.deal.specificUsers.active\">\r\n                          <ion-button class=\"btn-2 i-start\" (click)=\"openUsersModal()\" shape=\"round\" fill=\"outline\">\r\n                            <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                            Add Users\r\n                          </ion-button>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-container\r\n                        *ngIf=\"food.deal.isAllowed && food.deal.specificUsers.active && food.deal.specificUsers.users.length>0\">\r\n                        <h5 style=\"margin: 0px;\">User List with Discount &nbsp;\r\n                          <i class=\"flaticon-null-27 cursor-p\" *ngIf=\"moreUsers\" (click)=\"moreUsers = !moreUsers\"></i>\r\n                          <i class=\"flaticon-null-28 cursor-p\" *ngIf=\"!moreUsers\" (click)=\"moreUsers = !moreUsers\"></i>\r\n                        </h5>\r\n                        <div class=\"ion-no-padding\" *ngIf=\"moreUsers\">\r\n                          <div class=\"list-header t-a-c\">\r\n                            <ion-grid class=\"ion-no-padding\">\r\n                              <ion-row class=\"headings\">\r\n                                <ion-col size=\"3\">\r\n                                  <p>Name</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"3\">\r\n                                  <p>Phone Number</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"2\">\r\n                                  <p>Discount(%)</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"2\">\r\n                                  <p>Delete</p>\r\n                                </ion-col>\r\n                              </ion-row>\r\n                            </ion-grid>\r\n                          </div>\r\n                          <div class=\"list-container\">\r\n                            <ion-item *ngFor=\"let item of food.deal.specificUsers.users; let i = index\">\r\n                              <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                                <ion-row class=\"ion-align-items-center\">\r\n                                  <ion-col size=\"3\">\r\n                                    <p class=\"ion-text-capitalize ion-text-center\">\r\n                                      {{item.name}}</p>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"3\">\r\n                                    <p class=\"ion-text-capitalize ion-text-center\">\r\n                                      {{item.phoneNo}}</p>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"2\">\r\n                                    <ion-input type=\"number\" class=\"form-input padding-start-16\"\r\n                                      [(ngModel)]=\"item.discount\"></ion-input>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"2\" class=\"ion-text-center\">\r\n                                    <div class=\"ion-text-center\">\r\n                                      <i class=\"flaticon-null-21 cursor-p\" (click)=\"removeUser(i)\"></i>\r\n                                    </div>\r\n                                  </ion-col>\r\n                                </ion-row>\r\n                              </ion-grid>\r\n                            </ion-item>\r\n                          </div>\r\n                        </div>\r\n                      </ng-container>\r\n                    </ion-row>\r\n                    <!-- Seo for Website -->\r\n                    <ion-row *ngSwitchCase=\"5\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Website SEO</h3>\r\n                      </ion-col>\r\n\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Title</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"food.metaData.pageTitle\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Description</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"food.metaData.metaDescription\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Keywords</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"food.metaData.metaKeywords\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <!-- Regions -->\r\n                    <ion-row *ngSwitchCase=\"6\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Regions</h3>\r\n                      </ion-col>\r\n                      <ion-text *ngIf=\"!multiRegion\" color=\"danger\">\r\n                        <p>This option is only available when Multi Region is on</p>\r\n                      </ion-text>\r\n                      <div *ngIf=\"multiRegion\">\r\n                        <!-- <ng-container *ngFor=\"let region of multiRegionData\"> -->\r\n                        <ng-container *ngFor=\"let region of this.food.regions,index as i\">\r\n                          <div class=\"flex\">\r\n                            <input type='checkbox' (click)=\"toggleRegion(i)\" [checked]='region.active' />&nbsp;&nbsp;\r\n                            <p><strong>{{region.name | uppercase}}</strong></p>\r\n                          </div>\r\n                          <ion-row>\r\n                            <ion-col size=\"4\" class=\"input-wrap\">\r\n                              <ion-label>Price</ion-label>\r\n                              <ion-input class=\"form-input\" [(ngModel)]=\"region.price\" type=\"number\"></ion-input>\r\n                            </ion-col>\r\n                            <ion-col size=\"4\" class=\"input-wrap\">\r\n                              <ion-label>Discounted Price</ion-label>\r\n                              <ion-input class=\"form-input\" [(ngModel)]=\"region.discountedPrice\" type=\"number\">\r\n                              </ion-input>\r\n                            </ion-col>\r\n                            <ion-col size=\"4\" class=\"input-wrap\">\r\n                              <ion-label>Quantity</ion-label>\r\n                              <ion-input class=\"form-input\" [(ngModel)]=\"region.qty\" type=\"number\"></ion-input>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </ng-container>\r\n                      </div>\r\n                    </ion-row>\r\n                    <!-- Add Ons -->\r\n                    <ion-row *ngSwitchCase=\"7\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Add Ons</h3>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <label>Select Addon Templates:</label>&nbsp;<br>\r\n                        <select class=\"selectInput\" (change)=\"changeTemplate($event.target.value)\"\r\n                          [(ngModel)]='food.templateId'>\r\n                          <option value=\"\" disabled selected hidden>Please choose</option>\r\n                          <option value=\"\">None</option>\r\n                          <option value=\"{{template.id}}\" *ngFor=\"let template of templatesArray\">\r\n                            {{template.name}}\r\n                          </option>\r\n                        </select>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Slug Name -->\r\n                    <ion-row *ngSwitchCase=\"8\">\r\n                      <ng-container *ngIf=\"isUniversal && editProductId else noUniversal\">\r\n                        <ion-col>\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Slug Name\r\n                              <ion-text color=\"danger\">\r\n                                (<b class=\"cursor-p\" (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug\r\n                                Instructions)\r\n                              </ion-text>\r\n                            </ion-label>\r\n                            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                              <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='food.slug.name'\r\n                                style=\"width: 80%;\"></ion-input>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-template #noUniversal>\r\n                        <p>Coming Soon!</p>\r\n                      </ng-template>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                  <!-- Clone Food -->\r\n                  <!-- <ion-grid *ngSwitchCase=\"7\">\r\n                    <ion-row>\r\n                      <ion-col>\r\n                        <ng-container *ngIf=\"!editProductId\">\r\n                          <ion-text color=\"danger\">\r\n                            <p>Note: This feature is available when you edit this food.</p>\r\n                          </ion-text>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"editProductId\">\r\n                          <ion-button color=\"primary\" fill=\"outline\" shape=\"round\" size=\"small\"\r\n                            (click)=\"cloneProduct()\">Clone Product</ion-button>\r\n                        </ng-container>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid> -->\r\n                </ng-container>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n  <!-- FoodItem -->\r\n\r\n</super-tabs>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"deleteAlertConfirm();\" *ngIf=\"editProductId\" shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"danger\">\r\n      <i class=\"flaticon-null-21\"></i>\r\n      Delete\r\n    </ion-button>\r\n    <ion-button (click)=\"saveFoodItem()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/food-items/create-food-item/create-food-item.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/food-items/create-food-item/create-food-item.module.ts ***!
  \******************************************************************************/
/*! exports provided: CreateFoodItemPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFoodItemPageModule", function() { return CreateFoodItemPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_food_item_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-food-item.page */ "./src/app/admin/food-items/create-food-item/create-food-item.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");












var routes = [
    {
        path: '',
        component: _create_food_item_page__WEBPACK_IMPORTED_MODULE_6__["CreateFoodItemPage"]
    }
];
var CreateFoodItemPageModule = /** @class */ (function () {
    function CreateFoodItemPageModule() {
    }
    CreateFoodItemPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
            declarations: [_create_food_item_page__WEBPACK_IMPORTED_MODULE_6__["CreateFoodItemPage"]]
        })
    ], CreateFoodItemPageModule);
    return CreateFoodItemPageModule;
}());



/***/ }),

/***/ "./src/app/admin/food-items/create-food-item/create-food-item.page.scss":
/*!******************************************************************************!*\
  !*** ./src/app/admin/food-items/create-food-item/create-food-item.page.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-btn-wrapper {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.upload-btn {\n  color: #fff;\n  background-color: var(--ion-color-primary);\n  padding: 8px 20px;\n  border-radius: 42px;\n  font-size: 16px;\n  font-weight: 400;\n  cursor: pointer;\n  height: 42px;\n  margin-left: 16px;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.product-color-name {\n  max-width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n}\n\n.color-selected {\n  display: -webkit-box;\n  display: flex;\n}\n\n.color-code {\n  width: 40px;\n  height: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n  min-width: 40px;\n}\n\n.input-border {\n  border: 1px solid lightgray;\n  text-align: center;\n}\n\nion-select {\n  border: 1px solid lightgray;\n}\n\n.form-input {\n  border: 1px solid gray;\n  background: var(--ion-color-light);\n  margin-top: 12px;\n  border-radius: 8px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.product-search-wrap {\n  text-align: center;\n}\n\n.product-search-wrap ion-searchbar {\n  width: 300px;\n  max-width: 100%;\n  margin: auto;\n}\n\n/* width */\n\n::-webkit-scrollbar {\n  width: 5px;\n}\n\n/* Track */\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n/* Handle */\n\n::-webkit-scrollbar-thumb {\n  background: #888;\n}\n\n/* Handle on hover */\n\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\n.filters-col {\n  border: 1px solid lightgray;\n  padding: 8px;\n}\n\n.list-header {\n  position: static;\n  margin: 36px auto;\n}\n\n.list-container {\n  margin: 0;\n}\n\nion-col.img {\n  width: calc(100% - 400px);\n  max-width: calc(100% - 400px);\n  text-align: center;\n}\n\nion-col.action {\n  width: 200px;\n  max-width: 200px;\n}\n\nion-col.reorder {\n  width: 200px;\n  max-width: 200px;\n  text-align: center;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.m-l-5-p {\n  text-align: center;\n}\n\n.widget-type {\n  color: #999;\n  margin-left: 12px;\n}\n\n.section {\n  display: block;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px;\n}\n\n.sectionBlock {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 1000px;\n}\n\n.crop {\n  overflow: hidden;\n  width: 200px;\n  text-overflow: ellipsis;\n}\n\n.padding-start-16 {\n  --padding-start: 16px !important;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 80vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 87vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.groupInput {\n  border: none;\n  border-bottom: 1px solid;\n  padding: 5px;\n  text-align: center;\n}\n\n.groupSelect {\n  width: 150px;\n}\n\n.variantImageSelect {\n  border: 1px solid;\n  text-align: center;\n  max-width: 100%;\n  margin-top: 12px;\n}\n\n.groupDisplay {\n  display: -webkit-box;\n  display: flex;\n  margin-left: 12px;\n}\n\n.variantGroups {\n  margin-top: 0px !important;\n  text-align: center;\n}\n\n.remove-icon {\n  cursor: pointer;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n\n.select-wrap {\n  padding: 5px;\n  margin-left: 5px;\n  background: var(--ion-color-light);\n  border-radius: 5px;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n\n.flexJustifySpace {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox {\n  border-bottom: 1px solid lightgray;\n  margin-bottom: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox .firstHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  gap: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .inputWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput {\n  width: 120px;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin: 0 8px 8px 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput:hover {\n  border: 1px solid #000;\n}\n\n.schedulesBox .secondHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.schedulesBox .slotBtn {\n  color: #000;\n}\n\n.schedulesBox .slotBtn i {\n  color: #4a4a4a;\n  font-size: 22px;\n}\n\n.schedulesBox .slotBtn i:hover {\n  color: #000;\n}\n\n.copyList {\n  border: 0;\n}\n\n.selectInput {\n  width: 30%;\n  padding: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZm9vZC1pdGVtcy9jcmVhdGUtZm9vZC1pdGVtL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcZm9vZC1pdGVtc1xcY3JlYXRlLWZvb2QtaXRlbVxcY3JlYXRlLWZvb2QtaXRlbS5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2Zvb2QtaXRlbXMvY3JlYXRlLWZvb2QtaXRlbS9jcmVhdGUtZm9vZC1pdGVtLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FERUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNDRjs7QURFQTtFQUNFLDJCQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLDJCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDRUY7O0FEQ0E7RUFDRSxrQkFBQTtBQ0VGOztBRERFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDR0o7O0FEQ0EsVUFBQTs7QUFDQTtFQUNFLFVBQUE7QUNFRjs7QURDQSxVQUFBOztBQUNBO0VBQ0UsbUJBQUE7QUNFRjs7QURDQSxXQUFBOztBQUNBO0VBQ0UsZ0JBQUE7QUNFRjs7QURDQSxvQkFBQTs7QUFDQTtFQUNFLGdCQUFBO0FDRUY7O0FEQ0E7RUFDRSwyQkFBQTtFQUNBLFlBQUE7QUNFRjs7QURDQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUNFRjs7QURDQTtFQUNFLFNBQUE7QUNFRjs7QURDQTtFQUNFLHlCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtBQ0VGOztBREFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDR0Y7O0FEREE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0lGOztBRERBO0VBQ0UsVUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ0lGOztBRERBO0VBQ0Usa0JBQUE7QUNJRjs7QUREQTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtBQ0lGOztBREZBO0VBQ0UsY0FBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxhQUFBO0FDS0Y7O0FESEE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsYUFBQTtBQ01GOztBREpBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7QUNPRjs7QURKQTtFQUNFLGdDQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNPRjs7QURKQTtFQUNFLGdCQUFBO0FDT0Y7O0FESkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNPRjs7QURKQTtFQUNFLGdCQUFBO0FDT0Y7O0FESkE7RUFDRTtJQUNFLFlBQUE7RUNPRjs7RURMQTtJQUNFLFlBQUE7RUNRRjtBQUNGOztBRExBO0VBQ0Usa0JBQUE7QUNPRjs7QURORTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNRSjs7QURKQTtFQUNFLFlBQUE7RUFDQSx3QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ09GOztBREpBO0VBQ0UsWUFBQTtBQ09GOztBREpBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ09GOztBREpBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsaUJBQUE7QUNPRjs7QURKQTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7QUNPRjs7QURKQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUNPRjs7QURKQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7QUNPRjs7QURKQTtFQUNFLGdCQUFBO0VBRUEsa0JBQUE7RUFDQSxnQkFBQTtBQ01GOztBREpFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FDTUo7O0FESkk7O0VBRUUseUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNNTjs7QURKSTtFQUNFLHlCQUFBO0FDTU47O0FESEU7RUFDRSxxQkFBQTtBQ0tKOztBREhFO0VBQ0UsZUFBQTtBQ0tKOztBREZBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNLRjs7QURGQTtFQUNFLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDS0Y7O0FESEU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLFFBQUE7QUNLSjs7QURGSTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxrQkFBQTtBQ0lOOztBREZNO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsdUJBQUE7VUFBQSwyQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNJUjs7QURGTTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FDSVI7O0FESFE7RUFDRSxzQkFBQTtBQ0tWOztBREFFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EscUJBQUE7VUFBQSx5QkFBQTtBQ0VKOztBREFFO0VBQ0UsV0FBQTtBQ0VKOztBRERJO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUNHTjs7QURGTTtFQUNFLFdBQUE7QUNJUjs7QURDQTtFQUNFLFNBQUE7QUNFRjs7QURBQTtFQUNFLFVBQUE7RUFDQSxZQUFBO0FDR0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9mb29kLWl0ZW1zL2NyZWF0ZS1mb29kLWl0ZW0vY3JlYXRlLWZvb2QtaXRlbS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXBsb2FkLWJ0bi13cmFwcGVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi51cGxvYWQtYnRuIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgcGFkZGluZzogOHB4IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNDJweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgaGVpZ2h0OiA0MnB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG59XHJcblxyXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9XCJmaWxlXCJdIHtcclxuICBmb250LXNpemU6IDEwMHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHotaW5kZXg6IDk5O1xyXG59XHJcblxyXG4ucHJvZHVjdC1jb2xvci1uYW1lIHtcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG5cclxuLmNvbG9yLXNlbGVjdGVkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4uY29sb3ItY29kZSB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxuICBtaW4td2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5pbnB1dC1ib3JkZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmlvbi1zZWxlY3Qge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuLmZvcm0taW5wdXQge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xyXG4gIC0tcGFkZGluZy1ib3R0b206IDEycHg7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xyXG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XHJcbn1cclxuLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBpb24tc2VhcmNoYmFyIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi8qIHdpZHRoICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA1cHg7XHJcbn1cclxuXHJcbi8qIFRyYWNrICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiAjODg4O1xyXG59XHJcblxyXG4vKiBIYW5kbGUgb24gaG92ZXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogIzU1NTtcclxufVxyXG5cclxuLmZpbHRlcnMtY29sIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4ubGlzdC1oZWFkZXIge1xyXG4gIHBvc2l0aW9uOiBzdGF0aWM7XHJcbiAgbWFyZ2luOiAzNnB4IGF1dG87XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5pb24tY29sLmltZyB7XHJcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcclxuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb24ge1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG59XHJcbmlvbi1jb2wucmVvcmRlciB7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIG1heC13aWR0aDogMjAwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaW5mby10eHQge1xyXG4gIGNvbG9yOiByZWQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4ubS1sLTUtcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ud2lkZ2V0LXR5cGUge1xyXG4gIGNvbG9yOiAjOTk5O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xyXG59XHJcbi5zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5zZWN0aW9uQmxvY2sge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiAxMDAwcHg7XHJcbn1cclxuLmNyb3Age1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4ucGFkZGluZy1zdGFydC0xNiB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODB2aDtcclxufVxyXG5cclxuI3Njcm9sbDE6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxufVxyXG5cclxuI3Njcm9sbDI6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbiAgI3Njcm9sbDIge1xyXG4gICAgaGVpZ2h0OiA4N3ZoO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1c0xpc3Qge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwIHtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG5cclxuLmdyb3VwSW5wdXQge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQ7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmdyb3VwU2VsZWN0IHtcclxuICB3aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbi52YXJpYW50SW1hZ2VTZWxlY3Qge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXRvcDogMTJweDtcclxufVxyXG5cclxuLmdyb3VwRGlzcGxheSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tbGVmdDogMTJweDtcclxufVxyXG5cclxuLnZhcmlhbnRHcm91cHMge1xyXG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnJlbW92ZS1pY29uIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuLnNlbGVjdC13cmFwIHtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnRhYmxlQXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAvLyBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICB0YWJsZSB7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgdGQsXHJcbiAgICB0aCB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgfVxyXG4gICAgdHI6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxuICAuaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICB9XHJcbiAgLmRlbGV0ZUljb24ge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gIH1cclxufVxyXG4uZmxleEp1c3RpZnlTcGFjZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLnNjaGVkdWxlc0JveCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gIC5maXJzdEhhbGYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgfVxyXG4gIC5zbG90V3JhcHBlciB7XHJcbiAgICAuc2NoZWR1bGVMaXN0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG5cclxuICAgICAgLmlucHV0V3JhcHBlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgfVxyXG4gICAgICAuc2xvdElucHV0IHtcclxuICAgICAgICB3aWR0aDogMTIwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XHJcbiAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAuc2Vjb25kSGFsZiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICB9XHJcbiAgLnNsb3RCdG4ge1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBpIHtcclxuICAgICAgY29sb3I6ICM0YTRhNGE7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuLmNvcHlMaXN0IHtcclxuICBib3JkZXI6IDA7XHJcbn1cclxuLnNlbGVjdElucHV0IHtcclxuICB3aWR0aDogMzAlO1xyXG4gIHBhZGRpbmc6IDhweDtcclxufVxyXG4iLCIudXBsb2FkLWJ0bi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi51cGxvYWQtYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDQycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDQycHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xuICBmb250LXNpemU6IDEwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogOTk7XG59XG5cbi5wcm9kdWN0LWNvbG9yLW5hbWUge1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5jb2xvci1zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jb2xvci1jb2RlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWluLXdpZHRoOiA0MHB4O1xufVxuXG4uaW5wdXQtYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1zZWxlY3Qge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ucHJvZHVjdC1zZWFyY2gtd3JhcCBpb24tc2VhcmNoYmFyIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLyogd2lkdGggKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogNXB4O1xufVxuXG4vKiBUcmFjayAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG59XG5cbi8qIEhhbmRsZSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICM4ODg7XG59XG5cbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG59XG5cbi5maWx0ZXJzLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogc3RhdGljO1xuICBtYXJnaW46IDM2cHggYXV0bztcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5pb24tY29sLmltZyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDAwcHgpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xufVxuXG5pb24tY29sLnJlb3JkZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmluZm8tdHh0IHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm0tbC01LXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53aWRnZXQtdHlwZSB7XG4gIGNvbG9yOiAjOTk5O1xuICBtYXJnaW4tbGVmdDogMTJweDtcbn1cblxuLnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5zZWN0aW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAwcHg7XG59XG5cbi5jcm9wIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDIwMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnBhZGRpbmctc3RhcnQtMTYge1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHggIWltcG9ydGFudDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgwdmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG5cbiAgI3Njcm9sbDIge1xuICAgIGhlaWdodDogODd2aDtcbiAgfVxufVxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmdyb3VwSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5ncm91cFNlbGVjdCB7XG4gIHdpZHRoOiAxNTBweDtcbn1cblxuLnZhcmlhbnRJbWFnZVNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmdyb3VwRGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xufVxuXG4udmFyaWFudEdyb3VwcyB7XG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5yZW1vdmUtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5zZWxlY3Qtd3JhcCB7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuLnRhYmxlQXJlYSAuZGVsZXRlSWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmZsZXhKdXN0aWZ5U3BhY2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5zY2hlZHVsZXNCb3gge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5zY2hlZHVsZXNCb3ggLmZpcnN0SGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogOHB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdFdyYXBwZXIgLnNjaGVkdWxlTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLmlucHV0V3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLnNsb3RJbnB1dCB7XG4gIHdpZHRoOiAxMjBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90V3JhcHBlciAuc2NoZWR1bGVMaXN0IC5zbG90SW5wdXQ6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xufVxuLnNjaGVkdWxlc0JveCAuc2Vjb25kSGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIHtcbiAgY29sb3I6ICMwMDA7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIGkge1xuICBjb2xvcjogIzRhNGE0YTtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdEJ0biBpOmhvdmVyIHtcbiAgY29sb3I6ICMwMDA7XG59XG5cbi5jb3B5TGlzdCB7XG4gIGJvcmRlcjogMDtcbn1cblxuLnNlbGVjdElucHV0IHtcbiAgd2lkdGg6IDMwJTtcbiAgcGFkZGluZzogOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/food-items/create-food-item/create-food-item.page.ts":
/*!****************************************************************************!*\
  !*** ./src/app/admin/food-items/create-food-item/create-food-item.page.ts ***!
  \****************************************************************************/
/*! exports provided: CreateFoodItemPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFoodItemPage", function() { return CreateFoodItemPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/admin/admin-shop/new-product/product-section/product-section.page */ "./src/app/admin/admin-shop/new-product/product-section/product-section.page.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../users-modal/users-modal.page */ "./src/app/admin/users-modal/users-modal.page.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/multi-region/multi-region.service */ "./src/app/services/multi-region/multi-region.service.ts");
/* harmony import */ var src_app_services_food_item_food_item_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/food-item/food-item.service */ "./src/app/services/food-item/food-item.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");


















var CreateFoodItemPage = /** @class */ (function () {
    function CreateFoodItemPage(route, events, alertController, router, loadingController, platform, modalController, storage, foodItemService, configService, angularFirestore, _location, vendorService, multiRegionService, sharedService, categoryService) {
        var _this = this;
        this.route = route;
        this.events = events;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalController = modalController;
        this.storage = storage;
        this.foodItemService = foodItemService;
        this.configService = configService;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.vendorService = vendorService;
        this.multiRegionService = multiRegionService;
        this.sharedService = sharedService;
        this.categoryService = categoryService;
        // Food Object Start
        this.food = {
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
            subscription: {
                isAllowed: false,
                dailyDiscount: null,
                weeklyDiscount: null,
                monthlyDiscount: null
            },
            deal: {
                isAllowed: false,
                discount: 0,
                start: {
                    date: null,
                    time: null
                },
                end: {
                    date: null,
                    time: null
                },
                specificUsers: {
                    active: false,
                    users: []
                }
            },
            metaData: {
                pageTitle: '',
                metaDescription: '',
                metaKeywords: ''
            },
            barcodeNo: null,
            extraCharges: {
                active: false,
                label: '',
                charge: 0,
                chargeAllQty: false
            },
            gstExclusive: false,
            isCod: true,
            allowPayment: false,
            regions: [],
            templateId: '',
            productType: 'food',
            foodType: '',
            slug: {
                name: null,
                updatedAt: new Date(),
                updatedBy: 'admin'
            }
        };
        // Food Object End
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
        this.limitedTimeDeal = false;
        this.minDate = new Date().toISOString();
        this.multiRegion = false;
        this.multiRegionData = [];
        this.subscriptionFeature = false;
        this.userRole = "";
        this.vendorData = [];
        this.vendorName = 'Select Vendor';
        this.productSections = [];
        this.moreUsers = true;
        this.sideMenu = [];
        this.selectedId = '0';
        this.fromAppointment = false;
        this.foodTypes = ['none', 'veg', 'non-veg', 'only-egg'];
        this.needToUpdateImages = false;
        this.isUniversal = false;
        this.subOfSubCategories = {};
        this.subOfSubCategoryToggle = {};
        this.route.queryParams.subscribe(function () {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.editProductId = _this.router.getCurrentNavigation().extras.state.productId;
                _this.routeFromCategories = _this.router.getCurrentNavigation().extras.state.routeFromCategories;
                _this.routeFromOptions = _this.router.getCurrentNavigation().extras.state.routeFromOptions;
                if (_this.router.getCurrentNavigation().extras.state.routeFromAppointment) {
                    _this.fromAppointment = _this.router.getCurrentNavigation().extras.state.routeFromAppointment;
                }
            }
        });
    }
    CreateFoodItemPage.prototype.ngOnInit = function () {
        this.sectionLimit = this.configService.environment.productSectionsLimit;
        this.ckeConfig = {
            allowedContent: true,
            height: 200
        };
        this.isUniversal = this.sharedService.isUniversal();
    };
    CreateFoodItemPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.initializeSubscriptions()];
                    case 1:
                        _e.sent();
                        _a = this;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 2:
                        _a.userRole = _e.sent();
                        if (!(this.userRole == 'vendor')) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 3:
                        _b.roleVendorId = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this.vendorService.getVendorData(this.roleVendorId, 'details')];
                    case 4:
                        _c.roleVendorData = _e.sent();
                        if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
                            this.food['approved'] = true;
                            this.food.status = true;
                        }
                        else {
                            this.food['approved'] = false;
                            this.food.status = false;
                        }
                        _e.label = 5;
                    case 5:
                        this.imagesLimit = this.configService.environment.productImageLimit;
                        this.events.publish('food-item:getAllCategories');
                        this.events.publish('brands:getAllBrandsForAdmin');
                        this.events.publish('variants:getVariantsTypeData');
                        this.devWidth = this.platform.width();
                        if (this.editProductId) {
                            this.events.publish('food-item:getProductWithId', this.editProductId);
                            this.events.publish('food-item:getAllSubCategories');
                            this.getSections();
                        }
                        this.taxType = this.configService.environment.taxType;
                        this.subscriptionFeature = this.configService.environment.subscriptionFeature;
                        this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
                        this.multiRegion = this.configService.environment.multiRegion;
                        if (!this.multiRegion) return [3 /*break*/, 7];
                        this.events.publish('multi-region:getActiveStatus');
                        this.events.publish('multi-region:getAllActiveRegions');
                        _d = this;
                        return [4 /*yield*/, this.multiRegionService.getAllActiveRegions('service')];
                    case 6:
                        _d.multiRegionData = _e.sent();
                        // console.log('multiRegionData:', this.multiRegionData);
                        // ? Creating and Updating Region Start
                        if (this.food.regions.length == 0) {
                            this.createDefaultRegion();
                        }
                        else {
                            this.updateRegion();
                        }
                        _e.label = 7;
                    case 7:
                        this.events.publish('filters:getActiveStatus');
                        this.sideMenu.push('Cash on Delivery', 'Extra Charges', 'Subscription', 'Limited Time Deal', 'Specific User Discount', 'Seo for Website', 'Regions', 'Add Ons', 'Slug Name'
                        // 'Clone Service',
                        );
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.createDefaultRegion = function () {
        console.log("loopStart");
        for (var _i = 0, _a = this.multiRegionData; _i < _a.length; _i++) {
            var region = _a[_i];
            this.food.regions.push({
                name: region.name,
                id: region.id,
                active: false,
                price: null,
                discountedPrice: null,
                qty: null,
            });
        }
    };
    CreateFoodItemPage.prototype.updateRegion = function () {
        var _this = this;
        var newRegions = this.multiRegionData.filter(function (newRegion) {
            return !_this.food.regions.find(function (region) { return newRegion.id == region.id; });
        });
        var removeRegions = this.food.regions.filter(function (oldRegion) {
            return !_this.multiRegionData.find(function (region2) { return oldRegion.id == region2.id; });
        });
        if (newRegions.length > 0) {
            console.log('new region:', newRegions);
            for (var _i = 0, newRegions_1 = newRegions; _i < newRegions_1.length; _i++) {
                var newRegion = newRegions_1[_i];
                this.food.regions.push({
                    name: newRegion.name,
                    id: newRegion.id,
                    active: false,
                    price: null,
                    discountedPrice: null,
                    qty: null,
                });
            }
        }
        if (removeRegions.length > 0) {
            console.log('update region:', removeRegions);
            var _loop_1 = function (region) {
                var index = this_1.food.regions.findIndex(function (oldRegion) { return oldRegion.id == region.id; });
                console.log('name:', index);
                this_1.food.regions.splice(index, 1);
            };
            var this_1 = this;
            for (var _a = 0, removeRegions_1 = removeRegions; _a < removeRegions_1.length; _a++) {
                var region = removeRegions_1[_a];
                _loop_1(region);
            }
        }
    };
    CreateFoodItemPage.prototype.toggleRegion = function (index) {
        this.food.regions[index].active = !this.food.regions[index].active;
    };
    CreateFoodItemPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    CreateFoodItemPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.events.subscribe('food-item:publishgetProductWithId', function (data) {
                            data = _this.getUpdatedFields(data);
                            _this.food = data;
                            if (!_this.food.deal.specificUsers) {
                                _this.food.deal.specificUsers = _this.food.deal.specificUsers;
                            }
                        });
                        this.events.subscribe('food-item:addSuccess', function (heading, desc) {
                            _this.loader.dismiss();
                            _this.presentAlert(heading, desc, true);
                            _this.food.prodName = null;
                            _this.food.prodDesc = null;
                            _this.food.prodPrice = null;
                            _this.listOfBase64Image = [];
                            _this.selectedCategories = [];
                            _this.selectedBrands = [];
                        });
                        this.events.subscribe('food-item:addFailure', function (heading, desc) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert(heading, desc);
                        });
                        this.events.subscribe('food-item:editSuccess', function (heading, desc) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this.loader) {
                                            this.loader.dismiss();
                                        }
                                        return [4 /*yield*/, this.presentAlert(heading, desc, true)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.events.subscribe('food-item:editFailure', function (heading, desc) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert(heading, desc);
                        });
                        this.events.subscribe('product-options:editSuccess', function (heading, desc) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert(heading, desc, true);
                        });
                        this.events.subscribe('product-options:editFailure', function (heading, desc) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert(heading, desc);
                        });
                        this.events.subscribe('food-item:deleteSuccess', function (heading, msg) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this._location.back();
                        });
                        this.events.subscribe('food-item:deleteFailure', function (heading, msg) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert(heading, msg);
                        });
                        this.events.subscribe('food-item:publishAllCategoriesForAdmin', function (categories) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var allCategories;
                            var _this = this;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                console.log('categories:', categories);
                                if (this.loader) {
                                    this.loader.dismiss();
                                }
                                if (this.userRole == 'vendor' && this.roleVendorId) {
                                    allCategories = categories;
                                    this.categories = allCategories.filter(function (category) { return _this.roleVendorData.categories.includes(category.id); });
                                }
                                else {
                                    this.categories = categories;
                                }
                                this.showCategoriesLoader = false;
                                this.showNoCategories = false;
                                return [2 /*return*/];
                            });
                        }); });
                        this.events.subscribe('food-item:noCategoryAvailable', function () {
                            console.log('no categories');
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.showNoCategories = true;
                            _this.showCategoriesLoader = false;
                        });
                        this.events.subscribe('brands:publishAllBrandsForAdmin', function (brands) {
                            console.log('brands:', brands);
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            if (_this.userRole == 'vendor' && _this.roleVendorId) {
                                var allBrands = brands;
                                console.log('brands', brands);
                                console.log('this.roleVendorData:', _this.roleVendorData);
                                _this.brands = allBrands.filter(function (brand) { return _this.roleVendorData.brands.includes(brand.id); });
                            }
                            else {
                                _this.brands = brands;
                            }
                            _this.showNoBrands = false;
                            //console.log('brands', brands);
                        });
                        this.events.subscribe('brands:noBrandAvailableForAdmin', function () {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.showNoBrands = true;
                        });
                        this.events.subscribe('product-options:publishOptionData', function (option, productOptions) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            option = _this.getUpdatedFields(option);
                            _this.food = option;
                            if (!_this.food.deal.specificUsers) {
                                _this.food.deal.specificUsers = _this.food.deal.specificUsers;
                            }
                        });
                        this.events.subscribe('product-options:deleteProductOptionSuccess', function () {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.presentAlert('', 'Option Deleted Successfully!', true);
                        });
                        this.events.subscribe('vendor:getVendorNameSuccess', function (data) {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            if (data) {
                                _this.vendorData = data;
                            }
                            _this.vendorName = _this.vendorData['name'];
                        });
                        return [4 /*yield*/, this.foodItemService.getTemplates()];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.templatesArray = res;
                            // console.log(this.templatesArray);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.changeTemplate = function (value) {
        console.log(value);
        this.food.templateId = value;
    };
    CreateFoodItemPage.prototype.changeFoodType = function (value) {
        console.log(value);
        this.food.foodType = value;
        console.log(this.food);
    };
    CreateFoodItemPage.prototype.editShowDisable = function () {
        if (this.userRole == 'vendor') {
            if (this.food.approved) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    CreateFoodItemPage.prototype.openUsersModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alreadyAdded, modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alreadyAdded = this.food.deal.specificUsers.users ? this.food.deal.specificUsers.users : [];
                        return [4 /*yield*/, this.modalController.create({
                                component: _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_12__["UsersModalPage"],
                                componentProps: {
                                    alreadyAddedUsers: alreadyAdded
                                },
                                cssClass: 'coupon-code-modal'
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                console.log('res.data', res.data);
                                if (_this.food) {
                                    _this.food.deal.specificUsers.users = res.data;
                                }
                                else {
                                    _this.food.deal.specificUsers.users = res.data;
                                }
                            }
                            console.log('this.food.deal.specificUsers:', _this.food.deal.specificUsers.users);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.removeUser = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.food.deal.specificUsers.users.splice(i, 1);
                return [2 /*return*/];
            });
        });
    };
    CreateFoodItemPage.prototype.removeImage = function (index) {
        this.listOfBase64Image.splice(index, 1);
    };
    CreateFoodItemPage.prototype.calculateImageSize = function (base64String) {
        var padding, inBytes, base64StringLength;
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
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    CreateFoodItemPage.prototype.saveFoodItem = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _i, _a, user, i, prodCode, matchingProds, i, slugName, sameSlugExists;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.food.deal.specificUsers.active) {
                            for (_i = 0, _a = this.food.deal.specificUsers.users; _i < _a.length; _i++) {
                                user = _a[_i];
                                if (user.discount == null) {
                                    this.presentAlert('', "Discount field cannot be empty for " + user.name + " under UserList in Advance Tab");
                                    return [2 /*return*/];
                                }
                                else if (user.discount < 0 || user.discount > 100) {
                                    this.presentAlert('', "Please provide a valid Discount field for " + user.name + " under UserList in Advance Tab");
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.coverValue = true;
                        if (this.food.coverPic && !this.food.coverPic.url) {
                            this.coverValue = false;
                        }
                        else {
                            this.coverValue = true;
                        }
                        if (!this.coverValue && this.listOfBase64Image.length) {
                            console.log('this.listOfBase64Image', this.listOfBase64Image);
                            for (i = 0; i < this.listOfBase64Image.length; i++) {
                                if (this.listOfBase64Image[i].cover === true) {
                                    this.coverValue = true;
                                    break;
                                }
                                else {
                                    this.coverValue = false;
                                }
                            }
                        }
                        if (this.food.discountedPrice === null) {
                            this.food.discountedPrice = this.food.prodPrice;
                        }
                        this.food.discount = parseFloat((((this.food.prodPrice - this.food.discountedPrice) / this.food.prodPrice) * 100).toFixed(2));
                        if (!(this.food.productCode != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.foodItemService.checkProductSKU(this.food.productCode, this.editProductId)];
                    case 1:
                        prodCode = _b.sent();
                        if (prodCode && prodCode.length) {
                            matchingProds = [];
                            for (i = 0; i < prodCode.length; i++) {
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
                                this.presentAlert('', "Please enter a unique food Code - Matching food are :- " + matchingProds);
                                return [2 /*return*/];
                            }
                        }
                        _b.label = 2;
                    case 2:
                        if (!(this.food.prodName === null || this.food.prodName === '')) return [3 /*break*/, 3];
                        this.presentAlert('', 'Please enter food name');
                        return [3 /*break*/, 13];
                    case 3:
                        if (!!this.food.prodPrice) return [3 /*break*/, 4];
                        this.presentAlert('', 'Please enter food price');
                        return [3 /*break*/, 13];
                    case 4:
                        if (!(this.food.productCode === null || this.food.productCode === '')) return [3 /*break*/, 5];
                        this.presentAlert('', 'Please enter food Code');
                        return [3 /*break*/, 13];
                    case 5:
                        if (!(this.food.prodDesc === null || this.food.prodDesc === '')) return [3 /*break*/, 6];
                        this.presentAlert('', 'Please enter food description');
                        return [3 /*break*/, 13];
                    case 6:
                        if (!(!(this.food.categories && this.food.categories.length) && !(this.food.brands && this.food.brands.length))) return [3 /*break*/, 7];
                        this.presentAlert('', 'Please select any category or brand');
                        return [3 /*break*/, 13];
                    case 7:
                        if (!(this.coverValue === false)) return [3 /*break*/, 8];
                        this.presentAlert('', 'Please make any one image as cover picture');
                        return [3 /*break*/, 13];
                    case 8:
                        if (!(this.food.gst && this.food.gst > 100)) return [3 /*break*/, 9];
                        this.presentAlert('', this.taxType + " value must be less than 100");
                        return [3 /*break*/, 13];
                    case 9: return [4 /*yield*/, this.presentLoading()];
                    case 10:
                        _b.sent();
                        this.food.createdAt = new Date();
                        this.food.updatedAt = new Date();
                        this.food.sortedAt = new Date();
                        this.food.nameToSearch = this.food.prodName.toLowerCase();
                        if (!this.food.prodPrice) {
                            this.food.prodPrice = null;
                        }
                        if (!(this.isUniversal && this.editProductId)) return [3 /*break*/, 12];
                        slugName = this.sharedService.createSlugName(this.food.slug.name);
                        return [4 /*yield*/, this.sharedService.sameSlugExists('products', this.food, slugName)];
                    case 11:
                        sameSlugExists = _b.sent();
                        if (sameSlugExists) {
                            this.presentAlert('', 'Same slug already exists, please try with another slug name');
                            return [2 /*return*/];
                        }
                        else {
                            this.food.slug = {
                                name: slugName,
                                updatedAt: new Date(),
                                updatedBy: 'admin'
                            };
                        }
                        _b.label = 12;
                    case 12:
                        if (this.editProductId) {
                            console.log('edit prod');
                            this.events.publish('food-item:editProduct', this.food, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
                        }
                        else {
                            console.log('new prod');
                            this.events.publish('food-item:addProduct', this.food, this.listOfBase64Image);
                        }
                        _b.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.updateNewProductStatus = function (status) {
        // console.log('this.food.approved:', this.food.approved);
        if (this.userRole == 'vendor' && !this.food.approved) {
            this.presentAlert('Alert', 'You cannot make this food active as it is not approved by Admin.');
            return;
        }
        if (status === true) {
            console.log('status=false');
            this.food.status = false;
        }
        else {
            console.log('status=true');
            this.food.status = true;
        }
    };
    CreateFoodItemPage.prototype.newProductCoverPic = function (index) {
        //console.log('index of cover pic', index);
        for (var i = 0; i < this.listOfBase64Image.length; i++) {
            if (i === index) {
                this.listOfBase64Image[index].cover = true;
            }
            else {
                this.listOfBase64Image[i].cover = false;
            }
        }
    };
    CreateFoodItemPage.prototype.editProductCoverPicInData = function (index) {
        var editImgData = this.food.images[index];
        this.food.coverPic = editImgData;
        for (var i = 0; this.listOfBase64Image.length; i++) {
            this.listOfBase64Image[i].cover = false;
        }
    };
    CreateFoodItemPage.prototype.editProductCoverPicInList = function (index) {
        this.food.coverPic = {
            imageId: null,
            mob: null,
            thumb: null,
            url: null
        };
        for (var i = 0; i < this.listOfBase64Image.length; i++) {
            if (i === index) {
                this.listOfBase64Image[index].cover = true;
            }
            else {
                this.listOfBase64Image[i].cover = false;
            }
        }
    };
    CreateFoodItemPage.prototype.imagesReorder = function (event) {
        var b = this.food.images[event.detail.from];
        this.food.images[event.detail.from] = this.food.images[event.detail.to];
        this.food.images[event.detail.to] = b;
        this.needToUpdateImages = true;
        event.detail.complete();
    };
    CreateFoodItemPage.prototype.removeEditImageInData = function (index, url) {
        this.food.images.splice(index, 1);
        if (url === this.food.coverPic.url) {
            this.food.coverPic = {
                imageId: null,
                mob: null,
                thumb: null,
                url: null,
            };
        }
        this.needToUpdateImages = true;
    };
    CreateFoodItemPage.prototype.cancel = function () {
        this.router.navigate(['food-items']);
    };
    CreateFoodItemPage.prototype.onClickImage = function (img) {
        var imgZoomUrls = [];
        for (var _i = 0, _a = this.listOfBase64Image; _i < _a.length; _i++) {
            var img_1 = _a[_i];
            imgZoomUrls.push({ url: img_1.base64Img });
        }
        var imgIndex = this.listOfBase64Image.indexOf(img);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgZoomUrls,
                index: imgIndex
            }
        }).then(function (modal) { return modal.present(); });
    };
    CreateFoodItemPage.prototype.onClickEditImage = function (img) {
        var imgZoomUrls = [];
        var imgurl = { url: img };
        for (var _i = 0, _a = this.listOfBase64Image; _i < _a.length; _i++) {
            var img_2 = _a[_i];
            imgZoomUrls.push({ url: img_2.base64Img });
        }
        for (var _b = 0, _c = this.food.images; _b < _c.length; _b++) {
            var img_3 = _c[_b];
            imgZoomUrls.push({ url: img_3.url });
        }
        var imgIndex = imgZoomUrls.indexOf(imgurl);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgZoomUrls,
                index: imgIndex
            }
        }).then(function (modal) { return modal.present(); });
    };
    CreateFoodItemPage.prototype.deleteAlertConfirm = function () {
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
                                        //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.deleteProduct();
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
    CreateFoodItemPage.prototype.deleteProduct = function () {
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
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        this.events.publish('food-item:deleteProduct', this.editProductId);
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.presentAlert = function (heading, desc, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: heading,
                            message: desc,
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        //console.log('Confirm Okay', this.routeFromCategories, action);
                                        if (action === true && !_this.routeFromCategories && !_this.routeFromOptions && !_this.fromAppointment) {
                                            _this._location.back();
                                        }
                                        else if (action === true && _this.routeFromCategories) {
                                            _this._location.back();
                                        }
                                        else if (action === true && _this.routeFromOptions) {
                                            _this._location.back();
                                        }
                                        else if (action === true && _this.fromAppointment) {
                                            _this.router.navigate(['admin-products']);
                                        }
                                    }
                                }]
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
    CreateFoodItemPage.prototype.presentLoading = function () {
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
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.onClickCategoryCheckBox = function (cid) {
        if (this.food.categories) {
            if (this.food.categories.indexOf(cid) === -1) {
                this.food.categories.push(cid);
            }
            else {
                var cidIndex = this.food.categories.indexOf(cid);
                this.food.categories.splice(cidIndex, 1);
            }
        }
        else {
            this.food.categories = [];
            this.food.categories.push(cid);
        }
    };
    CreateFoodItemPage.prototype.onClickBrandCheckBox = function (bid) {
        if (this.food.brands) {
            if (this.food.brands.indexOf(bid) === -1) {
                this.food.brands.push(bid);
            }
            else {
                var bidIndex = this.food.brands.indexOf(bid);
                this.food.brands.splice(bidIndex, 1);
            }
        }
        else {
            this.food.brands = [];
            this.food.brands.push(bid);
        }
    };
    CreateFoodItemPage.prototype.editCheckBoxValue = function (id) {
        if (this.food.categories) {
            if (this.food.categories.indexOf(id) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    CreateFoodItemPage.prototype.editBrandCheckBoxValue = function (id) {
        if (this.food.brands && this.food.brands.length && this.food.brands.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    CreateFoodItemPage.prototype.clearSearchCategory = function () {
        this.searchCategory = null;
    };
    CreateFoodItemPage.prototype.clearSearchBrand = function () {
        this.searchBrand = null;
    };
    CreateFoodItemPage.prototype.allowPaymentToggle = function () {
        this.food.allowPayment = !this.food.allowPayment;
    };
    CreateFoodItemPage.prototype.addSearchKeywords = function () {
        this.food.searchKeywords.push(this.keyword);
        this.keyword = '';
    };
    CreateFoodItemPage.prototype.removeKeyword = function (i) {
        this.food.searchKeywords.splice(i, 1);
    };
    CreateFoodItemPage.prototype.editProductAddSearchKeywords = function () {
        this.food.searchKeywords.push(this.keyword);
        this.keyword = '';
    };
    CreateFoodItemPage.prototype.editProductRemoveKeyword = function (i) {
        this.food.searchKeywords.splice(i, 1);
    };
    CreateFoodItemPage.prototype.stopOrderWhenNoQtyToggle = function () {
        this.food.stopWhenNoQty = !this.food.stopWhenNoQty;
    };
    CreateFoodItemPage.prototype.editProductStopOrderWhenNoQtyToggle = function (status) {
        if (status) {
            this.food.stopWhenNoQty = false;
        }
        else {
            this.food.stopWhenNoQty = true;
        }
    };
    CreateFoodItemPage.prototype.getSubcategories = function (cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subcategories;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.listOfSubcategories.hasOwnProperty(cid)) return [3 /*break*/, 2];
                        subcategories = [];
                        return [4 /*yield*/, this.foodItemService.getSubcategoriesInNewProduct(cid)];
                    case 1:
                        subcategories = _a.sent();
                        // console.log('subCate:::', subcategories);
                        if (this.userRole == 'vendor' && this.roleVendorId) {
                            this.listOfSubcategories[cid] = subcategories.filter(function (subCat) { return _this.roleVendorData.categories.includes(subCat.id); });
                        }
                        else {
                            this.listOfSubcategories[cid] = subcategories;
                        }
                        //console.log('listOfSubcategories', this.listOfSubcategories);
                        this.listOfSubcategoriesInView[cid] = { active: true };
                        return [3 /*break*/, 3];
                    case 2:
                        if (!this.listOfSubcategoriesInView[cid].active) {
                            this.listOfSubcategoriesInView[cid].active = true;
                        }
                        else {
                            this.listOfSubcategoriesInView[cid].active = false;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.getSubOfSubCategories = function (catId, subCatId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subOfSubCategoriesData;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.subOfSubCategories.hasOwnProperty(subCatId)) return [3 /*break*/, 2];
                        subOfSubCategoriesData = [];
                        return [4 /*yield*/, this.categoryService.getSubOfSubCategories(catId, subCatId)];
                    case 1:
                        subOfSubCategoriesData = _a.sent();
                        if (this.userRole == 'vendor' && this.roleVendorId) {
                            this.subOfSubCategories[subCatId] = subOfSubCategoriesData.filter(function (subCat) {
                                return _this.roleVendorData.categories.includes(subCat.id);
                            });
                        }
                        else {
                            this.subOfSubCategories[subCatId] = subOfSubCategoriesData;
                        }
                        this.subOfSubCategoryToggle[subCatId] = { active: true };
                        return [3 /*break*/, 3];
                    case 2:
                        this.subOfSubCategoryToggle[subCatId].active = !this.subOfSubCategoryToggle[subCatId].active;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.changeInPrice = function () {
        if (this.food.discountedPrice === this.food.prodPrice) {
            this.food.discountedPrice = null;
        }
    };
    CreateFoodItemPage.prototype.onDrop = function (files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var message, modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed';
                        if (!(this.listOfBase64Image && !this.food && (this.listOfBase64Image.length == this.imagesLimit))) return [3 /*break*/, 1];
                        // console.log('here1', this.listOfBase64Image.length)
                        this.presentAlert('Upload failed', message);
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(this.food && this.food.images && (this.food.images.length == this.imagesLimit))) return [3 /*break*/, 2];
                        // console.log('here2')
                        this.presentAlert('Upload failed', message);
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.listOfBase64Image.length && this.food && this.food.images && (this.listOfBase64Image.length + this.food.images.length == this.imagesLimit))) return [3 /*break*/, 3];
                        // console.log('here3')
                        this.presentAlert('Upload failed', message);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.modalController.create({
                            component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_13__["ImageEditorComponent"],
                            componentProps: {
                                aspectRatioWidthVal: 1,
                                aspectRatioHeightVal: 1,
                                type: 'product',
                            },
                            cssClass: 'custom-img-editor'
                        })];
                    case 4:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 5:
                        _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res.data) {
                                for (var i = 0; i < res.data.length; i++) {
                                    var size = _this.calculateImageSize(res.data[i] || '');
                                    _this.listOfBase64Image.push({ base64Img: res.data[i] || '', cover: false, size: size });
                                }
                            }
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.subIsAllowedToggle = function () {
        this.food.subscription.isAllowed = !this.food.subscription.isAllowed;
    };
    CreateFoodItemPage.prototype.dealIsAllowedToggle = function () {
        this.food.deal.isAllowed = !this.food.deal.isAllowed;
    };
    CreateFoodItemPage.prototype.addNewSection = function () {
        if (this.productSections.length < this.sectionLimit) {
            this.openProductSectionModal();
        }
        else {
            this.presentAlert('Sections limit reached, Max ' + this.sectionLimit + ' allowed');
        }
    };
    CreateFoodItemPage.prototype.openProductSectionModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_9__["ProductSectionPage"],
                            backdropDismiss: false,
                            cssClass: 'custom-modal',
                            componentProps: { productId: this.editProductId }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function () {
                            _this.getSections();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.openWidgetEdit = function (type, id, index) {
        if (type == "image-banner") {
            var navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-banner'], navigationExtras);
        }
        if (type == "image-block") {
            var navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-image-block'], navigationExtras);
        }
        else if (type == "video-block") {
            var navigationExtras = {
                queryParams: {
                    ID: id,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-video-block'], navigationExtras);
        }
        else if (type == "text-block") {
            var navigationExtras = {
                queryParams: {
                    ID: id,
                    index: index,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-text-block'], navigationExtras);
        }
        else if (type == "product-carousel" || type == "product-list") {
            var navigationExtras = {
                queryParams: {
                    ID: id,
                    index: index,
                    productId: this.editProductId
                }
            };
            this.router.navigate(['edit-product-carousel'], navigationExtras);
        }
    };
    CreateFoodItemPage.prototype.getSections = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var sections, error_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["first"])()).toPromise()];
                    case 1:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.productSections = sections.sections;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.SectionReorder = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var draggedItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        draggedItem = this.productSections.splice(event.detail.from, 1)[0];
                        this.productSections.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections })];
                    case 1:
                        _a.sent();
                        this.presentAlert('Sections saved successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.deleteSectionConfirm = function (widgetID, index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this section?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        _this.events.publish('widgets:deleteWidget', widgetID);
                                        _this.deleteSection(index, type);
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
    CreateFoodItemPage.prototype.deleteSection = function (index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var error_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.presentLoading();
                        this.productSections.splice(index, 1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').update({ 'sections': this.productSections })];
                    case 2:
                        _a.sent();
                        if (this.loader) {
                            this.loader.dismiss();
                        }
                        this.presentAlert('Sections saved successfully!');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        this.presentAlert('Some error occured, please try again');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.changeLocationStatus = function (index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var error_3;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
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
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections })];
                    case 3:
                        _a.sent();
                        if (this.loader) {
                            this.loader.dismiss();
                        }
                        this.presentAlert('Sections saved successfully!');
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        this.presentAlert('Some error occured, please try again');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateFoodItemPage.prototype.toggleCod = function () {
        this.food.isCod = !this.food.isCod;
    };
    CreateFoodItemPage.prototype.toggleGstExclusive = function () {
        this.food.gstExclusive = !this.food.gstExclusive;
    };
    CreateFoodItemPage.prototype.toggleExtraCharges = function () {
        this.food.extraCharges.active = !this.food.extraCharges.active;
    };
    CreateFoodItemPage.prototype.toggleChargeQty = function () {
        this.food.extraCharges.chargeAllQty = !this.food.extraCharges.chargeAllQty;
    };
    CreateFoodItemPage.prototype.toggleGstExclusiveEdit = function () {
        this.food.gstExclusive = !this.food.gstExclusive;
    };
    CreateFoodItemPage.prototype.toggleChargeQtyEdit = function () {
        this.food.extraCharges.chargeAllQty = !this.food.extraCharges.chargeAllQty;
    };
    CreateFoodItemPage.prototype.getEditSlabInputs = function (slab) {
        var adminInput;
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
    };
    CreateFoodItemPage.prototype.changeComponent = function (index) {
        var prevMsgDiv = document.getElementById(this.selectedId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById(index.toString());
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.selectedId = index.toString();
    };
    CreateFoodItemPage.prototype.getUpdatedFields = function (data) {
        if (!data.hasOwnProperty('deal')) {
            data['deal'] = this.food.deal;
        }
        if (!data.hasOwnProperty('extraCharges')) {
            data['extraCharges'] = this.food.extraCharges;
        }
        if (!data.hasOwnProperty('gstExclusive')) {
            data['gstExclusive'] = this.food.gstExclusive;
        }
        if (!data.hasOwnProperty('isCod')) {
            data['isCod'] = this.food.isCod;
        }
        return data;
    };
    // async cloneProduct() {
    //   const cloneAlert = await this.alertController.create({
    //     subHeader: 'Clone Product',
    //     message: 'Use this to make clone of this product.',
    //     inputs: [
    //       {
    //         name: 'clones',
    //         type: 'number',
    //         placeholder: 'Enter the number of clones you want to make'
    //       }],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: () => {
    //         }
    //       }, {
    //         text: 'Add',
    //         handler: async (alertData) => {
    //           const clones = parseInt(alertData.clones);
    //           if (clones) {
    //             console.log('editproductId', this.editProductId);
    //             await this.foodItemService.makeProductClones(clones, this.editProductId);
    //             this.presentAlert('Clones successful', 'Product Clones will be created in couple of minutes');
    //           } else {
    //             this.presentAlert('Warning', 'Provide valid input');
    //           }
    //         }
    //       }
    //     ]
    //   });
    //   await cloneAlert.present();
    // }
    CreateFoodItemPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('food-item:addSuccess');
        this.events.unsubscribe('food-item:addFailure');
        this.events.unsubscribe('food-item:editSuccess');
        this.events.unsubscribe('food-item:editFailure');
        this.events.unsubscribe('product-options:editSuccess');
        this.events.unsubscribe('product-options:editFailure');
        this.events.unsubscribe('food-item:deleteSuccess');
        this.events.unsubscribe('food-item:deleteFailure');
        this.events.unsubscribe('food-item:publishAllCategoriesForAdmin');
        this.events.unsubscribe('food-item:publishgetProductWithId');
        this.events.unsubscribe('product-options:publishOptionData');
        this.events.unsubscribe('product-options:deleteProductOptionSuccess');
        this.events.unsubscribe('brands:publishAllBrandsForAdmin');
        this.events.unsubscribe('brands:noBrandAvailableForAdmin');
        this.events.unsubscribe('food-item:noCategoryAvailable');
        this.events.unsubscribe('vendor:getVendorNameSuccess');
    };
    CreateFoodItemPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: src_app_services_food_item_food_item_service__WEBPACK_IMPORTED_MODULE_15__["FoodItemService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__["AngularFirestore"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] },
        { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"] },
        { type: src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__["MultiRegionService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"] },
        { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__["CategoriesService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], CreateFoodItemPage.prototype, "content", void 0);
    CreateFoodItemPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-food-item',
            template: __webpack_require__(/*! raw-loader!./create-food-item.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/food-items/create-food-item/create-food-item.page.html"),
            styles: [__webpack_require__(/*! ./create-food-item.page.scss */ "./src/app/admin/food-items/create-food-item/create-food-item.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            src_app_services_food_item_food_item_service__WEBPACK_IMPORTED_MODULE_15__["FoodItemService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__["AngularFirestore"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"],
            src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"],
            src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_14__["MultiRegionService"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"],
            src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__["CategoriesService"]])
    ], CreateFoodItemPage);
    return CreateFoodItemPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-food-items-create-food-item-create-food-item-module-es5.js.map