(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-booking-create-booking-create-booking-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/booking/create-booking/create-booking.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/booking/create-booking/create-booking.page.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{editProductId ? 'Edit' : 'New' }} Service</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Description</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Schedule</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Categories and Brands</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Images</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <!-- Booking -->\r\n  <super-tabs-container>\r\n    <!-- Basic -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>\r\n                        Service Name (please don't use \"/\" in name)\r\n                      </ion-label>\r\n                    </div>\r\n                    <!--  *ngIf=\"userRole != 'vendor'\" -->\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Show</ion-label>&nbsp;&nbsp;\r\n                      <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"booking.status\"\r\n                              [disabled]=\"editShowDisable()\" (click)=\"updateNewProductStatus(booking.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </div>\r\n                  </div>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"booking.prodName\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label>Allow Payment</ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"allowPaymentToggle()\"\r\n                      [checked]=\"booking.allowPayment\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <!-- <ion-col class=\"flex\" size='4'>\r\n                <ion-label><strong>Show out of stock for 0 quantity</strong>\r\n                </ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"stopOrderWhenNoQtyToggle()\"\r\n                      [checked]=\"booking.stopWhenNoQty\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col> -->\r\n              <ion-col class=\"flex\" size='4'>\r\n                <div class=\"flex\" *ngIf=\"userRole != 'vendor'\">\r\n                  <ion-label>Allow Address</ion-label>&nbsp;&nbsp;\r\n                  <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input color=\"primary\" type=\"checkbox\" (click)=\"toggleCheckbox('allowAddress')\"\r\n                          [checked]=\"booking.allowAddress\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                  </ion-col>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"headings\" style=\"display: flex;align-items: center;\" size='4'>\r\n                <div>Gst Exclusive</div>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\" (click)=\"toggleGstExclusive()\" [checked]=\"booking.gstExclusive\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n              <br>\r\n              <ion-col size=\"4\">\r\n                <ion-label>\r\n                  Price ( {{ booking.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                </ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.prodPrice\"></ion-input>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>\r\n                    Discounted Price ( {{ booking.gstExclusive ? 'exclusive':'inclusive'}} of all taxes)\r\n                  </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.discountedPrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Purchase Price </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.purchasePrice\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- <ion-col size=\"4\">\r\n                <ion-label>Quantity</ion-label>\r\n                <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"booking.productQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <ion-label> Min Quantity</ion-label>\r\n                <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.minQty\"></ion-input>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Max Quantity </ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.maxQty\"></ion-input>\r\n                </div>\r\n              </ion-col> -->\r\n              <!-- <ion-col size=\"12\">\r\n                <div class=\"flex\" *ngIf=\"userRole != 'vendor'\">\r\n                  <ion-label>Allow Address</ion-label>&nbsp;&nbsp;\r\n                  <ion-col size=\"2\" class=\"ion-no-padding\">\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input color=\"primary\" type=\"checkbox\" (click)=\"toggleCheckbox('allowAddress')\"\r\n                          [checked]=\"booking.allowAddress\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                  </ion-col>\r\n                </div>\r\n              </ion-col> -->\r\n            </ion-row>\r\n            <br />\r\n            <ion-row>\r\n              <ion-col size=\"10\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Keywords (Search)</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"keyword\" autocapitalize></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"2\">\r\n                <ion-button class=\"btn-2 m-t-36\" fill=\"outline\" shape=\"round\" (click)=\"addSearchKeywords()\">\r\n                  Add </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"booking.searchKeywords\">\r\n                <ion-chip outline color=\"dark\" *ngFor=\"let x of booking.searchKeywords; let i = index;\">\r\n                  <ion-icon name=\"close-circle\" (click)=\"removeKeyword(i)\"></ion-icon>\r\n                  <ion-label>{{x}}</ion-label>\r\n                </ion-chip>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Service Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"booking.productCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>HSN Code</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"booking.hsnCode\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label> GST (%)</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.gst\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Barcode Number</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"booking.barcodeNo\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Description -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-row>\r\n            <ion-col size=\"12\">\r\n              <p style=\"font-weight: bold;\">Service Description</p>\r\n              <br>\r\n              <ckeditor [(ngModel)]=\"booking.prodDesc\" [config]=\"ckeConfig\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col size=\"12\" style=\"margin-top:1rem;\">\r\n              <p style=\"font-weight: bold;\">Service Short Description</p>\r\n              <br>\r\n              <ckeditor [config]=\"ckeConfig\" [(ngModel)]=\"booking.prodShortDesc\"></ckeditor>\r\n            </ion-col>\r\n          </ion-row>\r\n          <br>\r\n          <ng-container *ngIf=\"editProductId\">\r\n            <ion-button shape=\"round\" class=\"btn-1 i-start\" color=\"primary\" (click)=\"addNewSection()\"\r\n              style=\"margin-bottom: 15px; margin-top: 15px;\">\r\n              <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n              Add New Section\r\n            </ion-button>\r\n            <ion-reorder-group (ionItemReorder)=\"SectionReorder($event)\" disabled=\"false\">\r\n              <ion-item *ngFor=\"let item of productSections; let i = index\">\r\n                <div class=\"section\">\r\n                  <div style=\"display: inline-flex\">\r\n                    <ion-reorder slot=\"end\"> <i class=\"flaticon-menu\"></i>\r\n                    </ion-reorder>\r\n                    &nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <p style=\"margin-top: -12px;font-size: large\">Section\r\n                      {{i+1}}</p>\r\n                  </div>\r\n                  <br><br>\r\n                  <div class=\"sectionBlock\">\r\n                    <div style=\"display: block\">\r\n                      <p *ngIf=\"item.sectionName\" class=\"crop\">Name: {{item.sectionName}}</p>\r\n                      <br *ngIf=\"item.sectionName\">\r\n                      <p *ngIf=\"item.widgetType\">Type: {{item.widgetType}}</p>\r\n                    </div>\r\n                    <div style=\"display: flex\">\r\n                      <div>\r\n                        <ion-button (click)=\"openWidgetEdit(item.widgetType,item.widgetID,i)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Edit\r\n                        </ion-button>\r\n                        &nbsp;&nbsp;\r\n                        <ion-button (click)=\"deleteSectionConfirm(item.widgetID,i, 'web')\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\" slot=\"icon-only\"></i>\r\n                          &nbsp;Delete\r\n                        </ion-button>\r\n                      </div>\r\n                      <ion-list lines=\"none\" style=\"display: flex;margin-top: -20px;margin-left: 10px\">\r\n                        <ion-item>\r\n                          <ion-label>App</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='app' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'app')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n\r\n                        <ion-item>\r\n                          <ion-label>Website</ion-label>\r\n                          <ion-toggle [checked]=\"item.location=='web' || item.location=='all'\"\r\n                            (ionChange)=\"changeLocationStatus(i,'web')\">\r\n                          </ion-toggle>\r\n                        </ion-item>\r\n                      </ion-list>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!editProductId\">\r\n            <ion-text color=\"danger\" style=\"display: flex;justify-content: center;\">\r\n              <p style=\"font-weight: bold;font-size: large;\">\r\n                * Once product is created, you can create sections for service description\r\n              </p>\r\n            </ion-text>\r\n          </ng-container>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Schedule -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <!-- Active Toggles -->\r\n            <ion-row>\r\n              <ion-col class=\"flex\" size='4'>\r\n                <ion-label>Active Schedule</ion-label>&nbsp;&nbsp;\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" (click)=\"toggleCheckbox('isSchedule')\"\r\n                      [checked]=\"booking.scheduleData.active\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <!-- Estimated Duration -->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <h3>Estimated duration</h3>\r\n              </ion-col>\r\n              <ion-col size='3'>\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Months</ion-label>&nbsp;&nbsp;\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"booking.scheduleData.duration.months\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size='3'>\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Days</ion-label>&nbsp;&nbsp;\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"booking.scheduleData.duration.days\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size='3'>\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Hours</ion-label>&nbsp;&nbsp;\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"booking.scheduleData.duration.hours\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size='3'>\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Minutes</ion-label>&nbsp;&nbsp;\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"booking.scheduleData.duration.minutes\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <!-- Make Schedules  Start-->\r\n            <ion-row>\r\n              <ion-col size='4'>\r\n                <h3>Predefined Schedule</h3>\r\n                <!-- <div class=\"flex\">\r\n                  <ion-label>Predefined Slots</ion-label>&nbsp;&nbsp;\r\n                  <div class=\"toggle-btn\">\r\n                    <label class=\"switch\">\r\n                      <input color=\"primary\" type=\"checkbox\" (click)=\"toggleCheckbox('predefinedSlot')\"\r\n                        [checked]=\"booking.scheduleData.isPredefined\">\r\n                      <span class=\"slider round\"></span>\r\n                    </label>\r\n                  </div>\r\n                </div> -->\r\n              </ion-col>\r\n\r\n              <!--  *ngIf=\"booking.scheduleData.isPredefined\" -->\r\n              <ng-container>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flexJustifySpace\">\r\n                    <h3>Make Schedules</h3>\r\n                    <ion-button fill=\"outline\" (click)=\"selectDefaultSchedule()\">\r\n                      Add default Schedules\r\n                    </ion-button>\r\n                  </div>\r\n                  <div class=\"flex\">\r\n                    <p>Max number of days for booking:</p>&nbsp;&nbsp;\r\n                    <input placeholder=\"Enter days\" type=\"number\" [(ngModel)]='booking.scheduleData.maxDays'>\r\n                  </div>\r\n                  <br>\r\n                  <ng-container *ngIf=\"booking.scheduleData.schedules\">\r\n                    <div class=\"schedulesBox\" *ngFor=\"let item of booking.scheduleData.schedules; index as i\">\r\n                      <div class=\"firstHalf\">\r\n                        <div class=\"flex\">\r\n                          <input type='checkbox' (click)=\"changeSchedule(i)\" [checked]='item.active' />&nbsp;&nbsp;\r\n                          <p><strong>{{item.day | uppercase}}</strong></p>\r\n                        </div>\r\n                        <ng-container *ngIf=\"item.schedule && item.schedule.length > 0\">\r\n                          <div class=\"slotWrapper\">\r\n                            <div class=\"scheduleList\" *ngFor=\"let time of item.schedule; index as j\">\r\n                              <div class=\"inputWrapper\">\r\n                                <input class=\"slotInput\" type=\"time\" [(ngModel)]='time.start'>\r\n                                <span>-</span>\r\n                                <input class=\"slotInput\" type=\"time\" [(ngModel)]='time.end'>\r\n                                <input class=\"slotInput\" type=\"number\" [(ngModel)]='time.slotLimit'\r\n                                  placeholder=\"Slot Limit\">\r\n                              </div>\r\n                              <ion-button class=\"slotBtn\" (click)=\"removeSlot(i,j)\" fill=\"clear\">\r\n                                <i class=\"flaticon-null-21\"></i>\r\n                              </ion-button>\r\n                            </div>\r\n                          </div>\r\n                        </ng-container>\r\n                      </div>\r\n\r\n                      <div class=\"secondHalf\">\r\n                        <ion-button class=\"slotBtn\" (click)=\"addSlot(i)\" fill=\"clear\">\r\n                          <i class=\"flaticon-null-28\"></i>\r\n                        </ion-button>\r\n\r\n                        <ion-item>\r\n                          <ion-label>copy</ion-label>\r\n                          <ion-select class=\"copyList\" [interfaceOptions]=\"customActionSheetOptions\"\r\n                            (ionChange)=\"getSelectOption(i,$event.target.value)\" multiple=\"true\" mode=\"ios\"\r\n                            okText=\"Apply\" cancelText=\"Dismiss\">\r\n                            <ion-select-option *ngFor=\"let data of booking.scheduleData.schedules, index as k;\"\r\n                              [value]=\"k\" [disabled]=\"item.day == data.day\">\r\n                              {{data.day}}\r\n                            </ion-select-option>\r\n                          </ion-select>\r\n                        </ion-item>\r\n\r\n                        <!-- <ion-button class=\"slotBtn\" fill=\"clear\">\r\n                          copy\r\n                        </ion-button> -->\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </ion-col>\r\n              </ng-container>\r\n            </ion-row>\r\n\r\n            <!-- Make Schedules End-->\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Categories and Brands -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\"\r\n          style=\"display: flex;flex-wrap: nowrap;flex-direction: row;align-content: center;justify-content: space-around;align-items: flex-start;\">\r\n          <div class=\"categories-container\">\r\n            <div class=\"no-data\" *ngIf=\"showNoCategories\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No categories</h6>\r\n            </div>\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoCategories\">\r\n              <ion-searchbar [(ngModel)]=\"searchCategory\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <div class=\"categories-wrapper\" *ngIf=\"!showNoCategories\">\r\n              <ion-list>\r\n                <ion-list-header>\r\n                  <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Categories\r\n                  </ion-label>\r\n                </ion-list-header>\r\n                <div *ngFor=\"let category of categories | filter: searchCategory\">\r\n                  <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                    <ion-item (click)=\"onClickCategoryCheckBox(category.id)\" style=\"width: 100%;\">\r\n                      <ion-label>{{category.name}}</ion-label>\r\n                      <ion-checkbox [checked]=\"editCheckBoxValue(category.id)\" color=\"primary\" slot=\"start\">\r\n                      </ion-checkbox>\r\n                    </ion-item>\r\n                    <div (click)=\"getSubcategories(category.id)\" slot=\"end\"\r\n                      style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"category.isSubcategories\">\r\n                      <i class=\"flaticon-null-13\"\r\n                        *ngIf=\"(listOfSubcategoriesInView.hasOwnProperty(category.id) && !listOfSubcategoriesInView[category.id].active) || !listOfSubcategoriesInView.hasOwnProperty(category.id)\"></i>\r\n                      <i class=\"flaticon-null-14\"\r\n                        *ngIf=\"listOfSubcategoriesInView.hasOwnProperty(category.id) && listOfSubcategoriesInView[category.id].active\"></i>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    *ngIf=\"(listOfSubcategories[category.id] && listOfSubcategories[category.id].length) && listOfSubcategoriesInView[category.id].active\"\r\n                    style=\"margin-left: 10%;\">\r\n                    <ng-container *ngFor=\"let subCat of listOfSubcategories[category.id]\">\r\n                      <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                        <ion-item (click)=\"onClickCategoryCheckBox(subCat.id)\" style=\"width: 100%;\">\r\n                          <ion-label>{{subCat.name}}</ion-label>\r\n                          <ion-checkbox [checked]=\"editCheckBoxValue(subCat.id)\" color=\"primary\" slot=\"start\">\r\n                          </ion-checkbox>\r\n                        </ion-item>\r\n                        <!-- Sub-SubCategory Start -->\r\n                        <div (click)=\"getSubOfSubCategories(category.id, subCat.id)\" slot=\"end\"\r\n                          style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"subCat.isSubcategories\">\r\n                          <i class=\"flaticon-null-13\" *ngIf=\"!subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                          <i class=\"flaticon-null-14\" *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                        </div>\r\n                      </div>\r\n                      <ng-container\r\n                        *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active && subOfSubCategories[subCat.id].length\">\r\n                        <div style=\"margin-left: 10%;\">\r\n                          <ng-container *ngFor=\"let subSubCat of subOfSubCategories[subCat.id]\">\r\n                            <ion-item (click)=\"onClickCategoryCheckBox(subSubCat.id)\">\r\n                              <ion-label>{{subSubCat.name}}</ion-label>\r\n                              <ion-checkbox [checked]=\"editCheckBoxValue(subSubCat.id)\" color=\"primary\" slot=\"start\">\r\n                              </ion-checkbox>\r\n                            </ion-item>\r\n                          </ng-container>\r\n                        </div>\r\n                      </ng-container>\r\n                      <!-- Sub-SubCategory End -->\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n\r\n              </ion-list>\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"brands-container\">\r\n            <div class=\"product-search-wrap\" *ngIf=\"!showNoBrands\">\r\n              <ion-searchbar [(ngModel)]=\"searchBrand\" mode=\"ios\"></ion-searchbar>\r\n            </div>\r\n            <ion-list *ngIf=\"!showNoBrands && brands.length\">\r\n              <ion-list-header>\r\n                <ion-label class=\"np-list-header\" style=\"font-size: 16px;font-weight: bold;\">Brands</ion-label>\r\n              </ion-list-header>\r\n              <div *ngFor=\"let brand of brands | filter: searchBrand\">\r\n                <ion-item (click)=\"onClickBrandCheckBox(brand.id)\" style=\"width: 100%;\">\r\n                  <ion-label>{{brand.name}}</ion-label>\r\n                  <ion-checkbox [checked]=\"editBrandCheckBoxValue(brand.id)\" color=\"primary\" slot=\"start\">\r\n                  </ion-checkbox>\r\n                </ion-item>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Images -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <button class=\"upload-btn btn-1 i-start\" (click)=\"onDrop($event.target.files)\">Upload Service\r\n            Image(s)</button>\r\n          <h3>Uploads</h3>\r\n          <div class=\"no-img\" *ngIf=\"listOfBase64Image.length == 0\">\r\n            No attached images\r\n          </div>\r\n\r\n          <div class=\"imgs-container\" *ngIf=\"listOfBase64Image.length !== 0\">\r\n            <div class=\"img-wrap\" *ngFor=\"let img of listOfBase64Image; let i = index\">\r\n              <img [src]=\"img.base64Img\" (click)=\"onClickEditImage(img.url)\" />\r\n              <div class=\"overlay\">\r\n                <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" (click)=\"removeImage(i)\">\r\n                  <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == true\" class=\"btn-2 cover\" shape=\"round\">\r\n                  Cover Pic\r\n                </ion-button>\r\n                <ion-button *ngIf=\"img.cover == false\" (click)=\"newProductCoverPic(i)\" class=\"btn-2 cover\"\r\n                  shape=\"round\">\r\n                  Make Cover\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Image List -->\r\n          <div class=\"list-header\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"reorder\">\r\n                  <p>Reorder</p>\r\n                </ion-col>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <div class=\"list-container\">\r\n            <ion-reorder-group (ionItemReorder)=\"imagesReorder($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n              <ion-item *ngFor=\"let img of booking.images; let i = index\" lines=\"none\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"ion-align-items-center\">\r\n                    <ion-col class=\"reorder\">\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                    <ion-col class=\"img\">\r\n                      <img [src]=\"img.url\" (click)=\"onClickEditImage(img.url)\" height=\"200px\" />\r\n                    </ion-col>\r\n                    <ion-col class=\"action\">\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"remove\" shape=\"round\" color=\"danger\" fill=\"clear\" large\r\n                          (click)=\"removeEditImageInData(i, img.url)\">\r\n                          <ion-icon name=\"trash\" slot=\"icon-only\" style=\" font-size: 16px;\"></ion-icon>\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"booking.coverPic.imageId == img.imageId\" class=\"btn-2 cover\" shape=\"round\"\r\n                          disabled>\r\n                          Cover\r\n                        </ion-button>\r\n                        <ion-button *ngIf=\"booking.coverPic.imageId != img.imageId \" class=\"btn-2 cover\" shape=\"round\"\r\n                          (click)=\"editProductCoverPicInData(i)\">\r\n                          Make Cover\r\n                        </ion-button>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n                <br>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n          <!-- Image List -->\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Advanced (optional) -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2 id=\"scroll1\">\r\n                <div class=\"statusList\">\r\n                  <div [id]=\"i\" *ngFor=\"let item of sideMenu; index as i\" (click)='changeComponent(i)'>\r\n                    <ng-container *ngIf=\"userRole !== 'vendor'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"userRole == 'vendor' && item != 'Vendor' && item != 'Specific User Discount'\">\r\n                      <p>{{item}}</p>\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=10 id=\"scroll2\" style=\"border-left: 1px solid lightgray;\">\r\n                <ng-container [ngSwitch]=\"selectedId\">\r\n                  <ion-grid>\r\n                    <!-- Cash on delivery -->\r\n                    <!-- <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Cash On Delivery</h3>\r\n                      </ion-col>\r\n                      <ion-col style=\"display: flex;align-items: center;\">\r\n                        <div>Cash on delivery (COD) for service</div>\r\n                        &nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"toggleCod()\" [checked]=\"booking.isCod\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n                    <!-- Extra Charges -->\r\n                    <!-- <ion-row *ngSwitchCase=\"1\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Extra Charges</h3>\r\n                      </ion-col>\r\n                      <ion-col style=\"display: flex;align-items: center;\">\r\n                        <ion-label>Extra Charges</ion-label>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"toggleExtraCharges()\"\r\n                              [checked]=\"booking.extraCharges.active\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                      <br>\r\n                      <ng-container *ngIf='booking.extraCharges.active'>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-label>Charge Name / Label</ion-label>\r\n                            <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"booking.extraCharges.label\">\r\n                            </ion-input>\r\n                          </ion-col>\r\n                          <br>\r\n                          <ion-col size=\"6\">\r\n                            <ion-label>Cost</ion-label>\r\n                            <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.extraCharges.charge\">\r\n                            </ion-input>\r\n                          </ion-col>\r\n                          <br>\r\n                          <ion-col style=\"display: flex;align-items: center;\">\r\n                            <ion-label>Apply this charge for each service\r\n                              seperately when multiple purchased together\r\n                            </ion-label>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" (click)=\"toggleChargeQty()\"\r\n                                  [checked]=\"booking.extraCharges.chargeAllQty\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </ion-col>\r\n                          <br>\r\n                        </ion-row>\r\n                      </ng-container>\r\n                    </ion-row> -->\r\n                    <!-- Subscription -->\r\n                    <!-- <ion-row *ngSwitchCase=\"2\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Subscription</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!subscriptionFeature\">This option is only\r\n                          available when Subscription feature is on</p>\r\n                      </ion-text>\r\n                      <ion-col>\r\n                        <div *ngIf=\"subscriptionFeature\">\r\n                          <ion-row class=\"ion-justify-content-between ion-align-items-center\">\r\n                            <ion-col class=\"ion-no-padding\" style=\"display: flex;\">\r\n                              <ion-label>Allow Subscriptions</ion-label>\r\n                              &nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input color=\"primary\" type=\"checkbox\" (click)=\"subIsAllowedToggle()\"\r\n                                    [checked]=\"booking.subscription.isAllowed\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                          <div *ngIf=\"booking.subscription.isAllowed\">\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Daily Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"booking.subscription.dailyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Weekly Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"booking.subscription.weeklyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                            <ion-row>\r\n                              <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                                <ion-label>Monthly Discount (%)</ion-label>\r\n                                <ion-input type=\"number\" class=\"form-input\"\r\n                                  [(ngModel)]=\"booking.subscription.monthlyDiscount\">\r\n                                </ion-input>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n                    <!-- Limited Time Deal -->\r\n                    <!-- <ion-row *ngSwitchCase=\"3\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Limited Time Deal</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!limitedTimeDeal\">This option is only\r\n                          available when Limited Time Deal feature is on</p>\r\n                      </ion-text>\r\n                      <ion-col>\r\n                        <div *ngIf=\"limitedTimeDeal\">\r\n                          <ion-row>\r\n                            <ion-col class=\"ion-no-padding\" style=\"display: flex;\">\r\n                              <ion-label>Limited Time Offer</ion-label>\r\n                              &nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input color=\"primary\" type=\"checkbox\" (click)=\"dealIsAllowedToggle()\"\r\n                                    [checked]=\"booking.deal.isAllowed\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                          <div class=\"headings\">\r\n                            Start date time\r\n                          </div>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!booking.deal.isAllowed\"\r\n                                placeholder=\"Date\" displayFormat=\"DD MMM YYYY\" [(ngModel)]=\"booking.deal.start.date\"\r\n                                [min]=\"minDate\"></ion-datetime>\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" style=\"text-align: center;\">\r\n                              -\r\n                            </ion-col>\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!booking.deal.isAllowed\"\r\n                                placeholder=\"Time\" displayFormat=\"hh:mm A\" pickerFormat=\"hh:mm A\"\r\n                                [(ngModel)]=\"booking.deal.start.time\">\r\n                              </ion-datetime>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <div class=\"headings\">\r\n                            End date time\r\n                          </div>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!booking.deal.isAllowed\"\r\n                                placeholder=\"Date\" displayFormat=\"DD MMM YYYY\" [(ngModel)]=\"booking.deal.end.date\"\r\n                                [min]=\"minDate\"></ion-datetime>\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" style=\"text-align: center;\">\r\n                              -\r\n                            </ion-col>\r\n                            <ion-col size=\"3\">\r\n                              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!booking.deal.isAllowed\"\r\n                                placeholder=\"Time\" displayFormat=\"hh:mm A\" pickerFormat=\"hh:mm A\"\r\n                                [(ngModel)]=\"booking.deal.end.time\">\r\n                              </ion-datetime>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"6\">\r\n                              <div class=\"headings\">\r\n                                Deal discount\r\n                              </div>\r\n                              <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"booking.deal.discount\">\r\n                              </ion-input>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row> -->\r\n                    <!-- Specific User Discount -->\r\n                    <!-- <ion-row *ngSwitchCase=\"4\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Specific User Discount</h3>\r\n                      </ion-col>\r\n                      <ion-text color=\"danger\">\r\n                        <p *ngIf=\"!booking.deal.isAllowed\">This option is only\r\n                          available when limited time deal is on</p>\r\n                      </ion-text>\r\n                      <ng-container *ngIf=\"booking.deal.isAllowed\">\r\n                        <ion-col size=\"6\">\r\n                          <div class=\"input-wrap\">\r\n                            <div class=\"flex-label\">\r\n                              <ion-label>Give user specific discount on this\r\n                                product</ion-label>\r\n                              <ion-toggle [(ngModel)]=\"booking.deal.specificUsers.active\">\r\n                              </ion-toggle>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"6\" *ngIf=\"booking.deal.specificUsers.active\">\r\n                          <ion-button class=\"btn-2 i-start\" (click)=\"openUsersModal()\" shape=\"round\" fill=\"outline\">\r\n                            <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                            Add Users\r\n                          </ion-button>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-container\r\n                        *ngIf=\"booking.deal.isAllowed && booking.deal.specificUsers.active && booking.deal.specificUsers.users.length>0\">\r\n                        <h5 style=\"margin: 0px;\">User List with Discount &nbsp;\r\n                          <i class=\"flaticon-null-27 cursor-p\" *ngIf=\"moreUsers\" (click)=\"moreUsers = !moreUsers\"></i>\r\n                          <i class=\"flaticon-null-28 cursor-p\" *ngIf=\"!moreUsers\" (click)=\"moreUsers = !moreUsers\"></i>\r\n                        </h5>\r\n                        <div class=\"ion-no-padding\" *ngIf=\"moreUsers\">\r\n                          <div class=\"list-header t-a-c\">\r\n                            <ion-grid class=\"ion-no-padding\">\r\n                              <ion-row class=\"headings\">\r\n                                <ion-col size=\"3\">\r\n                                  <p>Name</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"3\">\r\n                                  <p>Phone Number</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"2\">\r\n                                  <p>Discount(%)</p>\r\n                                </ion-col>\r\n                                <ion-col size=\"2\">\r\n                                  <p>Delete</p>\r\n                                </ion-col>\r\n                              </ion-row>\r\n                            </ion-grid>\r\n                          </div>\r\n                          <div class=\"list-container\">\r\n                            <ion-item *ngFor=\"let item of booking.deal.specificUsers.users; let i = index\">\r\n                              <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                                <ion-row class=\"ion-align-items-center\">\r\n                                  <ion-col size=\"3\">\r\n                                    <p class=\"ion-text-capitalize ion-text-center\">\r\n                                      {{item.name}}</p>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"3\">\r\n                                    <p class=\"ion-text-capitalize ion-text-center\">\r\n                                      {{item.phoneNo}}</p>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"2\">\r\n                                    <ion-input type=\"number\" class=\"form-input padding-start-16\"\r\n                                      [(ngModel)]=\"item.discount\"></ion-input>\r\n                                  </ion-col>\r\n                                  <ion-col size=\"2\" class=\"ion-text-center\">\r\n                                    <div class=\"ion-text-center\">\r\n                                      <i class=\"flaticon-null-21 cursor-p\" (click)=\"removeUser(i)\"></i>\r\n                                    </div>\r\n                                  </ion-col>\r\n                                </ion-row>\r\n                              </ion-grid>\r\n                            </ion-item>\r\n                          </div>\r\n                        </div>\r\n                      </ng-container>\r\n                    </ion-row> -->\r\n\r\n\r\n                    <!-- Seo for Website -->\r\n                    <ion-row *ngSwitchCase=\"0\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Website SEO</h3>\r\n                      </ion-col>\r\n\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Title</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"booking.metaData.pageTitle\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Description</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"booking.metaData.metaDescription\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Meta Keywords</ion-label>\r\n                          <ion-input class=\"form-input\" [(ngModel)]=\"booking.metaData.metaKeywords\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Vendors -->\r\n                    <ion-row *ngSwitchCase=\"1\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Vendors</h3>\r\n                      </ion-col>\r\n                      <ion-text *ngIf=\"!multiVendor\" color=\"danger\">\r\n                        This option is only available when MultiVendor is on.\r\n                      </ion-text>\r\n                      <ion-col size=\"6\">\r\n                        <ng-container *ngIf=\"multiVendor && vendors.length\">\r\n                          <ion-row>\r\n                            <div class=\"headings\">\r\n                              Add Vendor\r\n                            </div>\r\n                          </ion-row>\r\n                          <ion-row>\r\n                            <ion-col size=\"12\">\r\n                              <ion-select [value]=\"booking.vendorId\" class=\"border i-s-p-10\"\r\n                                (ionChange)=\"addVendor($event)\" placeholder=\"Select Vendor\">\r\n                                <ion-select-option value=\"\">No Vendor</ion-select-option>\r\n                                <ion-select-option [value]=\"vendor.id\" *ngFor=\"let vendor of vendors\">\r\n                                  {{vendor.name}}\r\n                                </ion-select-option>\r\n                              </ion-select>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                          <br>\r\n                        </ng-container>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Add Ons -->\r\n                    <ion-row *ngSwitchCase=\"2\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Add Ons</h3>\r\n                      </ion-col>\r\n                      <ion-col size=\"12\">\r\n                        <label>Select Addon Templates:</label>&nbsp;<br>\r\n                        <select class=\"selectInput\" (change)=\"changeTemplate($event.target.value)\"\r\n                          [(ngModel)]='booking.templateId'>\r\n                          <option value=\"\" disabled selected hidden>Please choose</option>\r\n                          <option value=\"\">None</option>\r\n                          <option value=\"{{template.id}}\" *ngFor=\"let template of templatesArray\">\r\n                            {{template.name}}\r\n                          </option>\r\n                        </select>\r\n                      </ion-col>\r\n                    </ion-row>\r\n\r\n                    <!-- Slug Name -->\r\n                    <ion-row *ngSwitchCase=\"3\">\r\n                      <ng-container *ngIf=\"isUniversal && editProductId else noUniversal\">\r\n                        <ion-col>\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Slug Name\r\n                              <ion-text color=\"danger\">\r\n                                (<b class=\"cursor-p\" (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug\r\n                                Instructions)\r\n                              </ion-text>\r\n                            </ion-label>\r\n                            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                              <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='booking.slug.name'\r\n                                style=\"width: 80%;\"></ion-input>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                      <ng-template #noUniversal>\r\n                        <p>Coming Soon!</p>\r\n                      </ng-template>\r\n                    </ion-row>\r\n\r\n                    <!-- Custom Input -->\r\n                    <ion-row *ngSwitchCase=\"4\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Custom Input</h3>\r\n                      </ion-col>\r\n                      <ion-col style=\"display: flex;align-items: center;\">\r\n                        <ion-label>Custom input</ion-label>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"toggleCheckbox('customInput')\"\r\n                              [checked]=\"booking?.additionalInfo?.customInput.active\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ng-container *ngIf=\"booking?.additionalInfo?.customInput.active\">\r\n                        <ion-col size=\"12\" style=\"display: flex;align-items: center;\">\r\n                          <ion-label>Mandatory</ion-label>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\" (click)=\"toggleCheckbox('customInputRequired')\"\r\n                                [checked]=\"booking?.additionalInfo?.customInput?.required\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </ion-col>\r\n\r\n                        <ion-col size=\"12\">\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Custom Label Name</ion-label>\r\n                            <ion-input class=\"form-input\" [(ngModel)]=\"booking?.additionalInfo?.customInput.label\">\r\n                            </ion-input>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ng-container>\r\n\r\n                      <ion-text color=\"danger\" *ngIf=\"!booking?.additionalInfo?.customInput.active\">\r\n                        <p>Custom input is disabled.</p>\r\n                      </ion-text>\r\n                    </ion-row>\r\n\r\n\r\n                    <!-- Regions -->\r\n                    <ion-row *ngSwitchCase=\"5\">\r\n                      <ion-col size=\"12\">\r\n                        <h3>Regions</h3>\r\n                      </ion-col>\r\n                      <ion-text *ngIf=\"!multiRegion\" color=\"danger\">\r\n                        <p>This option is only available when Multi Region is on</p>\r\n                      </ion-text>\r\n                      <ng-container *ngIf=\"multiRegion\">\r\n                        <ion-col size=\"12\" style=\"display: flex;align-items: center;\">\r\n                          <ion-label>Active</ion-label>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\" (click)=\"toggleCheckbox('allRegions')\"\r\n                                [checked]=\"booking.allRegions?.active\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </ion-col>\r\n                        <br>\r\n                        <ion-col size=\"12\" *ngIf=\"booking.allRegions.active\">\r\n                          <ng-container *ngFor=\"let region of this.booking.allRegions.regions,index as i\">\r\n                            <div class=\"regionWrap\">\r\n                              <div class=\"flex\">\r\n                                <input type='checkbox' (click)=\"toggleRegion(i)\"\r\n                                  [checked]='region.active' />&nbsp;&nbsp;\r\n                                <p><strong>{{region.name | uppercase}}</strong></p>\r\n                              </div>\r\n                              <ion-row>\r\n                                <ion-col class=\"input-wrap\">\r\n                                  <ion-label>Price</ion-label>\r\n                                  <ion-input class=\"form-input\" [(ngModel)]=\"region.price\" type=\"number\"></ion-input>\r\n                                </ion-col>\r\n                                <ion-col class=\"input-wrap\">\r\n                                  <ion-label>Discounted Price</ion-label>\r\n                                  <ion-input class=\"form-input\" [(ngModel)]=\"region.discountedPrice\" type=\"number\">\r\n                                  </ion-input>\r\n                                </ion-col>\r\n                                <!-- <ion-col class=\"input-wrap\">\r\n                                  <ion-label>Quantity</ion-label>\r\n                                  <ion-input class=\"form-input\" [(ngModel)]=\"region.qty\" type=\"number\"></ion-input>\r\n                                </ion-col> -->\r\n                              </ion-row>\r\n                            </div>\r\n                          </ng-container>\r\n                        </ion-col>\r\n                      </ng-container>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n\r\n                  <!-- Clone Service -->\r\n                  <!-- <ion-grid *ngSwitchCase=\"7\">\r\n                    <ion-row>\r\n                      <ion-col>\r\n                        <ng-container *ngIf=\"!editProductId\">\r\n                          <ion-text color=\"danger\">\r\n                            <p>Note: This feature is available when you edit this service.</p>\r\n                          </ion-text>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"editProductId\">\r\n                          <ion-button color=\"primary\" fill=\"outline\" shape=\"round\" size=\"small\"\r\n                            (click)=\"cloneProduct()\">Clone Product</ion-button>\r\n                        </ng-container>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid> -->\r\n                </ng-container>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n  <!-- Booking -->\r\n\r\n</super-tabs>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"deleteAlertConfirm();\" *ngIf=\"editProductId\" shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"danger\">\r\n      <i class=\"flaticon-null-21\"></i>\r\n      Delete\r\n    </ion-button>\r\n    <ion-button (click)=\"saveBooking()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/booking/create-booking/create-booking.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/booking/create-booking/create-booking.module.ts ***!
  \***********************************************************************/
/*! exports provided: CreateBookingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateBookingPageModule", function() { return CreateBookingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_booking_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-booking.page */ "./src/app/admin/booking/create-booking/create-booking.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");












// import { ColorsModalPage } from '../../variants/colors-modal/colors-modal.page';
// import { TemplatesModalPage } from '../../variants/templates-modal/templates-modal.page';
const routes = [
    {
        path: '',
        component: _create_booking_page__WEBPACK_IMPORTED_MODULE_6__["CreateBookingPage"]
    }
];
let CreateBookingPageModule = class CreateBookingPageModule {
};
CreateBookingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
        declarations: [_create_booking_page__WEBPACK_IMPORTED_MODULE_6__["CreateBookingPage"],],
        entryComponents: []
    })
], CreateBookingPageModule);



/***/ }),

/***/ "./src/app/admin/booking/create-booking/create-booking.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/admin/booking/create-booking/create-booking.page.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-btn-wrapper {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.upload-btn {\n  color: #fff;\n  background-color: var(--ion-color-primary);\n  padding: 8px 20px;\n  border-radius: 42px;\n  font-size: 16px;\n  font-weight: 400;\n  cursor: pointer;\n  height: 42px;\n  margin-left: 16px;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.product-color-name {\n  max-width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n}\n\n.color-selected {\n  display: -webkit-box;\n  display: flex;\n}\n\n.color-code {\n  width: 40px;\n  height: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n  min-width: 40px;\n}\n\n.input-border {\n  border: 1px solid lightgray;\n  text-align: center;\n}\n\nion-select {\n  border: 1px solid lightgray;\n}\n\n.form-input {\n  border: 1px solid gray;\n  background: var(--ion-color-light);\n  margin-top: 12px;\n  border-radius: 8px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.product-search-wrap {\n  text-align: center;\n}\n\n.product-search-wrap ion-searchbar {\n  width: 300px;\n  max-width: 100%;\n  margin: auto;\n}\n\n/* width */\n\n::-webkit-scrollbar {\n  width: 5px;\n}\n\n/* Track */\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n/* Handle */\n\n::-webkit-scrollbar-thumb {\n  background: #888;\n}\n\n/* Handle on hover */\n\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\n.filters-col {\n  border: 1px solid lightgray;\n  padding: 8px;\n}\n\n.list-header {\n  position: static;\n  margin: 36px auto;\n}\n\n.list-container {\n  margin: 0;\n}\n\nion-col.img {\n  width: calc(100% - 400px);\n  max-width: calc(100% - 400px);\n  text-align: center;\n}\n\nion-col.action {\n  width: 200px;\n  max-width: 200px;\n}\n\nion-col.reorder {\n  width: 200px;\n  max-width: 200px;\n  text-align: center;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.m-l-5-p {\n  text-align: center;\n}\n\n.widget-type {\n  color: #999;\n  margin-left: 12px;\n}\n\n.section {\n  display: block;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px;\n}\n\n.sectionBlock {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 1000px;\n}\n\n.crop {\n  overflow: hidden;\n  width: 200px;\n  text-overflow: ellipsis;\n}\n\n.padding-start-16 {\n  --padding-start: 16px !important;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 80vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 87vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.groupInput {\n  border: none;\n  border-bottom: 1px solid;\n  padding: 5px;\n  text-align: center;\n}\n\n.groupSelect {\n  width: 150px;\n}\n\n.variantImageSelect {\n  border: 1px solid;\n  text-align: center;\n  max-width: 100%;\n  margin-top: 12px;\n}\n\n.groupDisplay {\n  display: -webkit-box;\n  display: flex;\n  margin-left: 12px;\n}\n\n.variantGroups {\n  margin-top: 0px !important;\n  text-align: center;\n}\n\n.remove-icon {\n  cursor: pointer;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n\n.select-wrap {\n  padding: 5px;\n  margin-left: 5px;\n  background: var(--ion-color-light);\n  border-radius: 5px;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n\n.flexJustifySpace {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox {\n  border-bottom: 1px solid lightgray;\n  margin-bottom: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.schedulesBox .firstHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  gap: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .inputWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput {\n  width: 120px;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin: 0 8px 8px 8px;\n}\n\n.schedulesBox .slotWrapper .scheduleList .slotInput:hover {\n  border: 1px solid #000;\n}\n\n.schedulesBox .secondHalf {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.schedulesBox .slotBtn {\n  color: #000;\n}\n\n.schedulesBox .slotBtn i {\n  color: #4a4a4a;\n  font-size: 22px;\n}\n\n.schedulesBox .slotBtn i:hover {\n  color: #000;\n}\n\n.copyList {\n  border: 0;\n}\n\n.selectInput {\n  width: 30%;\n  padding: 8px;\n}\n\n.regionWrap {\n  padding: 8px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYm9va2luZy9jcmVhdGUtYm9va2luZy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGJvb2tpbmdcXGNyZWF0ZS1ib29raW5nXFxjcmVhdGUtYm9va2luZy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2Jvb2tpbmcvY3JlYXRlLWJvb2tpbmcvY3JlYXRlLWJvb2tpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FDQ0Y7O0FERUE7RUFDRSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMEJBQUE7QUNDRjs7QURFQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0NGOztBREVBO0VBQ0UsMkJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsMkJBQUE7QUNDRjs7QURFQTtFQUNFLHNCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUNDRjs7QURDQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNFRjs7QURDQTtFQUNFLGtCQUFBO0FDRUY7O0FEREU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNHSjs7QURDQSxVQUFBOztBQUNBO0VBQ0UsVUFBQTtBQ0VGOztBRENBLFVBQUE7O0FBQ0E7RUFDRSxtQkFBQTtBQ0VGOztBRENBLFdBQUE7O0FBQ0E7RUFDRSxnQkFBQTtBQ0VGOztBRENBLG9CQUFBOztBQUNBO0VBQ0UsZ0JBQUE7QUNFRjs7QURDQTtFQUNFLDJCQUFBO0VBQ0EsWUFBQTtBQ0VGOztBRENBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQ0VGOztBRENBO0VBQ0UsU0FBQTtBQ0VGOztBRENBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FDRUY7O0FEQUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNHRjs7QUREQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDSUY7O0FEREE7RUFDRSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDSUY7O0FEREE7RUFDRSxrQkFBQTtBQ0lGOztBRERBO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FDSUY7O0FERkE7RUFDRSxjQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGFBQUE7QUNLRjs7QURIQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxhQUFBO0FDTUY7O0FESkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtBQ09GOztBREpBO0VBQ0UsZ0NBQUE7QUNPRjs7QURKQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ09GOztBREpBO0VBQ0UsZ0JBQUE7QUNPRjs7QURKQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ09GOztBREpBO0VBQ0UsZ0JBQUE7QUNPRjs7QURKQTtFQUNFO0lBQ0UsWUFBQTtFQ09GOztFRExBO0lBQ0UsWUFBQTtFQ1FGO0FBQ0Y7O0FETEE7RUFDRSxrQkFBQTtBQ09GOztBRE5FO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ1FKOztBREpBO0VBQ0UsWUFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDT0Y7O0FESkE7RUFDRSxZQUFBO0FDT0Y7O0FESkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDT0Y7O0FESkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxpQkFBQTtBQ09GOztBREpBO0VBQ0UsMEJBQUE7RUFDQSxrQkFBQTtBQ09GOztBREpBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtBQ09GOztBREpBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtBQ09GOztBREpBO0VBQ0UsZ0JBQUE7RUFFQSxrQkFBQTtFQUNBLGdCQUFBO0FDTUY7O0FESkU7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNNSjs7QURKSTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ01OOztBREpJO0VBQ0UseUJBQUE7QUNNTjs7QURIRTtFQUNFLHFCQUFBO0FDS0o7O0FESEU7RUFDRSxlQUFBO0FDS0o7O0FERkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0tGOztBREZBO0VBQ0Usa0NBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNLRjs7QURIRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsUUFBQTtBQ0tKOztBREZJO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGtCQUFBO0FDSU47O0FERk07RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0lSOztBREZNO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUNJUjs7QURIUTtFQUNFLHNCQUFBO0FDS1Y7O0FEQUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxxQkFBQTtVQUFBLHlCQUFBO0FDRUo7O0FEQUU7RUFDRSxXQUFBO0FDRUo7O0FEREk7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQ0dOOztBREZNO0VBQ0UsV0FBQTtBQ0lSOztBRENBO0VBQ0UsU0FBQTtBQ0VGOztBREFBO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUNHRjs7QURBQTtFQUNFLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUNHRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2Jvb2tpbmcvY3JlYXRlLWJvb2tpbmcvY3JlYXRlLWJvb2tpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVwbG9hZC1idG4td3JhcHBlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4udXBsb2FkLWJ0biB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIHBhZGRpbmc6IDhweCAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDQycHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGhlaWdodDogNDJweDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxufVxyXG5cclxuLnVwbG9hZC1idG4td3JhcHBlciBpbnB1dFt0eXBlPVwiZmlsZVwiXSB7XHJcbiAgZm9udC1zaXplOiAxMDBweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbiAgb3BhY2l0eTogMDtcclxuICB6LWluZGV4OiA5OTtcclxufVxyXG5cclxuLnByb2R1Y3QtY29sb3ItbmFtZSB7XHJcbiAgbWF4LXdpZHRoOiAyMDBweDtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbn1cclxuXHJcbi5jb2xvci1zZWxlY3RlZCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLmNvbG9yLWNvZGUge1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgbWluLXdpZHRoOiA0MHB4O1xyXG59XHJcblxyXG4uaW5wdXQtYm9yZGVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5pb24tc2VsZWN0IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgbWFyZ2luLXRvcDogMTJweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcclxuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xyXG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcclxuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xyXG59XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcm9kdWN0LXNlYXJjaC13cmFwIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgaW9uLXNlYXJjaGJhciB7XHJcbiAgICB3aWR0aDogMzAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4vKiB3aWR0aCAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogNXB4O1xyXG59XHJcblxyXG4vKiBUcmFjayAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kOiAjZjFmMWYxO1xyXG59XHJcblxyXG4vKiBIYW5kbGUgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogIzg4ODtcclxufVxyXG5cclxuLyogSGFuZGxlIG9uIGhvdmVyICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6ICM1NTU7XHJcbn1cclxuXHJcbi5maWx0ZXJzLWNvbCB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLmxpc3QtaGVhZGVyIHtcclxuICBwb3NpdGlvbjogc3RhdGljO1xyXG4gIG1hcmdpbjogMzZweCBhdXRvO1xyXG59XHJcblxyXG4ubGlzdC1jb250YWluZXIge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuaW9uLWNvbC5pbWcge1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbmlvbi1jb2wuYWN0aW9uIHtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgbWF4LXdpZHRoOiAyMDBweDtcclxufVxyXG5pb24tY29sLnJlb3JkZXIge1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmluZm8tdHh0IHtcclxuICBjb2xvcjogcmVkO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLm0tbC01LXAge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLndpZGdldC10eXBlIHtcclxuICBjb2xvcjogIzk5OTtcclxuICBtYXJnaW4tbGVmdDogMTJweDtcclxufVxyXG4uc2VjdGlvbiB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTBweDtcclxufVxyXG4uc2VjdGlvbkJsb2NrIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB3aWR0aDogMTAwMHB4O1xyXG59XHJcbi5jcm9wIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxufVxyXG5cclxuLnBhZGRpbmctc3RhcnQtMTYge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMTZweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4jc2Nyb2xsMSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgwdmg7XHJcbn1cclxuXHJcbiNzY3JvbGwxOmhvdmVyIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDc1dmg7XHJcbn1cclxuXHJcbiNzY3JvbGwyOmhvdmVyIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAjc2Nyb2xsMSB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG4gICNzY3JvbGwyIHtcclxuICAgIGhlaWdodDogODd2aDtcclxuICB9XHJcbn1cclxuXHJcbi5zdGF0dXNMaXN0IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcCB7XHJcbiAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbi5ncm91cElucHV0IHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ncm91cFNlbGVjdCB7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG59XHJcblxyXG4udmFyaWFudEltYWdlU2VsZWN0IHtcclxuICBib3JkZXI6IDFweCBzb2xpZDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDEycHg7XHJcbn1cclxuXHJcbi5ncm91cERpc3BsYXkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XHJcbn1cclxuXHJcbi52YXJpYW50R3JvdXBzIHtcclxuICBtYXJnaW4tdG9wOiAwcHggIWltcG9ydGFudDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yZW1vdmUtaWNvbiB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi5zZWxlY3Qtd3JhcCB7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi50YWJsZUFyZWEge1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgLy8gYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgdGFibGUge1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIHRkLFxyXG4gICAgdGgge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgIH1cclxuICAgIHRyOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcclxuICAgIH1cclxuICB9XHJcbiAgLmhlYWRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XHJcbiAgfVxyXG4gIC5kZWxldGVJY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcbn1cclxuLmZsZXhKdXN0aWZ5U3BhY2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5zY2hlZHVsZXNCb3gge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cclxuICAuZmlyc3RIYWxmIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGdhcDogOHB4O1xyXG4gIH1cclxuICAuc2xvdFdyYXBwZXIge1xyXG4gICAgLnNjaGVkdWxlTGlzdCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxuXHJcbiAgICAgIC5pbnB1dFdyYXBwZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuICAgICAgLnNsb3RJbnB1dCB7XHJcbiAgICAgICAgd2lkdGg6IDEyMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgICAgbWFyZ2luOiAwIDhweCA4cHggOHB4O1xyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLnNlY29uZEhhbGYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5zbG90QnRuIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgaSB7XHJcbiAgICAgIGNvbG9yOiAjNGE0YTRhO1xyXG4gICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi5jb3B5TGlzdCB7XHJcbiAgYm9yZGVyOiAwO1xyXG59XHJcbi5zZWxlY3RJbnB1dCB7XHJcbiAgd2lkdGg6IDMwJTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi5yZWdpb25XcmFwIHtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufVxyXG4iLCIudXBsb2FkLWJ0bi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi51cGxvYWQtYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDQycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDQycHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xuICBmb250LXNpemU6IDEwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogOTk7XG59XG5cbi5wcm9kdWN0LWNvbG9yLW5hbWUge1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5jb2xvci1zZWxlY3RlZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jb2xvci1jb2RlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWluLXdpZHRoOiA0MHB4O1xufVxuXG4uaW5wdXQtYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1zZWxlY3Qge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2R1Y3Qtc2VhcmNoLXdyYXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ucHJvZHVjdC1zZWFyY2gtd3JhcCBpb24tc2VhcmNoYmFyIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLyogd2lkdGggKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogNXB4O1xufVxuXG4vKiBUcmFjayAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG59XG5cbi8qIEhhbmRsZSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICM4ODg7XG59XG5cbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG59XG5cbi5maWx0ZXJzLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogc3RhdGljO1xuICBtYXJnaW46IDM2cHggYXV0bztcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5pb24tY29sLmltZyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDAwcHgpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xufVxuXG5pb24tY29sLnJlb3JkZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmluZm8tdHh0IHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm0tbC01LXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53aWRnZXQtdHlwZSB7XG4gIGNvbG9yOiAjOTk5O1xuICBtYXJnaW4tbGVmdDogMTJweDtcbn1cblxuLnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5zZWN0aW9uQmxvY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAwcHg7XG59XG5cbi5jcm9wIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDIwMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnBhZGRpbmctc3RhcnQtMTYge1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHggIWltcG9ydGFudDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgwdmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG5cbiAgI3Njcm9sbDIge1xuICAgIGhlaWdodDogODd2aDtcbiAgfVxufVxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmdyb3VwSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5ncm91cFNlbGVjdCB7XG4gIHdpZHRoOiAxNTBweDtcbn1cblxuLnZhcmlhbnRJbWFnZVNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmdyb3VwRGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xufVxuXG4udmFyaWFudEdyb3VwcyB7XG4gIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5yZW1vdmUtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5zZWxlY3Qtd3JhcCB7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4udGFibGVBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweDtcbn1cbi50YWJsZUFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuLnRhYmxlQXJlYSAuZGVsZXRlSWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmZsZXhKdXN0aWZ5U3BhY2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5zY2hlZHVsZXNCb3gge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5zY2hlZHVsZXNCb3ggLmZpcnN0SGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogOHB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdFdyYXBwZXIgLnNjaGVkdWxlTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLmlucHV0V3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zY2hlZHVsZXNCb3ggLnNsb3RXcmFwcGVyIC5zY2hlZHVsZUxpc3QgLnNsb3RJbnB1dCB7XG4gIHdpZHRoOiAxMjBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBtYXJnaW46IDAgOHB4IDhweCA4cHg7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90V3JhcHBlciAuc2NoZWR1bGVMaXN0IC5zbG90SW5wdXQ6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xufVxuLnNjaGVkdWxlc0JveCAuc2Vjb25kSGFsZiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIHtcbiAgY29sb3I6ICMwMDA7XG59XG4uc2NoZWR1bGVzQm94IC5zbG90QnRuIGkge1xuICBjb2xvcjogIzRhNGE0YTtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLnNjaGVkdWxlc0JveCAuc2xvdEJ0biBpOmhvdmVyIHtcbiAgY29sb3I6ICMwMDA7XG59XG5cbi5jb3B5TGlzdCB7XG4gIGJvcmRlcjogMDtcbn1cblxuLnNlbGVjdElucHV0IHtcbiAgd2lkdGg6IDMwJTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4ucmVnaW9uV3JhcCB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/booking/create-booking/create-booking.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/booking/create-booking/create-booking.page.ts ***!
  \*********************************************************************/
/*! exports provided: CreateBookingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateBookingPage", function() { return CreateBookingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/booking/booking.service */ "./src/app/services/booking/booking.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_admin_admin_shop_new_product_product_section_product_section_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/admin/admin-shop/new-product/product-section/product-section.page */ "./src/app/admin/admin-shop/new-product/product-section/product-section.page.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../users-modal/users-modal.page */ "./src/app/admin/users-modal/users-modal.page.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/multi-region/multi-region.service */ "./src/app/services/multi-region/multi-region.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");



// import { CameraOptions } from '@ionic-native/camera/ngx';















let CreateBookingPage = class CreateBookingPage {
    constructor(route, events, alertController, router, loadingController, platform, modalController, storage, bookingService, configService, angularFirestore, _location, vendorService, multiRegionService, sharedService, categoryService) {
        this.route = route;
        this.events = events;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalController = modalController;
        this.storage = storage;
        this.bookingService = bookingService;
        this.configService = configService;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.vendorService = vendorService;
        this.multiRegionService = multiRegionService;
        this.sharedService = sharedService;
        this.categoryService = categoryService;
        // Booking Object Start
        this.booking = {
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
            // productQty: '',
            // stopWhenNoQty: false,
            coverPic: {
                imageId: '',
                mob: '',
                thumb: '',
                url: ''
            },
            // minQty: null,
            // maxQty: null,
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
            scheduleData: {
                maxDays: null,
                active: true,
                isPredefined: false,
                duration: {
                    months: null,
                    days: null,
                    hours: null,
                    minutes: null,
                },
                schedules: [],
            },
            allowPayment: false,
            allRegions: {
                active: false,
                regions: []
            },
            templateId: '',
            productType: 'booking',
            allowAddress: false,
            slug: {
                name: null,
                updatedAt: new Date(),
                updatedBy: 'admin'
            },
            additionalInfo: {
                customInput: {
                    active: false,
                    label: "",
                    required: false
                }
            },
            vendorId: ""
        };
        // Booking Object End
        // optionsForCamera: CameraOptions;
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
        // currentVariants: any = {} // check this again
        this.needToUpdateImages = false;
        // For Booking
        this.slotValid = true;
        // For Booking
        this.isUniversal = false;
        this.subOfSubCategories = {};
        this.subOfSubCategoryToggle = {};
        this.multiVendor = false;
        this.vendors = [];
        this.customActionSheetOptions = {
            // header: 'Copy',
            subHeader: 'COPY ITEMS TO...',
        };
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
                    this.booking['approved'] = true;
                    this.booking.status = true;
                }
                else {
                    this.booking['approved'] = false;
                    this.booking.status = false;
                }
            }
            this.imagesLimit = this.configService.environment.productImageLimit;
            this.events.publish('booking:getAllCategories');
            this.events.publish('brands:getAllBrandsForAdmin');
            this.events.publish('variants:getVariantsTypeData');
            this.devWidth = this.platform.width();
            if (this.editProductId) {
                this.events.publish('booking:getProductWithId', this.editProductId);
                this.events.publish('booking:getAllSubCategories');
                this.getSections();
            }
            this.taxType = this.configService.environment.taxType;
            this.subscriptionFeature = this.configService.environment.subscriptionFeature;
            this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
            this.multiRegion = this.configService.environment.multiRegion;
            this.multiVendor = this.configService.environment.multiVendor;
            if (this.multiRegion) {
                this.events.publish('multi-region:getActiveStatus');
                this.events.publish('multi-region:getAllActiveRegions');
                this.multiRegionData = yield this.multiRegionService.getAllActiveRegions('service');
                console.log('multiRegionData:', this.multiRegionData);
                // Creating and Updating Region
                if (this.booking.allRegions.regions.length == 0) {
                    this.createDefaultRegion();
                }
                else {
                    this.updateRegion();
                }
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
            // 'Cash on Delivery',
            // 'Extra Charges',
            // 'Subscription',
            // 'Limited Time Deal',
            // 'Specific User Discount',
            'Seo for Website', "Vendor", 'Add Ons', 'Slug Name', 'Custom Input', 'Regions');
            if (this.booking.scheduleData.schedules && this.booking.scheduleData.schedules.length == 0) {
                this.booking.scheduleData.schedules = [
                    { day: 'Monday', active: false, schedule: [] },
                    { day: 'Tuesday', active: false, schedule: [] },
                    { day: 'Wednesday', active: false, schedule: [] },
                    { day: 'Thursday', active: false, schedule: [] },
                    { day: 'Friday', active: false, schedule: [] },
                    { day: 'Saturday', active: false, schedule: [] },
                    { day: 'Sunday', active: false, schedule: [] }
                ];
            }
        });
    }
    createDefaultRegion() {
        console.log("loopStart");
        for (let region of this.multiRegionData) {
            this.booking.allRegions.regions.push(this.returnRegionObj(region));
        }
    }
    returnRegionObj(region) {
        return {
            name: region.name,
            id: region.id,
            active: false,
            price: null,
            discountedPrice: null,
        };
    }
    updateRegion() {
        // * Check if new region added
        let newRegions = this.multiRegionData.filter(newRegion => !this.booking.allRegions.regions.find(region => newRegion.id == region.id));
        // * Check if any region deleted
        let removeRegions = this.booking.allRegions.regions.filter(oldRegion => !this.multiRegionData.find(region2 => oldRegion.id == region2.id));
        // * Add new region if any update
        if (newRegions.length > 0) {
            console.log('new region:', newRegions);
            for (let newRegion of newRegions) {
                this.booking.allRegions.regions.push(this.returnRegionObj(newRegion));
            }
        }
        // * Delete region if any removed
        if (removeRegions.length > 0) {
            console.log('update region:', removeRegions);
            for (let region of removeRegions) {
                let index = this.booking.allRegions.regions.findIndex(oldRegion => oldRegion.id == region.id);
                console.log('name:', index);
                this.booking.allRegions.regions.splice(index, 1);
            }
        }
    }
    toggleRegion(index) {
        this.booking.allRegions.regions[index].active = !this.booking.allRegions.regions[index].active;
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('booking:publishgetProductWithId', (data) => {
                data = this.getUpdatedFields(data);
                this.booking = data;
                if (!this.booking.deal.specificUsers) {
                    this.booking.deal.specificUsers = this.booking.deal.specificUsers;
                }
                // console.log('this.currentVariants outside loop', this.currentVariants)
            });
            this.events.subscribe('booking:addSuccess', (heading, desc) => {
                this.loader.dismiss();
                this.presentAlert(heading, desc, true);
                this.booking.prodName = null;
                this.booking.prodDesc = null;
                this.booking.prodPrice = null;
                this.listOfBase64Image = [];
                this.selectedCategories = [];
                this.selectedBrands = [];
            });
            this.events.subscribe('booking:addFailure', (heading, desc) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('booking:editSuccess', (heading, desc) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (this.loader) {
                    this.loader.dismiss();
                }
                yield this.presentAlert(heading, desc, true);
            }));
            this.events.subscribe('booking:editFailure', (heading, desc) => {
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
            this.events.subscribe('booking:deleteSuccess', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this._location.back();
            });
            this.events.subscribe('booking:deleteFailure', (heading, msg) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.presentAlert(heading, msg);
            });
            this.events.subscribe('booking:publishAllCategoriesForAdmin', (categories) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                // console.log('categories:', categories);
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
            this.events.subscribe('booking:noCategoryAvailable', () => {
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
                this.booking = option;
                if (!this.booking.deal.specificUsers) {
                    this.booking.deal.specificUsers = this.booking.deal.specificUsers;
                }
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
            let res = yield this.bookingService.getTemplates();
            if (res) {
                this.templatesArray = res;
                console.log(this.templatesArray);
            }
        });
    }
    changeTemplate(value) {
        console.log(value);
        this.booking.templateId = value;
    }
    editShowDisable() {
        if (this.userRole == 'vendor') {
            if (this.booking.approved) {
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
    openUsersModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let alreadyAdded;
            alreadyAdded = this.booking.deal.specificUsers.users ? this.booking.deal.specificUsers.users : [];
            const modal = yield this.modalController.create({
                component: _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_13__["UsersModalPage"],
                componentProps: {
                    alreadyAddedUsers: alreadyAdded
                },
                cssClass: 'coupon-code-modal'
            });
            modal.onDidDismiss().then(res => {
                if (res && res.data) {
                    console.log('res.data', res.data);
                    if (this.booking) {
                        this.booking.deal.specificUsers.users = res.data;
                    }
                    else {
                        this.booking.deal.specificUsers.users = res.data;
                    }
                }
                console.log('this.booking.deal.specificUsers:', this.booking.deal.specificUsers.users);
            });
            yield modal.present();
        });
    }
    removeUser(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.booking.deal.specificUsers.users.splice(i, 1);
        });
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
    saveBooking() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.booking.deal.specificUsers.active) {
                for (const user of this.booking.deal.specificUsers.users) {
                    if (user.discount == null) {
                        this.presentAlert('', `Discount field cannot be empty for ${user.name} under UserList in Advance Tab`);
                        return;
                    }
                    else if (user.discount < 0 || user.discount > 100) {
                        this.presentAlert('', `Please provide a valid Discount field for ${user.name} under UserList in Advance Tab`);
                        return;
                    }
                }
            }
            this.coverValue = true;
            if (this.booking.coverPic && !this.booking.coverPic.url) {
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
            if (this.booking.discountedPrice === null) {
                this.booking.discountedPrice = this.booking.prodPrice;
            }
            this.booking.discount = parseFloat((((this.booking.prodPrice - this.booking.discountedPrice) / this.booking.prodPrice) * 100).toFixed(2));
            if (this.booking.productCode != '') {
                let prodCode = yield this.bookingService.checkProductSKU(this.booking.productCode, this.editProductId);
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
                        this.presentAlert('', `Please enter a unique Service Code - Matching service are :- ${matchingProds}`);
                        return;
                    }
                }
            }
            if (this.booking.scheduleData.schedules) {
                yield this.slotValidation();
            }
            if (this.booking.prodName === null || this.booking.prodName === '') {
                this.presentAlert('', 'Please enter service name');
            }
            else if (!this.booking.prodPrice && this.booking.prodPrice !== 0) {
                this.presentAlert('', 'Please enter service price');
            }
            else if (this.booking.productCode === null || this.booking.productCode === '') {
                this.presentAlert('', 'Please enter service Code');
            }
            else if (this.booking.prodDesc === null || this.booking.prodDesc === '') {
                this.presentAlert('', 'Please enter service description');
            }
            else if (!(this.booking.categories && this.booking.categories.length) && !(this.booking.brands && this.booking.brands.length)) {
                this.presentAlert('', 'Please select any category or brand');
            }
            else if (this.coverValue === false) {
                this.presentAlert('', 'Please make any one image as cover picture');
            }
            else if (this.booking.gst && this.booking.gst > 100) {
                this.presentAlert('', `${this.taxType} value must be less than 100`);
            }
            else if (!this.durationValidation()) {
                this.presentAlert('', 'Please fill all details of duration !');
            }
            else if (!this.slotValid) {
                this.presentAlert('', 'Please fill all details of slot !');
            }
            else {
                this.booking.createdAt = new Date();
                this.booking.updatedAt = new Date();
                this.booking.sortedAt = new Date();
                this.booking.nameToSearch = this.booking.prodName.toLowerCase();
                // if (!this.booking.prodPrice) {
                //   this.booking.prodPrice = null;
                // }
                if (this.isUniversal && this.editProductId) {
                    const slugName = this.sharedService.createSlugName(this.booking.slug.name);
                    const sameSlugExists = yield this.sharedService.sameSlugExists('products', this.editProductId, slugName);
                    if (sameSlugExists) {
                        this.presentAlert('', 'Same slug already exists, please try with another slug name');
                        return;
                    }
                    else {
                        this.booking.slug = {
                            name: slugName,
                            updatedAt: new Date(),
                            updatedBy: 'admin'
                        };
                    }
                }
                yield this.presentLoading();
                if (this.userRole === 'vendor') {
                    this.booking.vendorId = yield this.storage.get('uid');
                }
                if (this.booking.vendorId) {
                    const vendorData = yield this.vendorService.getVendorName(this.booking.vendorId, 'service');
                    this.booking['vendorName'] = vendorData.name || vendorData.displayName || "";
                }
                if (this.editProductId) {
                    console.log('edit prod');
                    this.events.publish('booking:editProduct', this.booking, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
                }
                else {
                    console.log('new prod');
                    this.events.publish('booking:addProduct', this.booking, this.listOfBase64Image);
                }
            }
        });
    }
    updateNewProductStatus(status) {
        console.log('this.booking.approved:', this.booking.approved);
        if (this.userRole == 'vendor' && !this.booking.approved) {
            this.presentAlert('Alert', 'You cannot make this service active as it is not approved by Admin.');
            return;
        }
        if (status === true) {
            console.log('status=false');
            this.booking.status = false;
        }
        else {
            console.log('status=true');
            this.booking.status = true;
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
        const editImgData = this.booking.images[index];
        this.booking.coverPic = editImgData;
        for (let i = 0; this.listOfBase64Image.length; i++) {
            this.listOfBase64Image[i].cover = false;
        }
    }
    editProductCoverPicInList(index) {
        this.booking.coverPic = {
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
        let b = this.booking.images[event.detail.from];
        this.booking.images[event.detail.from] = this.booking.images[event.detail.to];
        this.booking.images[event.detail.to] = b;
        this.needToUpdateImages = true;
        event.detail.complete();
    }
    removeEditImageInData(index, url) {
        this.booking.images.splice(index, 1);
        if (url === this.booking.coverPic.url) {
            this.booking.coverPic = {
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
        this.router.navigate(['booking']);
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
        for (const img of this.booking.images) {
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
            this.events.publish('booking:deleteProduct', this.editProductId);
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
        if (this.booking.categories) {
            if (this.booking.categories.indexOf(cid) === -1) {
                this.booking.categories.push(cid);
            }
            else {
                const cidIndex = this.booking.categories.indexOf(cid);
                this.booking.categories.splice(cidIndex, 1);
            }
        }
        else {
            this.booking.categories = [];
            this.booking.categories.push(cid);
        }
    }
    onClickBrandCheckBox(bid) {
        if (this.booking.brands) {
            if (this.booking.brands.indexOf(bid) === -1) {
                this.booking.brands.push(bid);
            }
            else {
                const bidIndex = this.booking.brands.indexOf(bid);
                this.booking.brands.splice(bidIndex, 1);
            }
        }
        else {
            this.booking.brands = [];
            this.booking.brands.push(bid);
        }
    }
    editCheckBoxValue(id) {
        if (this.booking.categories) {
            if (this.booking.categories.indexOf(id) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    editBrandCheckBoxValue(id) {
        if (this.booking.brands && this.booking.brands.length && this.booking.brands.indexOf(id) !== -1) {
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
        this.booking.allowPayment = !this.booking.allowPayment;
    }
    addSearchKeywords() {
        this.booking.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    removeKeyword(i) {
        this.booking.searchKeywords.splice(i, 1);
    }
    editProductAddSearchKeywords() {
        this.booking.searchKeywords.push(this.keyword);
        this.keyword = '';
    }
    editProductRemoveKeyword(i) {
        this.booking.searchKeywords.splice(i, 1);
    }
    // stopOrderWhenNoQtyToggle() {
    //   this.booking.stopWhenNoQty = !this.booking.stopWhenNoQty;
    // }
    // editProductStopOrderWhenNoQtyToggle(status) {
    //   if (status) {
    //     this.booking.stopWhenNoQty = false;
    //   } else {
    //     this.booking.stopWhenNoQty = true;
    //   }
    // }
    getSubcategories(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.listOfSubcategories.hasOwnProperty(cid)) {
                let subcategories = [];
                subcategories = yield this.bookingService.getSubcategoriesInNewProduct(cid);
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
        if (this.booking.discountedPrice === this.booking.prodPrice) {
            this.booking.discountedPrice = null;
        }
    }
    onDrop(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
            //console.log(this.listOfBase64Image,this.booking)
            let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed';
            if (this.listOfBase64Image && !this.booking && (this.listOfBase64Image.length == this.imagesLimit)) {
                // console.log('here1', this.listOfBase64Image.length)
                this.presentAlert('Upload failed', message);
            }
            else if (this.booking && this.booking.images && (this.booking.images.length == this.imagesLimit)) {
                // console.log('here2')
                this.presentAlert('Upload failed', message);
            }
            else if (this.listOfBase64Image.length && this.booking && this.booking.images && (this.listOfBase64Image.length + this.booking.images.length == this.imagesLimit)) {
                // console.log('here3')
                this.presentAlert('Upload failed', message);
            }
            else {
                const modal = yield this.modalController.create({
                    component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_14__["ImageEditorComponent"],
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
    subIsAllowedToggle() {
        this.booking.subscription.isAllowed = !this.booking.subscription.isAllowed;
    }
    dealIsAllowedToggle() {
        this.booking.deal.isAllowed = !this.booking.deal.isAllowed;
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
    toggleCod() {
        this.booking.isCod = !this.booking.isCod;
    }
    toggleGstExclusive() {
        this.booking.gstExclusive = !this.booking.gstExclusive;
    }
    toggleExtraCharges() {
        this.booking.extraCharges.active = !this.booking.extraCharges.active;
    }
    toggleChargeQty() {
        this.booking.extraCharges.chargeAllQty = !this.booking.extraCharges.chargeAllQty;
    }
    toggleGstExclusiveEdit() {
        this.booking.gstExclusive = !this.booking.gstExclusive;
    }
    toggleChargeQtyEdit() {
        this.booking.extraCharges.chargeAllQty = !this.booking.extraCharges.chargeAllQty;
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
        if (!data.hasOwnProperty('deal')) {
            data['deal'] = this.booking.deal;
        }
        if (!data.hasOwnProperty('extraCharges')) {
            data['extraCharges'] = this.booking.extraCharges;
        }
        if (!data.hasOwnProperty('gstExclusive')) {
            data['gstExclusive'] = this.booking.gstExclusive;
        }
        if (!data.hasOwnProperty('isCod')) {
            data['isCod'] = this.booking.isCod;
        }
        if (!data.hasOwnProperty('additionalInfo')) {
            data['additionalInfo'] = this.booking.additionalInfo;
        }
        data["allRegions"] = "allRegions" in data ? data.allRegions : this.booking.allRegions;
        return data;
    }
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
    //             await this.bookingService.makeProductClones(clones, this.editProductId);
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
    // ? Schedule Functions Start
    selectDefaultSchedule() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            let response = yield this.bookingService.getAppointmentSettings();
            if (response) {
                this.booking.scheduleData.schedules = response['days'];
                this.booking.scheduleData.maxDays = response['maxDays'];
                this.loader.dismiss();
            }
            else {
                this.loader.dismiss();
                this.presentAlert('No default settings Found!');
            }
        });
    }
    // ? Toggle checkbox function for various input.
    toggleCheckbox(type) {
        // Schedule input toggle
        if (type == 'isSchedule') {
            this.booking.scheduleData.active = !this.booking.scheduleData.active;
        }
        // Schedule predefined input toggle
        if (type == 'predefinedSlot') {
            this.booking.scheduleData.isPredefined = !this.booking.scheduleData.isPredefined;
        }
        // Allow address input toggle
        if (type == 'allowAddress') {
            this.booking.allowAddress = !this.booking.allowAddress;
        }
        // Custom input toggle
        if (type == 'customInput') {
            this.booking.additionalInfo.customInput.active = !this.booking.additionalInfo.customInput.active;
        }
        // Custom input required toggle
        if (type == 'customInputRequired') {
            this.booking.additionalInfo.customInput.required = !this.booking.additionalInfo.customInput.required;
        }
        // Region Prices Toggle
        if (type == 'allRegions') {
            this.booking.allRegions.active = !this.booking.allRegions.active;
        }
    }
    // ? Toggle checkbox function for various
    changeSchedule(index) {
        this.booking.scheduleData.schedules[index].active = !this.booking.scheduleData.schedules[index].active;
    }
    addSlot(index) {
        this.booking.scheduleData.schedules[index].schedule.push({ start: null, end: null, slotLimit: null });
    }
    removeSlot(index, sIndex) {
        console.log(index, sIndex);
        this.booking.scheduleData.schedules[index].schedule.splice(sIndex, 1);
    }
    removeTimeSchedule(slotIndex, timeIndex) {
        this.booking.scheduleData.schedules[slotIndex].schedule.splice(timeIndex, 1);
    }
    getSelectOption(myIndex, indexArray) {
        for (let index of indexArray) {
            let slotData = JSON.parse(JSON.stringify(this.booking.scheduleData.schedules[myIndex].schedule));
            if (this.booking.scheduleData.schedules[index].schedule == 0) {
                this.booking.scheduleData.schedules[index].schedule = [...slotData];
            }
            else {
                this.booking.scheduleData.schedules[index].schedule.push(...slotData);
            }
        }
    }
    slotValidation() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            for (let scheduleArray of this.booking.scheduleData.schedules) {
                if (scheduleArray.schedule.length > 0) {
                    for (let schedule of scheduleArray.schedule) {
                        if (!schedule.start || !schedule.end || schedule.slotLimit === null) {
                            this.slotValid = false;
                            break;
                        }
                        else {
                            this.slotValid = true;
                        }
                    }
                }
                if (!this.slotValid) {
                    break;
                }
            }
            console.log('slotValid', this.slotValid);
        });
    }
    durationValidation() {
        if (this.booking.scheduleData.duration.months === null
            || this.booking.scheduleData.duration.days === null
            || this.booking.scheduleData.duration.hours === null
            || this.booking.scheduleData.duration.minutes === null) {
            // console.log('false');
            return false;
        }
        else {
            // console.log('true');
            return true;
        }
    }
    // ? Schedule Functions End
    // ? Vendors Start
    addVendor(e) {
        this.booking.vendorId = e.target.value;
    }
    // ? Vendors End
    removeSubscriptions() {
        this.events.unsubscribe('booking:addSuccess');
        this.events.unsubscribe('booking:addFailure');
        this.events.unsubscribe('booking:editSuccess');
        this.events.unsubscribe('booking:editFailure');
        this.events.unsubscribe('product-options:editSuccess');
        this.events.unsubscribe('product-options:editFailure');
        this.events.unsubscribe('booking:deleteSuccess');
        this.events.unsubscribe('booking:deleteFailure');
        this.events.unsubscribe('booking:publishAllCategoriesForAdmin');
        this.events.unsubscribe('booking:publishgetProductWithId');
        this.events.unsubscribe('product-options:publishOptionData');
        this.events.unsubscribe('product-options:deleteProductOptionSuccess');
        this.events.unsubscribe('brands:publishAllBrandsForAdmin');
        this.events.unsubscribe('brands:noBrandAvailableForAdmin');
        this.events.unsubscribe('booking:noCategoryAvailable');
        this.events.unsubscribe('vendor:getVendorNameSuccess');
    }
};
CreateBookingPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_6__["BookingService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestore"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] },
    { type: src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_15__["MultiRegionService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"] },
    { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__["CategoriesService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], CreateBookingPage.prototype, "content", void 0);
CreateBookingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-booking',
        template: __webpack_require__(/*! raw-loader!./create-booking.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/booking/create-booking/create-booking.page.html"),
        styles: [__webpack_require__(/*! ./create-booking.page.scss */ "./src/app/admin/booking/create-booking/create-booking.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
        src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_6__["BookingService"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestore"],
        _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"],
        src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_15__["MultiRegionService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"],
        src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_17__["CategoriesService"]])
], CreateBookingPage);



/***/ })

}]);
//# sourceMappingURL=admin-booking-create-booking-create-booking-module-es2015.js.map