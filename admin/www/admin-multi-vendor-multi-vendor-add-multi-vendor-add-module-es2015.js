(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-multi-vendor-multi-vendor-add-multi-vendor-add-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">{{vendorDetails.name}} (Vendor)\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Details</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button *ngIf=\"multipleVendorInvoices\">\r\n      <ion-label>Invoice Settings</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"loadProducts()\">\r\n      <ion-label>Products</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"loadOrders()\">\r\n      <ion-label>Orders</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"loadReports()\">\r\n      <ion-label>Reports</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-btn\">\r\n          <ion-button (click)=\"saveVendor()\"\r\n            shape=\"round\"\r\n            class=\"btn-1 i-start\"\r\n            color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save Details\r\n          </ion-button>\r\n        </div>\r\n        <ion-row>\r\n          <ion-col size=\"2\" id=\"scroll1\">\r\n            <div class=\"statusList\">\r\n              <div *ngIf=\"details.length\">\r\n                <p style=\"z-index: 1000\" *ngFor='let item of details; let idx=index'\r\n                  (click)=\"onClickStatustItem(idx,item)\"\r\n                  [ngStyle]=\"{'background-color': activeProjectIndex === idx ? 'var(--ion-color-categories-background)' : 'white' }\">\r\n                  {{item}}\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"10\">\r\n            <div class=\"main-container\" style=\"border-left: none;\">\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <ion-row *ngIf=\"buttonActive === 'Profile'\">\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>Display name of Vendor</ion-label>\r\n                        <ion-input class=\"form-input\"\r\n                          [(ngModel)]=\"vendorDetails.displayName\"></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"flex-space-between\" style=\"justify-content: space-evenly\">\r\n                        <div>\r\n                          <ion-label>Display Profile</ion-label>\r\n                        </div>\r\n                        <div class=\"upload-btn-wrapper\">\r\n                          <button [disabled]=\"vendorDetails.image.url\"\r\n                            class=\"upload-btn btn-1 i-start\"\r\n                            (click)=\"uploadImage($event.target.files)\"> <i\r\n                              class=\"flaticon-null-16\"></i>Upload Profile Image</button>\r\n                          <input [disabled]=\"vendorDetails.image.url\" type=\"file\" accept=\"image/*\" name=\"myfile\"\r\n                            (change)=\"uploadImage($event.target.files)\" />\r\n                        </div>\r\n                      </div>\r\n                      <br>\r\n                      <div class=\"img-container\">\r\n                        <div class=\"no-img\"\r\n                          *ngIf=\"!vendorDetails.image.url\">\r\n                          <p>No attached image</p>\r\n                        </div>\r\n                        <div *ngIf=\"vendorDetails && vendorDetails.image.url\">\r\n                          <div class=\"img-wrap\">\r\n                            <img class=\"category-img\"\r\n                              [src]=\"vendorDetails.image.url\" />\r\n                            <div class=\"overlay\">\r\n                              <ion-button class=\"btn-2 remove\"\r\n                                shape=\"round\"\r\n                                fill=\"clear\"\r\n                                color=\"danger\"\r\n                                (click)=\"removeImage()\">\r\n                                <ion-icon name=\"trash\"\r\n                                  slot=\"icon-only\"></ion-icon>\r\n                              </ion-button>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"input-wrap\">\r\n                        <div style=\"display: flex; justify-content: center\">\r\n                          <p>Show user details to vendor</p>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input color=\"primary\"\r\n                                type=\"checkbox\"\r\n                                [checked]=\"vendorDetails.showUserDetails\"\r\n                                (click)=\"showUserDetailsToVendor()\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>Description</ion-label>\r\n                        <ion-textarea class=\"form-input\" rows=\"6\" cols=\"20\"\r\n                          [(ngModel)]=\"vendorDetails.description\"></ion-textarea>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\" style=\"margin-top: 8px;\">\r\n                      <div\r\n                        *ngIf='vendorDetails && vendorDetails.vendorAddress && vendorDetails.vendorAddress.address'\r\n                        style=\"border: 1px solid lightgray;padding: 8px;\">\r\n                        <b>Current Address</b>\r\n                        <ion-button (click)=\"openAreaModal()\" style=\"margin-bottom: 5px; margin-left: 8px;\">\r\n                          Add Location of Vendor through Map\r\n                        </ion-button>\r\n                        <br><br>\r\n                        <ion-row>\r\n                          <ion-col size=\"2\">\r\n                            <p>Address:</p>\r\n                          </ion-col>\r\n                          <ion-col size=\"10\">\r\n                            <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"vendorDetails.vendorAddress.address.address\">\r\n                          </ion-input>\r\n                          </ion-col>\r\n\r\n                          <ion-col size=\"2\">\r\n                            <p>State:</p>\r\n                          </ion-col>\r\n                          <ion-col size=\"10\">\r\n                            <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"vendorDetails.vendorAddress.address.state\">\r\n                          </ion-input>\r\n                          </ion-col>\r\n\r\n                          <ion-col size=\"2\">\r\n                            <p>City:</p>\r\n                          </ion-col>\r\n                          <ion-col size=\"10\">\r\n                            <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"vendorDetails.vendorAddress.address.city\">\r\n                          </ion-input>\r\n                          </ion-col>\r\n\r\n                          <ion-col size=\"2\">\r\n                            <p>Pincode:</p>\r\n                          </ion-col>\r\n                          <ion-col size=\"10\">\r\n                            <ion-input class=\"form-input\" type=\"number\"\r\n                            [(ngModel)]=\"vendorDetails.vendorAddress.address.pincode\">\r\n                          </ion-input>\r\n                          </ion-col>\r\n                        </ion-row> \r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\" *ngIf=\"vendorDetails.qrCode\">\r\n                      <p>Vendor Profile QR Code</p>\r\n                      <div class=\"uploaded-doc-imgs\">\r\n                        <a (click)=\"openImg(vendorDetails.qrCode)\">\r\n                          <ion-img [src]=\"vendorDetails.qrCode\"></ion-img>\r\n                        </a>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                  <ion-row *ngIf=\"buttonActive === 'Region'\">\r\n                    <ion-col size=\"6\">\r\n                      <div class=\"data-field\" style=\"align-items: center; justify-content: start;\">\r\n                        <p>Region</p>\r\n                        <ion-row>\r\n                          <ion-col size=\"12\">\r\n                            <ion-select class=\"regionSelect\"\r\n                              *ngIf=\"regions && regionsAvailable\"\r\n                              (ionChange)=\"addRegion($event)\"\r\n                              placeholder=\"Select Region\"\r\n                              [disabled]=\"regionsAvailable && regionsAvailable.length == 0\">\r\n                              <ion-select-option [value]=\"region.id\"\r\n                                *ngFor=\"let region of regionsAvailable\">{{region.name}}\r\n                              </ion-select-option>\r\n                            </ion-select>\r\n                            <p class=\"m-l-5-p info-txt\"\r\n                              *ngIf=\"regionsAvailable && regionsAvailable.length == 0\">\r\n                              No regions\r\n                              available. Regions should be active and not assigned to\r\n                              any vendor</p>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\">\r\n                      <div class=\"data-field\" style=\"justify-content: space-evenly; align-items: center;\">\r\n                        <p>Current Region</p>\r\n                        <ion-row>\r\n                          <ion-col size=\"12\">\r\n                            <p>{{currentRegion}}</p>\r\n                            <button class=\"removeBtn\"\r\n                              (click)=\"removeRegion()\">Remove</button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                  <ion-row *ngIf=\"buttonActive === 'Categories & Brands'\">\r\n                    <ion-col size=\"12\">\r\n                      <div *ngIf=\"!showNoCategories\"\r\n                        style=\"padding-left: 10px; margin-left: 20px;\">\r\n                        <ion-text color=\"danger\">\r\n                          <p>Select Categories & Brands under which vendor can upload\r\n                            products.</p>\r\n                        </ion-text>\r\n                      </div>\r\n                      <div\r\n                        style=\"display: flex;flex-wrap: nowrap;flex-direction: row;align-content: center;justify-content: space-around;align-items: flex-start;margin-left: 20px; border-left: 1px solid #ccc;\">\r\n                        <div class=\"categories-container\">\r\n                          <div class=\"no-data\"\r\n                            *ngIf=\"showNoCategories\"\r\n                            text-center>\r\n                            <img src=\"assets/img/no-category.png\"\r\n                              alt=\"\">\r\n                            <h6>No categories</h6>\r\n                          </div>\r\n                          <!-- <div class=\"product-search-wrap\" *ngIf=\"!showNoCategories\">\r\n                            <ion-searchbar [(ngModel)]=\"searchCategory\" mode=\"ios\"></ion-searchbar>\r\n                          </div> -->\r\n                          <div class=\"categories-wrapper\"\r\n                            *ngIf=\"!showNoCategories\">\r\n                            <ion-list>\r\n                              <ion-list-header>\r\n                                <ion-label class=\"np-list-header\"\r\n                                  style=\"font-size: 16px;font-weight: bold;\">Categories\r\n                                </ion-label>\r\n                              </ion-list-header>\r\n                              <div *ngFor=\"let category of categories\">\r\n                                <div\r\n                                  style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                                  <ion-item\r\n                                    (click)=\"onClickCategoryCheckBox(category.id)\"\r\n                                    style=\"width: 100%;\">\r\n                                    <ion-label>{{category.name}}</ion-label>\r\n                                    <ion-checkbox color=\"primary\"\r\n                                      slot=\"start\"\r\n                                      [checked]=\"editCheckBoxValue(category.id)\">\r\n                                    </ion-checkbox>\r\n                                  </ion-item>\r\n                                  <div (click)=\"getSubcategories(category.id)\"\r\n                                    slot=\"end\"\r\n                                    style=\"z-index: 9999;margin-right: 3%;opacity: .8;\"\r\n                                    *ngIf=\"category.isSubcategories\">\r\n                                    <i class=\"flaticon-null-13\"\r\n                                      *ngIf=\"(listOfSubcategoriesInView.hasOwnProperty(category.id) && !listOfSubcategoriesInView[category.id].active) || !listOfSubcategoriesInView.hasOwnProperty(category.id)\"></i>\r\n                                    <i class=\"flaticon-null-14\"\r\n                                      *ngIf=\"listOfSubcategoriesInView.hasOwnProperty(category.id) && listOfSubcategoriesInView[category.id].active\"></i>\r\n                                  </div>\r\n                                </div>\r\n                                <div\r\n                                  *ngIf=\"(listOfSubcategories[category.id] && listOfSubcategories[category.id].length) && listOfSubcategoriesInView[category.id].active\"\r\n                                  style=\"margin-left: 10%;\">\r\n                                  <ng-container *ngFor=\"let subCat of listOfSubcategories[category.id]\">\r\n                                    <div style=\"display: flex;justify-content: space-between;align-items: center;\">\r\n                                      <ion-item (click)=\"onClickCategoryCheckBox(subCat.id)\" style=\"width: 100%;\">\r\n                                        <ion-label>{{subCat.name}}</ion-label>\r\n                                        <ion-checkbox color=\"primary\" slot=\"start\"[checked]=\"editCheckBoxValue(subCat.id)\"></ion-checkbox>\r\n                                      </ion-item>\r\n                                      <!-- Sub-SubCategory Start -->\r\n                                      <div (click)=\"getSubOfSubCategories(category.id, subCat.id)\" slot=\"end\"\r\n                                        style=\"z-index: 9999;margin-right: 3%;opacity: .8;\" *ngIf=\"subCat.isSubcategories\">\r\n                                        <i class=\"flaticon-null-13\" *ngIf=\"!subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                                        <i class=\"flaticon-null-14\" *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active\"></i>\r\n                                      </div>\r\n                                    </div>\r\n                                    <ng-container *ngIf=\"subOfSubCategoryToggle[subCat.id]?.active && subOfSubCategories[subCat.id].length\">\r\n                                      <div style=\"margin-left: 10%;\">\r\n                                        <ng-container *ngFor=\"let subSubCat of subOfSubCategories[subCat.id]\">\r\n                                          <ion-item (click)=\"onClickCategoryCheckBox(subSubCat.id)\">\r\n                                            <ion-label>{{subSubCat.name}}</ion-label>\r\n                                            <ion-checkbox color=\"primary\" slot=\"start\" [checked]=\"editCheckBoxValue(subSubCat.id)\"></ion-checkbox>\r\n                                          </ion-item>\r\n                                        </ng-container>\r\n                                      </div>\r\n                                    </ng-container>\r\n                                    <!-- Sub-SubCategory End -->\r\n                                  </ng-container>\r\n                                </div>\r\n                              </div>\r\n                            </ion-list>\r\n                          </div>\r\n        \r\n                        </div>\r\n                        <div class=\"brands-container\">\r\n                          <!-- <div class=\"product-search-wrap\" *ngIf=\"!showNoBrands\">\r\n                            <ion-searchbar [(ngModel)]=\"searchBrand\" mode=\"ios\"></ion-searchbar>\r\n                          </div> -->\r\n                          <ion-list *ngIf=\"!showNoBrands && brands.length\">\r\n                            <ion-list-header>\r\n                              <ion-label class=\"np-list-header\"\r\n                                style=\"font-size: 16px;font-weight: bold;\">Brands\r\n                              </ion-label>\r\n                            </ion-list-header>\r\n                            <div *ngFor=\"let brand of brands\">\r\n                              <ion-item (click)=\"onClickBrandCheckBox(brand.id)\"\r\n                                style=\"width: 100%;\">\r\n                                <ion-label>{{brand.name}}</ion-label>\r\n                                <ion-checkbox color=\"primary\"\r\n                                  slot=\"start\"\r\n                                  [checked]=\"editBrandCheckBoxValue(brand.id)\">\r\n                                </ion-checkbox>\r\n                              </ion-item>\r\n                            </div>\r\n                          </ion-list>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                  <div *ngIf=\"buttonActive === 'Settings'\">\r\n                    <ion-row>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"data-field\" style=\"justify-content: flex-start;\">\r\n                          <p>Active</p>\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\"\r\n                                *ngIf=\"receivedVendorData\"\r\n                                (click)=\"toggleActive()\"\r\n                                [checked]=\"receivedVendorData.active\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"data-field\" style=\"justify-content: flex-start; align-items: center\">\r\n                          <p>Copy products of this vendor</p>\r\n                          <ion-row>\r\n                            <ion-col size=\"12\">\r\n                              <button class=\"removeBtn\"\r\n                                (click)=\"copyProducts()\">Select Products</button>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                  \r\n                      <!-- <ion-col size=\"12\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Address</ion-label>\r\n                          <ion-textarea type=\"text\" class=\"form-input\" [(ngModel)]=\"vendorDetails.address\"></ion-textarea>\r\n                        </div>\r\n                      </ion-col> -->\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <div style=\"display: flex\">\r\n                            <ion-label>Auto approve all products added by vendor</ion-label>\r\n                            <ion-toggle\r\n                              [(ngModel)]=\"vendorDetails.approveAllProducts\">\r\n                            </ion-toggle>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <div style=\"display: flex\">\r\n                            <ion-label>Max products vendor can add\r\n                            </ion-label>\r\n                            <input type=\"number\"\r\n                              [(ngModel)]=\"vendorDetails.productLimit\"\r\n                              style=\"width: 150px;text-align: center; margin-left: 5px;\" />\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <div style=\"display: flex\">\r\n                            <ion-label>Max no of appoiments allowed for vendor\r\n                            </ion-label>\r\n                            <input type=\"number\"\r\n                              [(ngModel)]=\"vendorDetails.appointmentSlotLimit\"\r\n                              style=\"width: 150px;text-align: center; margin-left: 6px;\" />\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <div style=\"display: flex\">\r\n                            <ion-label>Minimum Order Amount\r\n                            </ion-label>\r\n                            <input type=\"number\"\r\n                              [(ngModel)]=\"vendorDetails.minOrderAmount\"\r\n                              style=\"width: 150px;text-align: center; margin-left: 6px;\" />\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <div style=\"display: flex\">\r\n                            <ion-label>Vendor Exclusive</ion-label>\r\n                            <ion-toggle [(ngModel)]=\"vendorDetails.isExclusive\">\r\n                            </ion-toggle>\r\n                          </div>\r\n                        </div>\r\n                        <ion-text color=\"danger\">\r\n                          <p>Note: This feature will allow order from only one vendor\r\n                          </p>\r\n                        </ion-text>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Delivery Integration Pickup Id</ion-label>\r\n                          <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"vendorDetails.deliveryIntegration.pickupId\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngIf=\"isUniversal\">\r\n                      <ion-col>\r\n                        <div class=\"input-wrap\">\r\n                        <ion-label>Slug Name <ion-text color=\"danger\">(<b class=\"cursor-p\" \r\n                          (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug Instructions)</ion-text>\r\n                        </ion-label>\r\n                         <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='slug.name'></ion-input>\r\n                      </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Invoice Settings -->\r\n    <super-tab *ngIf=\"multipleVendorInvoices\">\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-row>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Billing Name</ion-label>\r\n                <ion-input class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.billingName\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Billing Address</ion-label>\r\n                <ion-input class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.address\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Telephone Number</ion-label>\r\n                <ion-input class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.phoneNo\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>GST Number</ion-label>\r\n                <ion-input class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.gstNo\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>PAN Number</ion-label>\r\n                <ion-input class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.panNo\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Custom Message In Invoice</ion-label>\r\n                <ion-textarea rows=\"4\"\r\n                  type=\"text\"\r\n                  class=\"form-input\"\r\n                  [(ngModel)]=\"invoiceSettings.customMessage\"></ion-textarea>\r\n              </div>\r\n            </ion-col>\r\n\r\n            <ion-col size=\"12\">\r\n              <div class=\"data-field\">\r\n                <p>Show admin logo on invoice</p>\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\"\r\n                      (click)=\"showAdminLogoToggle()\"\r\n                      [checked]=\"invoiceSettings.logo.adminLogo\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </ion-col>\r\n\r\n            <ion-col size=\"12\" [hidden]=\"invoiceSettings.logo.adminLogo\">\r\n              <div class=\"justify-content\">\r\n                <p>Logo (for Invoice) (Max Size: 200px by 200px)\r\n                  <ion-text color=\"danger\">\r\n                    <p>Only image files are allowed</p>\r\n                  </ion-text>\r\n                </p>\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <button *ngIf=\"!invoiceSettings.logo.url\"\r\n                    class=\"upload-btn btn-1 i-start\"> <i\r\n                      class=\"flaticon-null-16\"></i>Upload</button>\r\n                  <input *ngIf=\"!invoiceSettings.logo.url\"\r\n                    type=\"file\"\r\n                    name=\"myfile\"\r\n                    (change)=\"uploadInvoiceImg($event.target.files, 'logo')\"\r\n                    accept=\"image/*\" />\r\n                </div>\r\n                <ion-button (click)=\"removeImg('logo')\"\r\n                  fill=\"outline\"\r\n                  color=\"dark\"\r\n                  shape=\"round\"\r\n                  size=\"small\"\r\n                  *ngIf=\"invoiceSettings.logo.url\">\r\n                  Remove\r\n                </ion-button>\r\n              </div>\r\n              <div *ngIf=\"invoiceSettings.logo.url\"\r\n                class=\"ion-text-center\">\r\n                <img src=\"{{invoiceSettings.logo.url}}\"\r\n                  class=\"sign-img\">\r\n              </div>\r\n            </ion-col>\r\n\r\n            <ion-col>\r\n              <div class=\"justify-content\">\r\n                <p>Authorized Signatory (for Invoice) (Max Size: 200px by\r\n                  200px)<ion-text color=\"danger\">\r\n                    <p>Only image files are allowed</p>\r\n                  </ion-text>\r\n                </p>\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <button *ngIf=\"!invoiceSettings.signature\"\r\n                    class=\"upload-btn btn-1 i-start\"> <i\r\n                      class=\"flaticon-null-16\"></i>Upload</button>\r\n                  <input *ngIf=\"!invoiceSettings.signature\"\r\n                    type=\"file\"\r\n                    name=\"myfile\"\r\n                    (change)=\"uploadInvoiceImg($event.target.files,'sign')\"\r\n                    accept=\"image/*\" />\r\n                </div>\r\n                <!-- <ion-button (click)=\"openImageActionSheet('sign')\" fill=\"outline\" shape=\"round\" size=\"small\" *ngIf=\"!signature\">\r\n                  Upload\r\n                </ion-button> -->\r\n                <ion-button (click)=\"removeImg('sign')\"\r\n                  fill=\"outline\"\r\n                  color=\"dark\"\r\n                  shape=\"round\"\r\n                  size=\"small\"\r\n                  *ngIf=\"invoiceSettings.signature\">\r\n                  Remove\r\n                </ion-button>\r\n              </div>\r\n              <div *ngIf=\"invoiceSettings.signature\"\r\n                class=\"ion-text-center\">\r\n                <img src=\"{{invoiceSettings.signature}}\"\r\n                  class=\"sign-img\">\r\n              </div>\r\n            </ion-col>\r\n          </ion-row>\r\n        </div>\r\n        <ion-footer no-border\r\n          class=\"page-footer\">\r\n          <div class=\"main-container\">\r\n            <ion-button (click)=\"saveVendor()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save Invoice Settings\r\n            </ion-button>\r\n          </div>\r\n        </ion-footer>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Products Tab -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <div class=\"no-data\"\r\n            *ngIf=\"showNoProducts\"\r\n            text-center>\r\n            <img src=\"assets/img/no-product.png\"\r\n              alt=\"\">\r\n            <h6>No products</h6>\r\n          </div>\r\n          <!-- <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div> -->\r\n\r\n          <!-- heading -->\r\n\r\n          <div class=\"list-header\"\r\n            *ngIf=\"!showNoProducts\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\"\r\n                class=\"total-products\">\r\n                <ion-col size=\"4\"\r\n                  style=\"text-align: left;font-size: larger;text-decoration: underline;\">\r\n                  Total Products: {{productsData.length}}\r\n                </ion-col>\r\n                <ion-col size=\"8\">\r\n                  <div class=\"vertical-center\"\r\n                    style=\"margin-top: -20px;\">\r\n                    <!-- <b style=\"font-size: larger;\">Commission:</b> -->\r\n                    <ion-label>Set Single Commission For All Products(%):\r\n                    </ion-label>\r\n                    <ion-list class=\"commission-list\">\r\n                      <ion-radio-group [value]=\"commissionType\">\r\n                        <ion-item class=\"bs-links\"\r\n                          lines=\"none\">\r\n                          <!-- <ion-radio slot=\"start\" value=\"single\"></ion-radio> -->\r\n                          <ion-input type=\"number\"\r\n                            class=\"form-input\"\r\n                            style=\"width: 100px;\"\r\n                            [(ngModel)]=\"singleCommission\"></ion-input>\r\n                        </ion-item>\r\n                        <ion-item class=\"bs-links\"\r\n                          lines=\"none\">\r\n                          <ion-button (click)=\"setCommission()\"\r\n                            fill=\"outline\"\r\n                            shape=\"round\"\r\n                            size=\"small\">\r\n                            Set\r\n                          </ion-button>\r\n                          <!-- <ion-radio slot=\"start\" value=\"productWise\"></ion-radio>\r\n                          <ion-label>Product Wise</ion-label> -->\r\n                        </ion-item>\r\n                      </ion-radio-group>\r\n                    </ion-list>\r\n                  </div>\r\n                </ion-col>\r\n                <!-- <ion-col size=\"6\" style=\"text-align: end;\" *ngIf=\"totalProductsLoader\">\r\n            <ion-spinner name=\"dots\" style=\"width: 20px;\"></ion-spinner>\r\n          </ion-col> -->\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"name\">\r\n                  <p>Name</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Commission(%)</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Approved</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Edit</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- heading -->\r\n          <!-- product  list Start -->\r\n          <div class=\"list-container\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts\">\r\n            <!-- Search Bar -->\r\n            <ion-searchbar animated [(ngModel)]='searchProduct' placeholder=\"Search product...\" showCancelButton=\"focus\" mode=\"ios\"></ion-searchbar>\r\n\r\n            <ion-list class=\"categories-list\">\r\n              <ion-item class=\"ion-no-padding\"\r\n                no-lines\r\n                no-border\r\n                *ngFor=\"let item of productsData | filter: searchProduct; let i = index\">\r\n                <div class=\"detail-wrapper\">\r\n                  <div class=\"product-wrapper\">\r\n                    <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n\r\n                      <ion-row class=\"row-background ion-align-items-center\">\r\n                        <ion-col class=\"img\">\r\n                          <ion-thumbnail style=\"margin-left: 5%;\"\r\n                            class=\"product-img-wrapper\">\r\n                            <img class=\"loading\"\r\n                              *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                              src=\"{{item.coverPic.url}}\">\r\n                            <img class=\"loading\"\r\n                              *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                              src=\"{{item.coverPic.thumb}}\">\r\n                            <img *ngIf=\"!item.coverPic\"\r\n                              src=\"assets/img/placeholder-img.jpg\">\r\n                          </ion-thumbnail>\r\n                        </ion-col>\r\n                        <ion-col class=\"name\">\r\n                          <div\r\n                            [ngClass]=\"{'product-active': item.status, 'product-inactive': !item.status}\">\r\n                          </div>\r\n                          <p text-capitalize\r\n                            text-center>{{item.prodName}}</p>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <p *ngIf=\"!(item.priceList && item.priceList.length)\">\r\n                            {{item.prodPrice}}</p>\r\n                          <p *ngIf=\"(item.priceList && item.priceList.length)\">\r\n                            {{item.priceList[0].price}}</p>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <span>\r\n                            <ion-input type=\"number\"\r\n                              class=\"form-input\"\r\n                              [(ngModel)]=\"item.commission\"></ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"action\">\r\n                          <ion-toggle [(ngModel)]=\"item.approved\"></ion-toggle>\r\n                        </ion-col>\r\n                        <ion-col class=\"action\">\r\n                          <ion-button (click)=\"saveProduct(item, item.id)\"\r\n                            color=\"success\"\r\n                            fill=\"outline\"\r\n                            shape=\"round\"\r\n                            size=\"small\">\r\n                            Save\r\n                          </ion-button>\r\n                        </ion-col>\r\n                        <ion-col class=\"action\">\r\n                          <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editProduct(item)\">\r\n                            <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                          </ion-button>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                  <!-- <div class=\"variant-wrapper\" *ngIf=\"item.isPriceList\">\r\n              <ion-grid >\r\n                <ion-row *ngFor=\"let variant of item.priceList; let i=index\">\r\n                  <ion-col class=\"variant-title\"><div class=\"variant-title-text\">{{variant.weight}}</div></ion-col>\r\n                  <ion-col class=\"price\"><ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"variant.price\"></ion-input></ion-col>\r\n                  <ion-col class=\"price\"><ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"variant.price\"></ion-input></ion-col>\r\n                  <ion-col class=\"action\"></ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div> -->\r\n                </div>\r\n              </ion-item>\r\n            </ion-list>\r\n\r\n            <!-- <ion-grid *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts\">\r\n      <ion-row>\r\n        <ion-col style=\"text-align: start;\">\r\n          <ion-button (click)=\"loadPreviousProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noPreviousProducts\">\r\n            <span><i class=\"flaticon-null-8\"></i></span>Previous\r\n          </ion-button>\r\n        </ion-col>\r\n        <ion-col style=\"text-align: end;\">\r\n          <ion-button (click)=\"loadMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreProducts\">\r\n            Next <span><i class=\"flaticon-null-7\"></i></span>\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid> -->\r\n          </div>\r\n          <!-- product  list End-->\r\n          <ion-grid class=\"row-border ion-no-padding\"\r\n            *ngIf=\"productsData.length === 0 && !showNoProducts\">\r\n            <ion-row class=\"row-background\"\r\n              *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n              <ion-col size=\"5\">\r\n                <ion-thumbnail>\r\n                  <ion-skeleton-text style=\"margin: auto;\"></ion-skeleton-text>\r\n                </ion-thumbnail>\r\n              </ion-col>\r\n              <ion-col size=\"7\">\r\n                <h3>\r\n                  <ion-skeleton-text animated\r\n                    style=\"width: 90%;margin: auto;\"></ion-skeleton-text>\r\n                </h3>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <!-- Orders Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n\r\n          <div class=\"footerBtn\">\r\n            <ion-button (click)='checkProductToDeliver()'>\r\n              Check products to deliver\r\n            </ion-button>\r\n          </div>\r\n          \r\n            <div style=\"display: flex;align-items: center;\">\r\n              <select id=\"days\"\r\n                (change)=\"selectDate($event.target.value)\">\r\n                <option value=7\r\n                  selected>Last 7 days</option>\r\n                <option value=30>Last 30 days</option>\r\n              </select>&nbsp;&nbsp;\r\n              <p>OR</p>&nbsp;&nbsp;\r\n              <div\r\n                style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                <strong style=\"font-size: medium;\">From:</strong>&nbsp;<input\r\n                  type=\"date\"\r\n                  [(ngModel)]='startDate'\r\n                  style=\"width: 80%;\">\r\n              </div>&nbsp;&nbsp;\r\n              <div\r\n                style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                <strong style=\"font-size: medium;\">To:</strong>&nbsp;<input\r\n                  type=\"date\"\r\n                  [(ngModel)]='endDate'\r\n                  style=\"width: 80%;\">\r\n              </div>&nbsp;&nbsp;&nbsp;&nbsp;\r\n              <div class=\"footerBtn\">\r\n                <ion-button (click)='filterOrder()'\r\n                  style=\"margin: 0px;\">\r\n                  Filter Orders\r\n                </ion-button>&nbsp;&nbsp;\r\n                <ion-button (click)='clearFilter()'\r\n                  style=\"margin: 0px;\">\r\n                  Clear Dates\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"no-data\"\r\n              *ngIf=\"!orders.length && !vendorOrdersLoading; else showOrders\"\r\n              text-center>\r\n              <img src=\"assets/img/no-orders.png\"\r\n                alt=\"\">\r\n              <h6>No Orders</h6>\r\n            </div>\r\n            <ng-template #showOrders>\r\n              <div class=\"list-header\">\r\n                <ion-grid class=\"ion-no-padding\">\r\n                  <ion-row>\r\n                    <ion-col class=\"name\">\r\n                      <p>Customer</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"name\">\r\n                      <p>Products</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"name\">\r\n                      <p>Vendor Amount</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"id\">\r\n                      <p>Order ID</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"date\">\r\n                      <p>Date</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"status\">\r\n                      <p>Status</p>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </div>\r\n              <br>\r\n              <div class=\"list-container-orders\">\r\n                <div *ngIf=\"vendorOrdersLoading\" class=\"spinner\">\r\n                  <ion-spinner color=\"primary\"></ion-spinner>\r\n                </div>\r\n                <ng-container *ngIf=\"!vendorOrdersLoading\">\r\n                  <ion-grid>\r\n                    <ng-container *ngFor=\"let order of orders; let i=index\">\r\n                      <ion-row class=\"order-row\"\r\n                        *ngIf=\"order.details\"\r\n                        (click)=\"onClickViewOrder(order.details.orderId)\">\r\n                        <ion-col class=\"name\">\r\n                          {{order.details.userName}}\r\n                        </ion-col>\r\n                        <ion-col class=\"name\">\r\n                          <p *ngIf=\"order.products[0]\">{{order.products[0].name}}\r\n                            <span *ngIf=\"order.products.length > 1\">+\r\n                              {{order.products.length - 1}} more</span>\r\n                          </p>\r\n                        </ion-col>\r\n                        <ion-col class=\"name\">\r\n                          {{order.details.totalAmountToPaid}}\r\n                        </ion-col>\r\n                        <ion-col class=\"id\">\r\n                          <p>{{order.details.orderId}}</p>\r\n                        </ion-col>\r\n                        <ion-col class=\"date\">\r\n                          <p>{{order.order.createdAt.toDate() | date :'short'}}</p>\r\n                        </ion-col>\r\n                        <ion-col class=\"status\"\r\n                          [ngClass]=\"order.details.status\">\r\n                          <p>{{order.details.status}}</p>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ng-container>\r\n                    <br>\r\n                    <p><strong>Total order amount for vendor</strong>:\r\n                      {{totalOrderAmt.toFixed(2)}}</p>\r\n                    <br>\r\n                  </ion-grid>\r\n                </ng-container>\r\n              </div>\r\n  \r\n            </ng-template>\r\n          \r\n          <ion-infinite-scroll threshold=\"100px\"\r\n            (ionInfinite)=\"loadMoreOrders($event)\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\"\r\n              loadingText=\"Loading more orders...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <ion-item>\r\n                  <ion-label>Start Date</ion-label>\r\n                  <ion-datetime displayFormat=\"DD MM YYYY\"\r\n                    [max]=\"endDate\"\r\n                    placeholder=\"Select Date\"\r\n                    [(ngModel)]=\"startDate\"></ion-datetime>\r\n                </ion-item>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <ion-item>\r\n                  <ion-label>End Date</ion-label>\r\n                  <ion-datetime displayFormat=\"DD MM YYYY\"\r\n                    [min]=\"startDate\"\r\n                    placeholder=\"Select Date\"\r\n                    [(ngModel)]=\"endDate\"></ion-datetime>\r\n                </ion-item>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col style=\"text-align: center\">\r\n                <ion-button style=\"margin-right: 10px\"\r\n                  (click)=\"getReport()\">Generate Report</ion-button>\r\n                <ion-button color=\"tertiary\"\r\n                  (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngIf=\"reports.length\">\r\n              <ion-col size=\"6\"\r\n                class=\"ion-text-center\">\r\n                <h3>Total Price</h3>\r\n                <p>{{totalPrice | currency: currencyCode:true}}</p>\r\n              </ion-col>\r\n              <ion-col size=\"6\"\r\n                class=\"ion-text-center\">\r\n                <h3>Total Commission</h3>\r\n                <p>{{totalCommission | currency: currencyCode:true}}</p>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngIf=\"reports.length; else noData\">\r\n              <ion-col>\r\n                <div class=\"report-table\">\r\n                  <table>\r\n                    <thead>\r\n                      <tr>\r\n                        <th class=\"items\">Product</th>\r\n                        <th class=\"sales\">Sales</th>\r\n                        <th class=\"items\">No. of items Sold</th>\r\n                        <th class=\"items\">Total Commission</th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                      <ng-container *ngFor=\"let report of reports; let i=index\">\r\n                        <tr *ngFor=\"let product of report.products\">\r\n                          <td>{{product.name}}</td>\r\n                          <td>{{product.sales | currency: currencyCode:true}}\r\n                          </td>\r\n                          <td>{{product.quantity}}</td>\r\n                          <td>{{product.commission}}</td>\r\n                        </tr>\r\n                      </ng-container>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ng-template #noData>\r\n              <p class=\"t-a-c m-t-16\">No Data Available</p>\r\n            </ng-template>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.module.ts ***!
  \********************************************************************************/
/*! exports provided: MultiVendorAddPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiVendorAddPageModule", function() { return MultiVendorAddPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _multi_vendor_add_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multi-vendor-add.page */ "./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");











const routes = [
    {
        path: '',
        component: _multi_vendor_add_page__WEBPACK_IMPORTED_MODULE_6__["MultiVendorAddPage"]
    }
];
let MultiVendorAddPageModule = class MultiVendorAddPageModule {
};
MultiVendorAddPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_9__["SuperTabsModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_10__["Ng2SearchPipeModule"]
        ],
        declarations: [_multi_vendor_add_page__WEBPACK_IMPORTED_MODULE_6__["MultiVendorAddPage"]]
    })
], MultiVendorAddPageModule);



/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n  height: 100vh;\n}\n\n.toggle {\n  display: -webkit-box;\n  display: flex;\n  margin: 0% auto;\n}\n\n.data-field {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin: 0% auto;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\nion-item-divider {\n  margin-top: 0px;\n  min-height: 1px !important;\n  background: lightgray;\n  opacity: 50%;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.regionSelect {\n  border: 1px solid lightgray;\n  padding: 5px;\n}\n\n.removeBtn {\n  color: #f40d30;\n  padding: 5px;\n  margin-top: 5px;\n  border: 1px solid #f40d30;\n  background: white;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n  width: 150px;\n  margin-top: 8px;\n}\n\n.uploaded-doc-imgs {\n  width: 70px;\n  height: 70px;\n}\n\n.bs-links {\n  display: inline-block;\n}\n\n.list-container {\n  margin-top: unset;\n}\n\n.commission-list {\n  background: var(--ion-color-medium) !important;\n}\n\n.commission-list ion-item {\n  --background: var(--ion-color-medium)!important;\n}\n\n.commission-list ion-item ion-radio {\n  margin-right: 5px;\n}\n\n.list-header {\n  position: unset;\n  top: unset;\n}\n\nion-col.img, ion-col.qty {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.price {\n  width: 120px;\n  max-width: 120px;\n}\n\nion-col.name {\n  width: 350px;\n  max-width: 350px;\n  cursor: pointer;\n}\n\nion-col.action {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.action ion-button {\n  margin-right: 15px;\n}\n\nion-col.variant-title {\n  width: 450px;\n}\n\nion-col.variant-title .variant-title-text {\n  display: block;\n  text-align: right;\n  width: 100%;\n}\n\n.form-input {\n  margin-top: 0;\n}\n\n.product-img-wrapper {\n  position: relative;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n\n.form-input {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\nion-item.sc-ion-input-md-h:not(.item-label), ion-item:not(.item-label) .sc-ion-input-md-h {\n  --padding-start: 10px;\n}\n\n.add-btn {\n  margin-right: 20px;\n}\n\n.list-container-orders {\n  margin-top: 45px;\n}\n\n.list-container-orders ion-grid {\n  padding: 0;\n}\n\n.list-container-orders ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container-orders ion-grid ion-row ion-col {\n  padding: 16px 8px;\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.Pending {\n  color: black;\n}\n\n.Confirmed {\n  color: darkblue;\n}\n\n.Dispatched {\n  color: #9B870C;\n}\n\n.Delivered {\n  color: darkgreen;\n}\n\n.Cancelled, .Returned {\n  color: darkred;\n}\n\n.report-table table tbody td {\n  color: black;\n}\n\n.footerBtn {\n  text-align: center;\n}\n\n.footerBtn ion-button {\n  margin: 8px;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  text-transform: capitalize;\n  border-radius: 6px;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2 {\n    height: 92vh;\n  }\n}\n\n.main-btn {\n  padding: 16px;\n  background: #fff;\n  text-align: center;\n}\n\n.wrap-address {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 6px;\n}\n\n.wrap-address ion-input {\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbXVsdGktdmVuZG9yL211bHRpLXZlbmRvci1hZGQvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxtdWx0aS12ZW5kb3JcXG11bHRpLXZlbmRvci1hZGRcXG11bHRpLXZlbmRvci1hZGQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tdWx0aS12ZW5kb3IvbXVsdGktdmVuZG9yLWFkZC9tdWx0aS12ZW5kb3ItYWRkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGVBQUE7QUNDSjs7QURFRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSw2QkFBQTtFQUNBLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsNkJBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsNkJBQUE7QUNDSjs7QURFQTtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsNEJBQUE7RUFDQSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREVBO0VBQ0ksVUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDQ0o7O0FEQ0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0VKOztBRENBO0VBQ0UscUJBQUE7QUNFRjs7QURBQTtFQUVFLGlCQUFBO0FDRUY7O0FEQUE7RUFDRSw4Q0FBQTtBQ0dGOztBREZFO0VBQ0UsK0NBQUE7QUNJSjs7QURISTtFQUNFLGlCQUFBO0FDS047O0FEREE7RUFHRSxlQUFBO0VBQ0EsVUFBQTtBQ0VGOztBREFBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FDR0o7O0FEREU7RUFBYyxZQUFBO0VBQWEsZ0JBQUE7QUNNN0I7O0FETEU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDUUo7O0FETkU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNTSjs7QURSSTtFQUNFLGtCQUFBO0FDVU47O0FETkU7RUFBc0IsWUFBQTtBQ1V4Qjs7QURURTtFQUFvQixjQUFBO0VBQWUsaUJBQUE7RUFBa0IsV0FBQTtBQ2N2RDs7QURSRTtFQUFZLGFBQUE7QUNZZDs7QURYRTtFQUNFLGtCQUFBO0FDY0o7O0FEWkU7RUFDRSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtBQ2VKOztBRGJFO0VBQ0UscUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUNnQko7O0FEYkU7RUFBWSxpQkFBQTtFQUFrQixrQkFBQTtBQ2tCaEM7O0FEakJFO0VBQ0cscUJBQUE7QUNvQkw7O0FEbEJFO0VBQ0Usa0JBQUE7QUNxQko7O0FEakJBO0VBQ0UsZ0JBQUE7QUNvQkY7O0FEbkJFO0VBQ0UsVUFBQTtBQ3FCSjs7QURwQkk7RUFDRSxnREFBQTtBQ3NCTjs7QURyQk07RUFDRSxpQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0FDdUJSOztBRGxCQTtFQUNFLFlBQUE7QUNxQkY7O0FEbEJBO0VBQ0UsZUFBQTtBQ3FCRjs7QURsQkE7RUFDRSxjQUFBO0FDcUJGOztBRGxCQTtFQUNFLGdCQUFBO0FDcUJGOztBRGxCQTtFQUNFLGNBQUE7QUNxQkY7O0FEakJBO0VBQ0UsWUFBQTtBQ29CRjs7QURqQkE7RUFDRSxrQkFBQTtBQ29CRjs7QURuQkU7RUFDRSxXQUFBO0FDcUJKOztBRGpCQTtFQUNFLGtCQUFBO0FDb0JGOztBRG5CRTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FDcUJKOztBRGpCQTtFQUNFOztJQUVFLFlBQUE7RUNvQkY7QUFDRjs7QURqQkE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ21CSjs7QURoQkE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxrQkFBQTtBQ21CSjs7QURsQkk7RUFDRSxnQkFBQTtBQ29CTiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL211bHRpLXZlbmRvci9tdWx0aS12ZW5kb3ItYWRkL211bHRpLXZlbmRvci1hZGQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW57XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvO1xyXG4gICAgaGVpZ2h0OiAxMDB2aFxyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG4gIH1cclxuICBcclxuICAuZGF0YS1maWVsZHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW46IDAlIGF1dG87XHJcbiAgfVxyXG5cclxuLnRvZ2dsZVN1YntcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiAzMHZ3O1xyXG59XHJcblxyXG5pb24tdG9nZ2xle1xyXG4gICAgbWFyZ2luLXRvcDogLTEwcHhcclxufVxyXG5cclxuLml0ZW0taW5uZXJ7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbi5sYWJlbC1tZHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFweCFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24taXRlbS1kaXZpZGVye1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgbWluLWhlaWdodDogMXB4IWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICAgIG9wYWNpdHk6IDUwJVxyXG59XHJcblxyXG5pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5pdGVte1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLmJ1dHRvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuI2NhcmRCdG4xe1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuI2NhcmRCdG4ye1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA4MHB4XHJcbn1cclxuXHJcbi50YWJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xyXG4gICAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbi5mb3Jte1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHdpZHRoOiAyMHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5yZWdpb25TZWxlY3R7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiA1cHhcclxufVxyXG5cclxuLnJlbW92ZUJ0bntcclxuICAgIGNvbG9yOiAjZjQwZDMwO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2Y0MGQzMDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlXHJcbn1cclxuXHJcbi5pbmZvLXR4dCB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA4cHhcclxuICB9XHJcbiAgLnVwbG9hZGVkLWRvYy1pbWdze1xyXG4gICAgd2lkdGg6IDcwcHg7XHJcbiAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgfVxyXG4vLyBQcm9kdWN0cyBUYWJcclxuLmJzLWxpbmtze1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG4ubGlzdC1jb250YWluZXIge1xyXG4gIC8vIG1hcmdpbi10b3A6IDExMHB4O1xyXG4gIG1hcmdpbi10b3A6IHVuc2V0O1xyXG59XHJcbi5jb21taXNzaW9uLWxpc3R7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkhaW1wb3J0YW50O1xyXG4gIGlvbi1pdGVte1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSFpbXBvcnRhbnQ7XHJcbiAgICBpb24tcmFkaW97XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4ubGlzdC1oZWFkZXJ7XHJcbiAgLy8gdG9wOiAyMHB4O1xyXG4gIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwb3NpdGlvbjogdW5zZXQ7XHJcbiAgdG9wOiB1bnNldDtcclxufVxyXG5pb24tY29sLmltZywgaW9uLWNvbC5xdHl7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICBpb24tY29sLnByaWNle3dpZHRoOjEyMHB4IDttYXgtd2lkdGg6IDEyMHB4O31cclxuICBpb24tY29sLm5hbWV7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xyXG4gICAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgfVxyXG4gIGlvbi1jb2wuYWN0aW9ue1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMDBweDtcclxuICAgIGlvbi1idXR0b257XHJcbiAgICAgIG1hcmdpbi1yaWdodDoxNXB4O1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBpb24tY29sLnZhcmlhbnQtdGl0bGV7d2lkdGg6IDQ1MHB4O1xyXG4gIC52YXJpYW50LXRpdGxlLXRleHR7ZGlzcGxheTogYmxvY2s7dGV4dC1hbGlnbjogcmlnaHQ7d2lkdGg6IDEwMCU7fVxyXG4gIH1cclxuLy8gICBpb24tY29sLnZhcmlhbnQtcHJpY2V7d2lkdGg6MTAwcHggO21heC13aWR0aDogMTAwcHg7fVxyXG4vLyAgIGlvbi1jb2wuYWN0aW9ue3dpZHRoOjIwMHB4IDttYXgtd2lkdGg6IDIwMHB4O31cclxuICBcclxuICBcclxuICAuZm9ybS1pbnB1dHttYXJnaW4tdG9wOiAwO31cclxuICAucHJvZHVjdC1pbWctd3JhcHBlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG4gIC5wcm9kdWN0LWFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcclxuICAgIHdpZHRoOiA4cHg7XHJcbiAgICBoZWlnaHQ6IDhweDtcclxuICAgIG1pbi13aWR0aDogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMCU7XHJcbiAgfVxyXG4gIC5wcm9kdWN0LWluYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxuICAgIHdpZHRoOiA4cHg7XHJcbiAgICBoZWlnaHQ6IDhweDtcclxuICAgIG1pbi13aWR0aDogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcclxuICAgIG1hcmdpbi1yaWdodDogMTAlO1xyXG4gIH1cclxuICBcclxuICAuZm9ybS1pbnB1dHtwYWRkaW5nLWxlZnQ6IDhweDtwYWRkaW5nLXJpZ2h0OiA4cHg7fVxyXG4gIGlvbi1pdGVtLnNjLWlvbi1pbnB1dC1tZC1oOm5vdCguaXRlbS1sYWJlbCksIGlvbi1pdGVtOm5vdCguaXRlbS1sYWJlbCkgLnNjLWlvbi1pbnB1dC1tZC1oIHtcclxuICAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7IFxyXG4gIH1cclxuICAuYWRkLWJ0bntcclxuICAgIG1hcmdpbi1yaWdodDoyMHB4O1xyXG4gIH1cclxuXHJcbi8vIE9yZGVycyBUYWJcclxuLmxpc3QtY29udGFpbmVyLW9yZGVyc3tcclxuICBtYXJnaW4tdG9wOiA0NXB4O1xyXG4gIGlvbi1ncmlke1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGlvbi1yb3d7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcclxuICAgICAgaW9uLWNvbHtcclxuICAgICAgICBwYWRkaW5nOjE2cHggOHB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuLlBlbmRpbmd7XHJcbiAgY29sb3I6IGJsYWNrXHJcbn1cclxuXHJcbi5Db25maXJtZWR7XHJcbiAgY29sb3I6IGRhcmtibHVlXHJcbn1cclxuXHJcbi5EaXNwYXRjaGVke1xyXG4gIGNvbG9yOiAjOUI4NzBDXHJcbn1cclxuXHJcbi5EZWxpdmVyZWR7XHJcbiAgY29sb3I6IGRhcmtncmVlblxyXG59XHJcblxyXG4uQ2FuY2VsbGVkLCAuUmV0dXJuZWR7XHJcbiAgY29sb3I6IGRhcmtyZWRcclxufVxyXG5cclxuLy8gUmVwb3J0cyBUYWJcclxuLnJlcG9ydC10YWJsZSB0YWJsZSB0Ym9keSB0ZCB7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uZm9vdGVyQnRue1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBpb24tYnV0dG9ue1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uc3RhdHVzTGlzdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxLFxyXG4gICNzY3JvbGwyIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbn1cclxuXHJcbi5tYWluLWJ0bntcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ud3JhcC1hZGRyZXNze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxuICAgIGlvbi1pbnB1dHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIH1cclxufSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLnRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLmRhdGEtZmllbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLnRvZ2dsZVN1YiB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMHZ3O1xufVxuXG5pb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5pdGVtLWlubmVyIHtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYWJlbC1tZCB7XG4gIG1hcmdpbi1ib3R0b206IDFweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAxcHggIWltcG9ydGFudDtcbn1cblxuaW9uLWl0ZW0tZGl2aWRlciB7XG4gIG1hcmdpbi10b3A6IDBweDtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbiAgb3BhY2l0eTogNTAlO1xufVxuXG5pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHdpZHRoOiAzMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbiNjYXJkQnRuMSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIHBhZGRpbmc6IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJkQnRuMiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4udGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XG4gIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuLmZvcm0ge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB3aWR0aDogMjB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4ucmVnaW9uU2VsZWN0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5yZW1vdmVCdG4ge1xuICBjb2xvcjogI2Y0MGQzMDtcbiAgcGFkZGluZzogNXB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNDBkMzA7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4uaW5mby10eHQge1xuICBjb2xvcjogcmVkO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB3aWR0aDogMTUwcHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cblxuLnVwbG9hZGVkLWRvYy1pbWdzIHtcbiAgd2lkdGg6IDcwcHg7XG4gIGhlaWdodDogNzBweDtcbn1cblxuLmJzLWxpbmtzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4ubGlzdC1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiB1bnNldDtcbn1cblxuLmNvbW1pc3Npb24tbGlzdCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pICFpbXBvcnRhbnQ7XG59XG4uY29tbWlzc2lvbi1saXN0IGlvbi1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSFpbXBvcnRhbnQ7XG59XG4uY29tbWlzc2lvbi1saXN0IGlvbi1pdGVtIGlvbi1yYWRpbyB7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogdW5zZXQ7XG4gIHRvcDogdW5zZXQ7XG59XG5cbmlvbi1jb2wuaW1nLCBpb24tY29sLnF0eSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5wcmljZSB7XG4gIHdpZHRoOiAxMjBweDtcbiAgbWF4LXdpZHRoOiAxMjBweDtcbn1cblxuaW9uLWNvbC5uYW1lIHtcbiAgd2lkdGg6IDM1MHB4O1xuICBtYXgtd2lkdGg6IDM1MHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuaW9uLWNvbC5hY3Rpb24gaW9uLWJ1dHRvbiB7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbn1cblxuaW9uLWNvbC52YXJpYW50LXRpdGxlIHtcbiAgd2lkdGg6IDQ1MHB4O1xufVxuaW9uLWNvbC52YXJpYW50LXRpdGxlIC52YXJpYW50LXRpdGxlLXRleHQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS1pbnB1dCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbi5wcm9kdWN0LWltZy13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucHJvZHVjdC1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIG1pbi13aWR0aDogOHB4O1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XG59XG5cbi5wcm9kdWN0LWluYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcbn1cblxuaW9uLWl0ZW0uc2MtaW9uLWlucHV0LW1kLWg6bm90KC5pdGVtLWxhYmVsKSwgaW9uLWl0ZW06bm90KC5pdGVtLWxhYmVsKSAuc2MtaW9uLWlucHV0LW1kLWgge1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG59XG5cbi5hZGQtYnRuIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4ubGlzdC1jb250YWluZXItb3JkZXJzIHtcbiAgbWFyZ2luLXRvcDogNDVweDtcbn1cbi5saXN0LWNvbnRhaW5lci1vcmRlcnMgaW9uLWdyaWQge1xuICBwYWRkaW5nOiAwO1xufVxuLmxpc3QtY29udGFpbmVyLW9yZGVycyBpb24tZ3JpZCBpb24tcm93IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xufVxuLmxpc3QtY29udGFpbmVyLW9yZGVycyBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wge1xuICBwYWRkaW5nOiAxNnB4IDhweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5QZW5kaW5nIHtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uQ29uZmlybWVkIHtcbiAgY29sb3I6IGRhcmtibHVlO1xufVxuXG4uRGlzcGF0Y2hlZCB7XG4gIGNvbG9yOiAjOUI4NzBDO1xufVxuXG4uRGVsaXZlcmVkIHtcbiAgY29sb3I6IGRhcmtncmVlbjtcbn1cblxuLkNhbmNlbGxlZCwgLlJldHVybmVkIHtcbiAgY29sb3I6IGRhcmtyZWQ7XG59XG5cbi5yZXBvcnQtdGFibGUgdGFibGUgdGJvZHkgdGQge1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5mb290ZXJCdG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uZm9vdGVyQnRuIGlvbi1idXR0b24ge1xuICBtYXJnaW46IDhweDtcbn1cblxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSxcbiNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn1cbi5tYWluLWJ0biB7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLndyYXAtYWRkcmVzcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG59XG4ud3JhcC1hZGRyZXNzIGlvbi1pbnB1dCB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.ts ***!
  \******************************************************************************/
/*! exports provided: MultiVendorAddPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiVendorAddPage", function() { return MultiVendorAddPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_admin_multi_vendor_vendor_products_vendor_products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/admin/multi-vendor/vendor-products/vendor-products.page */ "./src/app/admin/multi-vendor/vendor-products/vendor-products.page.ts");
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/order/order.service */ "./src/app/services/order/order.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/admin/admin-home/view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _admin_delivery_settings_area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../admin/delivery-settings/area-modal/area-modal.page */ "./src/app/admin/delivery-settings/area-modal/area-modal.page.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
















let MultiVendorAddPage = class MultiVendorAddPage {
    constructor(events, labelService, router, route, modalController, productService, vendorService, brandService, orderService, sharedService, configService, alertController, categoryService) {
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.route = route;
        this.modalController = modalController;
        this.productService = productService;
        this.vendorService = vendorService;
        this.brandService = brandService;
        this.orderService = orderService;
        this.sharedService = sharedService;
        this.configService = configService;
        this.alertController = alertController;
        this.categoryService = categoryService;
        this.regions = [];
        this.regionsAvailable = [];
        this.receivedVendorData = [];
        this.currentRegion = "";
        this.vendors = [];
        this.totalOrderAmt = 0;
        this.buttonActive = 'Profile';
        this.vendorDetails = {
            appointmentSlotLimit: 0,
            displayName: '',
            description: '',
            minOrderAmount: 0,
            deliveryIntegration: {
                pickupId: ''
            },
            address: '',
            approveAllProducts: false,
            name: '',
            phoneNo: '',
            image: {
                url: '',
                mob: '',
                thumb: ''
            },
            isExclusive: false,
            vendorAddress: {
                address: {
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                }
            },
            showUserDetails: false,
            productLimit: null,
            qrCode: ''
        };
        this.searchCategory = '';
        this.searchBrand = '';
        this.showNoCategories = false;
        this.showCategoriesLoader = true;
        this.listOfSubcategories = {};
        this.listOfSubcategoriesInView = {};
        this.selectedCategories = [];
        this.showNoBrands = false;
        this.brands = [];
        this.selectedBrands = [];
        this.slug = {
            name: '',
            updatedAt: new Date(),
            updatedBy: 'admin'
        };
        this.isUniversal = false;
        // Invoice Tab
        this.multipleVendorInvoices = false;
        this.invoiceSettings = {
            logo: {
                adminLogo: true,
                url: ''
            },
            billingName: '',
            address: '',
            phoneNo: '',
            gstNo: '',
            panNo: '',
            signature: '',
            customMessage: ''
        };
        // Products Tab
        this.commissionType = 'productWise';
        this.showNoProducts = false;
        this.productsData = [];
        this.allProductsData = [];
        // Orders Tab
        this.orders = [];
        this.noMoreOrders = false;
        // Reports Tab
        this.endDate = new Date().toISOString();
        this.tempDate = new Date();
        this.startDate = new Date(this.tempDate.setDate(this.tempDate.getDate() - 7)).toISOString();
        this.reports = [];
        this.details = [];
        this.activeProjectIndex = 0;
        this.totalPrice = 0;
        this.totalCommission = 0;
        this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
        this.currentDays = 7;
        this.subOfSubCategories = {};
        this.subOfSubCategoryToggle = {};
        this.searchProduct = '';
        this.vendorOrdersLoading = false;
        this.activeTab = '';
        this.route.queryParams.subscribe((params) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(params);
            if (this.router.getCurrentNavigation().extras.state) {
                const recieveData = yield this.router.getCurrentNavigation().extras.state.data;
                if (recieveData) {
                    this.vendor = recieveData.vendorData.id;
                    this.vendorDetails.name = recieveData.vendorData.name;
                    this.vendorDetails.description = recieveData.vendorData.description || "";
                    this.vendorDetails.phoneNo = recieveData.vendorData.phoneNo;
                    this.vendors = recieveData.vendorList;
                    console.log(this.vendors);
                    console.log('this.vendor', this.vendor);
                }
            }
        }));
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_VENDOR_LABELS = this.labelService.labels['ADD_VENDOR'];
        if (this.vendor && this.vendor.name) {
            this.headerText = this.ADD_VENDOR_LABELS['header_text_2'];
        }
        else {
            this.headerText = this.ADD_VENDOR_LABELS['header_text_1'];
        }
        this.currencyCode = this.configService.environment.currencyCode;
        this.isUniversal = this.sharedService.isUniversal();
        this.details = [
            'Profile', 'Categories & Brands', 'Settings', 'Region'
        ];
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
            this.events.publish('vendor:getVendorData', this.vendor);
            this.events.publish('product:getAllCategories');
            //this.events.publish('brands:getAllBrandsForAdmin');
            if (this.activeTab == 'products') {
                yield this.loadProducts();
            }
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('vendor:vendorSaved', () => {
                if (this.sharedService.loading) {
                    this.sharedService.loading.dismiss();
                }
                this.sharedService.presentAlert("Vendor saved !");
            });
            this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
                if (regions.length) {
                    this.regions = regions;
                    this.regionsAvailable = regions;
                    console.log('this.regionsAvailable:', this.regionsAvailable);
                    for (let i = 0; i < regions.length; i++) {
                        // if (!regions[i]['vendorId']) {
                        //   this.regionsAvailable.push(regions[i])
                        // }
                        if (regions[i]['id'] == this.receivedVendorData.regionId) {
                            this.currentRegion = regions[i]['name'];
                        }
                    }
                }
            });
            this.events.subscribe('vendor:changeRegionSuccess', () => {
                this.sharedService.presentAlert("Region saved successfully !");
                this.events.publish('multi-region:getAllActiveRegions');
            });
            this.events.subscribe('vendor:getVendorDataSuccess', (receivedData) => {
                this.receivedVendorData = receivedData;
                this.vendorDetails.appointmentSlotLimit = receivedData.appointmentSlotLimit ? receivedData.appointmentSlotLimit : 0;
                this.vendorDetails.minOrderAmount = receivedData.minOrderAmount ? receivedData.minOrderAmount : 0;
                this.vendorDetails.displayName = receivedData.displayName ? receivedData.displayName : '';
                this.vendorDetails.description = receivedData.description ? receivedData.description : '';
                this.vendorDetails.address = receivedData.address ? receivedData.address : '';
                this.vendorDetails.productLimit = 'productLimit' in receivedData ? receivedData.productLimit : null;
                if (receivedData.vendorAddress) {
                    this.vendorDetails.vendorAddress = receivedData.vendorAddress;
                }
                this.vendorDetails.approveAllProducts = receivedData.approveAllProducts ? receivedData.approveAllProducts : false;
                console.log('revievedData:', receivedData);
                this.vendorDetails.qrCode = receivedData.qrCode ? receivedData.qrCode : '';
                if (receivedData.image) {
                    this.vendorDetails.image = receivedData.image;
                }
                if (receivedData.deliveryIntegration) {
                    this.vendorDetails.deliveryIntegration = receivedData.deliveryIntegration;
                }
                if (receivedData.isExclusive) {
                    this.vendorDetails.isExclusive = receivedData.isExclusive;
                }
                if (receivedData.showUserDetails) {
                    this.vendorDetails.showUserDetails = receivedData.showUserDetails;
                }
                if (this.isUniversal) {
                    this.slug = "slug" in receivedData ? receivedData.slug : this.slug;
                }
                this.selectedCategories = receivedData.categories ? receivedData.categories : [];
                this.selectedBrands = receivedData.brands ? receivedData.brands : [];
                this.invoiceSettings = 'invoiceSettings' in receivedData ? receivedData.invoiceSettings : this.invoiceSettings;
                console.log(this.vendorDetails);
                this.events.publish('multi-region:getAllActiveRegions');
            });
            this.events.subscribe('vendor:changeActiveStatusVendorSuccess', () => {
                this.sharedService.presentAlert("Status changed successfully !");
            });
            this.events.subscribe('vendor:removeRegionSuccess', () => {
                this.sharedService.presentAlert("Region removed successfully !");
                this.currentRegion = '';
            });
            const multiVendorSettings = yield this.vendorService.getActiveStatus('service');
            if (multiVendorSettings) {
                this.multipleVendorInvoices = multiVendorSettings.multipleVendorInvoices;
            }
            // Categories & brands in Details Tab
            this.events.subscribe('product:publishAllCategoriesForAdmin', (categories) => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.categories = categories;
                this.showCategoriesLoader = false;
                this.showNoCategories = false;
            });
            this.events.subscribe('product:noCategoryAvailable', () => {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoCategories = true;
                this.showCategoriesLoader = false;
            });
            // this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
            //   if (this.loader) {
            //     this.loader.dismiss();
            //   }
            //   this.showNoBrands = false;
            //   this.brands = brands;
            //   console.log('brands for admin:', this.brands);
            // });
            // this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
            //   if (this.loader) {
            //     this.loader.dismiss();
            //   }
            //   this.showNoBrands = true;
            // });
            const brands = yield this.brandService.getAllBrands();
            if (brands && brands.length) {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoBrands = false;
                this.brands = brands;
                console.log('brands for admin:', this.brands);
            }
            else {
                if (this.loader) {
                    this.loader.dismiss();
                }
                this.showNoBrands = true;
            }
            // Orders Tab
            this.events.subscribe('vendor:NoOrders', () => {
                this.noMoreOrders = true;
            });
            this.events.subscribe('vendor:OrdersLimitReached', () => {
                this.noMoreOrders = true;
            });
            this.events.subscribe('vendor:getMoreVendorOrdersSuccess', (orders) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                for (let order of orders) {
                    order['details'] = yield this.orderService.getOrderDetails(order.order.id);
                    let productAmt = 0;
                    for (let product of order.details['products']) {
                        if (product.vendorStatus) {
                            if (product.vendorStatus.id == this.vendor) {
                                if (product.pack && product.pack.variantType && product.pack.variantType == "pieces") {
                                    productAmt += product.pack.price * product.quantity;
                                }
                                else {
                                    productAmt += product.price * product.quantity;
                                }
                            }
                        }
                    }
                    order.details.totalAmountToPaid = productAmt;
                    this.totalOrderAmt += productAmt;
                }
                this.orders = this.orders.concat(orders);
                if (this.sharedService.loading) {
                    this.sharedService.loading.dismiss();
                }
            }));
            // Main Product
            this.events.subscribe('product:editSuccess', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('product:editSuccess');
                this.presentAlert(desc);
            });
            this.events.subscribe('product:editFailure', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('product:editFailure');
                this.presentAlert(desc);
            });
            // Bookings
            this.events.subscribe('booking:editSuccess', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('booking:editSuccess');
                this.presentAlert(desc);
            });
            this.events.subscribe('booking:editFailure', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('booking:editFailure');
                this.presentAlert(desc);
            });
            // Food
            this.events.subscribe('food-item:editSuccess', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('food-item:editSuccess');
                this.presentAlert(desc);
            });
            this.events.subscribe('food-item:editFailure', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('food-item:editFailure');
                this.presentAlert(desc);
            });
            // Voucher
            this.events.subscribe('voucher:editSuccess', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('voucher:editSuccess');
                this.presentAlert(desc);
            });
            this.events.subscribe('voucher:editFailure', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('voucher:editFailure');
                this.presentAlert(desc);
            });
            // Showcase
            this.events.subscribe('showcase:editSuccess', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('showcase:editSuccess');
                this.presentAlert(desc);
            });
            this.events.subscribe('showcase:editFailure', (heading, desc) => {
                this.sharedService.loading.dismiss();
                this.events.unsubscribe('showcase:editFailure');
                this.presentAlert(desc);
            });
        });
    }
    // Products Tab
    loadProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            //this.sharedService.presentLoading();
            let products = yield this.productService.getVendorProducts(this.vendor);
            for (let product of products) {
                //product['approved'] = product['approved'] ? product['approved'] : this.vendorDetails.approveAllProducts;
                product['commission'] = product['commission'] ? product['commission'] : 0;
            }
            this.productsData = products;
            if (this.productsData.length == 0) {
                this.showNoProducts = true;
            }
            if (this.loading) {
                this.loading.dismiss();
            }
            // this.events.subscribe('product:editSuccess', (status, msg) => {
            //   this.sharedService.presentAlert(msg);
            // });
        });
    }
    // Orders Tab
    loadOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.vendorOrdersLoading = true;
            // this.sharedService.presentLoading();
            //this.events.publish('vendor:getVendorOrders', this.vendor);
            this.totalOrderAmt = 0;
            const orders = yield this.vendorService.getVendorOrders(this.vendor, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
            yield this.processVendorOrders(orders);
            this.vendorOrdersLoading = false;
        });
    }
    processVendorOrders(orders) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            for (let order of orders) {
                order['details'] = yield this.orderService.getOrderDetails(order.order.id);
                let productAmt = 0;
                for (let product of order.details['products']) {
                    if (product.vendorStatus) {
                        if (product.vendorStatus.id == this.vendor) {
                            if (product.pack && product.pack.variantType && product.pack.variantType == "pieces") {
                                productAmt += product.pack.price * product.quantity;
                            }
                            else {
                                productAmt += product.price * product.quantity;
                            }
                        }
                    }
                }
                order.details.totalAmountToPaid = productAmt;
                this.totalOrderAmt += productAmt;
            }
            this.orders = orders;
        });
    }
    loadMoreOrders(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.vendorService.loadMoreVendorOrders(this.vendor, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
            setTimeout(() => {
                event.target.complete();
            }, 1000);
            if (this.noMoreOrders === true) {
                event.target.disabled = true;
            }
        });
    }
    filterOrder() {
        if (!this.startDate && !this.endDate) {
            let days = document.getElementById('days').value;
            this.currentDays = parseInt(days);
            this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
            this.loadOrders();
        }
        else if (!this.startDate || !this.endDate) {
            this.presentAlert('Please enter both start date and end date');
        }
        else {
            this.startOrders = new Date(this.endDate);
            this.endOrders = new Date(this.startDate);
            this.loadOrders();
        }
    }
    clearFilter() {
        this.startDate = undefined;
        this.endDate = undefined;
        this.currentDays = 7;
        this.startOrders = new Date();
        this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
        this.loadOrders();
    }
    // Reports Tab
    loadReports() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('reports:getReportSuccess', (reports) => {
                this.totalPrice = 0;
                this.totalCommission = 0;
                console.log('reports:', reports);
                this.reports = reports.filter(report => report.id === this.vendor);
                for (const report of this.reports) {
                    for (const product of report.products) {
                        this.totalCommission += product.commission;
                        this.totalPrice += product.sales;
                    }
                }
                if (this.sharedService.loading) {
                    this.sharedService.loading.dismiss();
                }
            });
            this.getReport();
        });
    }
    addRegion(e) {
        this.events.publish('vendor:changeRegion', e.target.value, this.vendor);
    }
    removeRegion() {
        this.events.publish('vendor:removeRegion', this.vendor);
    }
    toggleActive() {
        this.receivedVendorData.active = !this.receivedVendorData.active;
        this.events.publish('vendor:changeActiveStatusVendor', this.vendor, this.receivedVendorData.active);
    }
    saveVendor() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.isUniversal) {
                const slugName = this.sharedService.createSlugName(this.slug.name);
                const sameSlugExists = yield this.sharedService.sameSlugExists('vendors', this.vendor, slugName);
                if (sameSlugExists) {
                    this.presentAlert('Same slug already exists, please try with another slug name');
                    return;
                }
                else {
                    this.vendorDetails['slug'] = {
                        name: slugName,
                        updatedAt: new Date(),
                        updatedBy: 'admin'
                    };
                }
            }
            yield this.sharedService.presentLoading();
            let obj = Object.assign({}, this.vendorDetails);
            obj['categories'] = this.selectedCategories;
            obj['brands'] = this.selectedBrands;
            obj['invoiceSettings'] = this.invoiceSettings;
            this.events.publish('vendor:saveVendor', this.vendor, obj);
        });
    }
    copyProducts() {
        this.modalController.create({
            component: src_app_admin_multi_vendor_vendor_products_vendor_products_page__WEBPACK_IMPORTED_MODULE_6__["VendorProductsPage"],
            cssClass: 'custom-modal',
            componentProps: {
                'vendorId': this.vendor,
                'vendorList': this.vendors
            }
        })
            .then(modalEl => {
            modalEl.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('vendor:vendorSaved');
        this.events.unsubscribe('multi-region:publishAllActiveRegions');
        this.events.unsubscribe('vendor:changeRegionSuccess');
        this.events.unsubscribe('vendor:getVendorDataSuccess');
        this.events.unsubscribe('vendor:changeActiveStatusVendorSuccess');
        this.events.unsubscribe('vendor:removeRegionSuccess');
        this.events.unsubscribe('reports:getReportSuccess');
        this.events.unsubscribe('product:editSuccess');
        this.events.unsubscribe('product:editFailure');
        this.events.unsubscribe('booking:editSuccess');
        this.events.unsubscribe('booking:editFailure');
        this.events.unsubscribe('food-item:editSuccess');
        this.events.unsubscribe('food-item:editFailure');
        this.events.unsubscribe('voucher:editSuccess');
        this.events.unsubscribe('voucher:editFailure');
        this.events.unsubscribe('showcase:editSuccess');
        this.events.unsubscribe('showcase:editFailure');
    }
    // Details Tab
    getSubcategories(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.listOfSubcategories.hasOwnProperty(cid)) {
                let subcategories = [];
                subcategories = yield this.productService.getSubcategoriesInNewProduct(cid);
                this.listOfSubcategories[cid] = subcategories;
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
                this.subOfSubCategories[subCatId] = subOfSubCategoriesData;
                this.subOfSubCategoryToggle[subCatId] = { active: true };
                // console.log('subOfSubCategories:', this.subOfSubCategories);
            }
            else {
                this.subOfSubCategoryToggle[subCatId].active = !this.subOfSubCategoryToggle[subCatId].active;
                // console.log('subOfSubCategoryToggle:', this.subOfSubCategoryToggle[subCatId]);
            }
        });
    }
    onClickCategoryCheckBox(cid) {
        if (this.selectedCategories.indexOf(cid) === -1) {
            this.selectedCategories.push(cid);
            // if (catIdForSubCat && this.selectedCategories.indexOf(catIdForSubCat) === -1) {
            //   this.selectedCategories.push(catIdForSubCat);
            // }
        }
        else {
            const cidIndex = this.selectedCategories.indexOf(cid);
            this.selectedCategories.splice(cidIndex, 1);
            // if (catIdForSubCat && this.selectedCategories.indexOf(catIdForSubCat) === -1) {
            //   this.selectedCategories.push(catIdForSubCat);
            // }
            // if (catIdForSubCat) {
            //   const index = this.selectedCategories.indexOf(catIdForSubCat);
            //   this.selectedCategories.splice(index, 1);
            // }
        }
    }
    onClickBrandCheckBox(bid) {
        if (this.selectedBrands.indexOf(bid) === -1) {
            this.selectedBrands.push(bid);
        }
        else {
            const bidIndex = this.selectedBrands.indexOf(bid);
            this.selectedBrands.splice(bidIndex, 1);
        }
    }
    editCheckBoxValue(id) {
        if (this.selectedCategories.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    editBrandCheckBoxValue(id) {
        if (this.selectedBrands.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Products Tab
    selectCommissionType(commissionType) {
        this.commissionType = commissionType;
    }
    setCommission() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            for (const product of this.productsData) {
                product.commission = this.singleCommission;
                yield this.vendorService.setCommissionForProduct(product.id, this.singleCommission);
            }
            yield this.sharedService.loading.dismiss();
            yield this.sharedService.presentAlert('Commission set for all products!');
        });
    }
    saveProduct(productData, itemID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            productData.status = productData.approved ? productData.approved : productData.status;
            console.log("product : ", productData);
            if (productData.productType == "booking") {
                this.events.publish('booking:editProduct', productData, itemID, [], '');
            }
            else if (productData.productType == "food") {
                this.events.publish('food-item:editProduct', productData, itemID, [], '');
            }
            else if (productData.productType == "voucher") {
                this.events.publish('voucher:editProduct', productData, itemID, [], '');
            }
            else if (productData.productType == "showcase") {
                this.events.publish('showcase:editProduct', productData, itemID, [], '');
            }
            else {
                this.events.publish('product:editProduct', productData, itemID, [], '');
            }
        });
    }
    // Reports Tab
    getReport() {
        let startingDate = new Date(this.startDate);
        let endingDate = new Date(this.endDate);
        const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
        const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (differenceInDays <= 30) {
            this.sharedService.presentLoading();
            this.events.publish('reports:getReport', new Date(this.startDate), new Date(this.endDate), 'vendors');
        }
        else {
            this.sharedService.presentAlert('End date cannot be more than 1 month of start Date');
        }
    }
    exportReport() {
        var data = [];
        this.reports.forEach((report) => {
            for (const product of report.products) {
                let obj = {
                    product: product.name,
                    sales: product.sales,
                    items: product.quantity,
                    commission: product.commission,
                };
                data.push(obj);
            }
        });
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: `Vendor Report (${this.vendorDetails.name})`,
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_13__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    }
    onClickViewOrder(orderId) {
        this.modalController.create({
            component: src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_12__["ViewOrderPage"],
            cssClass: 'view-order-css',
            componentProps: {
                orderId: orderId
            }
        }).then(modal => modal.present());
    }
    uploadImage(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // const modal = await this.modalController.create({
            //   component: ImageEditorComponent,
            //   componentProps: {
            //     aspectRatioWidthVal: 1,
            //     aspectRatioHeightVal: 1,
            //   },
            //   cssClass: 'custom-img-editor'
            // })
            // await modal.present();
            // modal.onDidDismiss().then(res => {
            //   this.vendorDetails.image.url = res.data || '';
            // })
            //console.log(type);
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(files.item(i));
                reader.onload = (event) => {
                    let base64Image = event.target.result;
                    this.vendorDetails.image.url = base64Image;
                };
            }
        });
    }
    removeImage() {
        this.vendorDetails.image.url = '';
        this.vendorDetails.image.mob = '';
        this.vendorDetails.image.thumb = '';
    }
    openAreaModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _admin_delivery_settings_area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_14__["AreaModalPage"],
                cssClass: 'custom-modal big-modal',
                backdropDismiss: false,
            });
            modal.onDidDismiss()
                .then((res) => {
                if (res.data && res.data.lat != 0 && res.data.lng != 0) {
                    this.vendorDetails.vendorAddress['lat'] = res.data.lat;
                    this.vendorDetails.vendorAddress['lng'] = res.data.lng;
                    this.vendorDetails.vendorAddress['address'] = res.data.address;
                }
            });
            yield modal.present();
        });
    }
    selectDate(dateSelected) {
        this.startDate = undefined;
        this.endDate = undefined;
        this.currentDays = dateSelected;
        this.startOrders = new Date();
        this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
        this.loadOrders();
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                        }
                    }]
            });
            yield alert.present();
        });
    }
    showUserDetailsToVendor() {
        this.vendorDetails.showUserDetails = !this.vendorDetails.showUserDetails;
    }
    checkProductToDeliver() {
        const navigationExtras = {
            state: {
                vendorId: this.vendor
            }
        };
        this.router.navigate(['products-to-deliver'], navigationExtras);
    }
    showAdminLogoToggle() {
        this.invoiceSettings.logo.adminLogo = !this.invoiceSettings.logo.adminLogo;
    }
    uploadInvoiceImg(files, imgType) {
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => {
                let base64Image = event.target.result;
                if (imgType === 'sign') {
                    this.invoiceSettings.signature = base64Image;
                }
                else {
                    this.invoiceSettings.logo.url = base64Image;
                }
            };
        }
    }
    removeImg(imgType) {
        if (imgType === 'sign') {
            this.invoiceSettings.signature = '';
        }
        else {
            this.invoiceSettings.logo.url = '';
        }
    }
    onClickStatustItem(index, name) {
        this.activeProjectIndex = index;
        console.log(name);
        this.buttonActive = name;
    }
    openImg(url) {
        window.open(url, "_blank");
    }
    editProduct(item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.activeTab = 'products';
            if (item.productType == 'appointment') {
                const navigationExtras = {
                    state: {
                        productData: item,
                        productId: item.id,
                    }
                };
                this.router.navigate(['appointment'], navigationExtras);
            }
            else {
                const navigationExtras = {
                    state: {
                        product: item,
                        productId: item.id,
                        type: item.productType,
                        routeFromCategories: true
                    }
                };
                if (item.productType == 'booking') {
                    this.router.navigate(['create-booking'], navigationExtras);
                }
                else if (item.productType == 'food') {
                    this.router.navigate(['create-food-item'], navigationExtras);
                }
                else if (item.productType == 'voucher') {
                    this.router.navigate(['create-voucher'], navigationExtras);
                }
                else {
                    this.router.navigate(['new-product'], navigationExtras);
                }
            }
        });
    }
};
MultiVendorAddPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"] },
    { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__["BrandsService"] },
    { type: src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_10__["OrderService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_11__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__["CategoriesService"] }
];
MultiVendorAddPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-multi-vendor-add',
        template: __webpack_require__(/*! raw-loader!./multi-vendor-add.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.html"),
        styles: [__webpack_require__(/*! ./multi-vendor-add.page.scss */ "./src/app/admin/multi-vendor/multi-vendor-add/multi-vendor-add.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"], src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"], src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"], src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__["BrandsService"], src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_10__["OrderService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_11__["ConfigService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_15__["CategoriesService"]])
], MultiVendorAddPage);



/***/ })

}]);
//# sourceMappingURL=admin-multi-vendor-multi-vendor-add-multi-vendor-add-module-es2015.js.map