(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-settings-admin-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-settings/admin-settings.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-settings/admin-settings.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Setting</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-null\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Order</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Notifications</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Invoice</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Social</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <div class=\"spinner\"\r\n      *ngIf=\"showLoader; else showSettingsData\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <ng-template #showSettingsData>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Store Name</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      [(ngModel)]=\"storeName\"\r\n                      autocapitalize></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Phone number</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      type=\"tel\"\r\n                      [(ngModel)]=\"storePhone\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <!-- <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Notification message on home screen</ion-label>\r\n                    <ion-input class=\"form-input\" type=\"text\" [(ngModel)]=\"notificationMessage\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Store address</ion-label>\r\n                    <ion-textarea type=\"text\" row=\"3\" class=\"form-input\"  [(ngModel)]=\"storeAddress.address\"></ion-textarea>\r\n                  </div>\r\n                </ion-col> -->\r\n                <ion-col size=\"4\">\r\n                  <div>\r\n                    <p>Pincode</p>\r\n                    <ion-input type=\"number\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"storeAddress.pincode\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Store Email Id</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      type=\"tel\"\r\n                      [(ngModel)]=\"storeEmail\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Store address</ion-label>\r\n                    <ion-textarea type=\"text\"\r\n                      row=\"3\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"storeAddress.address\"></ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Notification message on home screen</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      type=\"text\"\r\n                      [(ngModel)]=\"notificationMessage\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div>\r\n                    <p>City</p>\r\n                    <ion-input type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"storeAddress.city\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div>\r\n                    <p>State</p>\r\n                    <div class=\"form-input state-wrapper\"\r\n                      (click)=\"openStateModal()\">\r\n                      <div *ngIf=\"storeAddress.state\">{{storeAddress.state}}\r\n                      </div>\r\n                      <div *ngIf=\"!storeAddress.state\">Select State</div>\r\n                      <div>\r\n                        <i class=\"flaticon-null-13\"></i>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div>\r\n                    <p>Latitude</p>\r\n                    <ion-input type=\"number\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"storeAddress.lat\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div>\r\n                    <p>Longitude</p>\r\n                    <ion-input type=\"number\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"storeAddress.lng\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Welcome Message</ion-label>\r\n                    <ion-textarea rows=\"4\"\r\n                      type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"welcomeMsg\"></ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"allowStoreInfo\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>Store Information</ion-label>\r\n                      </div>\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>allow Store Information</ion-label>\r\n                        <ion-toggle (ionChange)=\"allowStoreInfoToggleChange()\"\r\n                          [checked]=\"allowStoreInfo\"></ion-toggle>\r\n                      </div>\r\n                    </div>\r\n                    <ckeditor [(ngModel)]=\"storeInfo\"\r\n                      [config]=\"ckeConfig\"></ckeditor>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"!allowStoreInfo\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>allow Store Information</ion-label>\r\n                      <ion-toggle (ionChange)=\"allowStoreInfoToggleChange()\"\r\n                        [checked]=\"allowStoreInfo\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Shop Inactive</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"shopInactive\"\r\n                        [checked]=\"shopInactive\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"shopInactive\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Shop Inactive Message</ion-label>\r\n                    <ion-textarea rows=\"4\"\r\n                      type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"inactiveMsg\"></ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <h3>Login Popup Settings</h3>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Name</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"loginPopup.name\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Email</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"loginPopup.email\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Date Of Birth</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"loginPopup.dob\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>{{taxType}}</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"loginPopup.gst\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Custom Field</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"loginPopup.custom.active\">\r\n                      </ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"loginPopup.custom.active\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Custom Field Name</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      [(ngModel)]=\"loginPopup.custom.name\"\r\n                      autocapitalize></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <h3>Splash Screen Settings</h3>\r\n                      </div>\r\n                    </div>\r\n                    <br />\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Active</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"splashScreen.active\">\r\n                      </ion-toggle>\r\n                    </div>\r\n                    <div  *ngIf=\"splashScreen.active\"> \r\n                      <div class=\"extra-charges\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label style=\"margin-right: 20px;\">Background Color\r\n                            </ion-label>\r\n                          </div>\r\n                          <input class=\"colorPicker\"\r\n                            [(ngModel)]=\"splashScreen.bgColor\"\r\n                            type=\"color\">                         \r\n                        </div>\r\n  \r\n                        <div class=\"flex-space-between\" style=\"margin-left: 10px;\">\r\n                          <div>\r\n                            <ion-label style=\"margin-right: 20px;\">Timeout</ion-label>\r\n                          </div>\r\n                          <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"splashScreen.timeout\"\r\n                            type=\"number\"\r\n                            style=\"max-width: 10rem; margin-right: 20px;\">\r\n                          </ion-input><p>seconds</p>\r\n                        </div>  \r\n                      </div>\r\n\r\n                      <div class=\"flex-label\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label>Splash Logo Image</ion-label>\r\n                            <br>\r\n                          </div>\r\n                          <div class=\"upload-btn-wrapper\" style=\"margin-top: 8px;\">\r\n                          <button\r\n                            class=\"upload-btn btn-1 i-start\" style=\"margin-right: 0px;\"> <i\r\n                              class=\"flaticon-null-16\"></i>Upload</button>\r\n                          <input\r\n                            type=\"file\"\r\n                            name=\"myfile\"\r\n                            (change)=\"uploadImage($event.target.files,'splashLogo')\"\r\n                            accept=\"image/*\" />\r\n                            <!-- <input\r\n                              [disabled]=\"imageResponse.length !== 0 || (categoryData && categoryData.image && categoryData.image.url)\"\r\n                              type=\"file\"\r\n                              name=\"myfile\"\r\n                              (change)=\"uploadImage($event.target.files,'catImg')\" /> -->\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"img-container\" *ngIf=\"splashScreen.active\">\r\n                          <div class=\"no-img\"\r\n                            *ngIf=\"(!splashScreen.logo)\">\r\n                            <p>No attached image</p>\r\n                          </div>\r\n                          <div *ngIf=\"splashScreen\">\r\n                            <div class=\"img-wrap\" style=\"margin-top: 8px;\"\r\n                              *ngIf=\"splashScreen.logo\">\r\n                              <img class=\"category-img\"\r\n                                [src]=\"splashScreen.logo\"\r\n                                (click)=\"imgZoom(splashScreen.logo)\" />\r\n                              <div class=\"overlay\">\r\n                                <ion-button class=\"btn-2 remove\"\r\n                                  shape=\"round\"\r\n                                  fill=\"clear\"\r\n                                  color=\"danger\"\r\n                                  (click)=\"removeImg('splashLogo')\">\r\n                                  <ion-icon name=\"trash\"\r\n                                    slot=\"icon-only\"></ion-icon>\r\n                                </ion-button>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n                      </div>\r\n                    </div>\r\n                  \r\n                  \r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <!-- Order -->\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <ion-grid>\r\n              <ion-row>\r\n\r\n                <!-- <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>Extra Charges</ion-label>\r\n                      </div>\r\n                    </div>\r\n                    <br />\r\n                    <div class=\"flex-label\">\r\n                      <p>Flat</p>&nbsp;&nbsp;\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input color=\"primary\"\r\n                            type=\"checkbox\"\r\n                            (click)=\"extraChargesType($event)\"\r\n                            [checked]=\"extraChargeType != 'flat'\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>&nbsp;&nbsp;\r\n                      <p>Percentage ( % )</p>&nbsp;&nbsp;\r\n                    </div>\r\n                    <div class=\"extra-charges\">\r\n\r\n                      <div class=\"flex-space-between\">\r\n                        <div>\r\n                          <ion-label style=\"margin-right: 20px;\">Charge Name\r\n                          </ion-label>\r\n                        </div>\r\n                        <ion-input class=\"form-input\"\r\n                          [(ngModel)]=\"chargeName\"\r\n                          type=\"text\"\r\n                          style=\"max-width: 10rem; margin-right: 20px;\">\r\n                        </ion-input>\r\n                      </div>\r\n\r\n                      <div class=\"flex-space-between\">\r\n                        <div>\r\n                          <ion-label style=\"margin-right: 20px;\">Charges\r\n                            {{char}}</ion-label>\r\n                        </div>\r\n                        <ion-input class=\"form-input\"\r\n                          [(ngModel)]=\"extraCharges\"\r\n                          type=\"number\"\r\n                          style=\"max-width: 10rem; margin-right: 20px;\">\r\n                        </ion-input>\r\n                      </div>\r\n\r\n                      <div *ngIf=\"toggleState == 'perc'\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label style=\"margin-right: 20px;\">Max Amount\r\n                            </ion-label>\r\n                          </div>\r\n                          <ion-input class=\"form-input\"\r\n                            [(ngModel)]=\"maxCharge\"\r\n                            type=\"number\"\r\n                            style=\"max-width: 10rem; margin-right: 20px;\">\r\n                          </ion-input>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <div class=\"flex-label\">\r\n                        <p>Make Verification with Delivery OTP Mandatory</p>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\"\r\n                              type=\"checkbox\"\r\n                              (click)=\"verifyOtpToggle()\"\r\n                              [checked]=\"verifyDeliveryOtp\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>&nbsp;&nbsp;\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <div class=\"flex-label\">\r\n                        <p>Allow user to do online payment in COD</p>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\"\r\n                              type=\"checkbox\"\r\n                              (click)=\"doPaymentInCodToggle()\"\r\n                              [checked]=\"doPaymentInCod\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>&nbsp;&nbsp;\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <div class=\"flex-label\">\r\n                        <p>Notify delivery agents and allow them to accept or reject nearby orders</p>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\"\r\n                              type=\"checkbox\"\r\n                              (click)=\"deliveryAcceptanceToggle()\"\r\n                              [checked]=\"deliveryAcceptanceModel.active\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>&nbsp;&nbsp;\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\" *ngIf=\"deliveryAcceptanceModel.active\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Radius(in Km)</ion-label>\r\n                    <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"deliveryAcceptanceModel.radius\"></ion-input>\r\n                  </div>\r\n                </ion-col> -->\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"allowComment\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>Message for comment</ion-label>\r\n                      </div>\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>allow comment with order</ion-label>\r\n                        <ion-toggle (ionChange)=\"allowCommentToggleChange()\"\r\n                          [checked]=\"allowComment\"></ion-toggle>\r\n                      </div>\r\n                    </div>\r\n                    <ion-textarea rows=\"3\"\r\n                      type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"commentMsg\"></ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"!allowComment\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>allow comment with order</ion-label>\r\n                      <ion-toggle (ionChange)=\"allowCommentToggleChange()\"\r\n                        [checked]=\"allowComment\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <!-- <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Allow image upload with order</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"allowImageUpload.isActive\">\r\n                      </ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"allowImageUpload.isActive\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>Name under which image to be uploaded\r\n                        </ion-label>\r\n                      </div>\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>Make Image upload mandatory</ion-label>\r\n                        <ion-toggle [(ngModel)]=\"allowImageUpload.isMandatory\">\r\n                        </ion-toggle>\r\n                      </div>\r\n                    </div>\r\n                    <ion-input type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"allowImageUpload.name\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div style=\"display: flex;\">\r\n                    <div class=\"input-wrap\">\r\n                      <ion-label>Time limit for user to cancel order</ion-label>\r\n                      &nbsp;\r\n                      <input placeholder=\"Enter Time Limit\"\r\n                        [(ngModel)]=\"cancelTimeForUser\"\r\n                        (click)=\"enterEstimatedTime()\"\r\n                        readonly\r\n                        style=\"padding:5px;border-radius:10px\">\r\n                    </div>&nbsp;&nbsp;\r\n                    <ion-button (click)=\"removeLimit()\"\r\n                      color=\"danger\"\r\n                      size=\"small\">\r\n                      <p>Remove</p>\r\n                    </ion-button>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Offer Message</ion-label>\r\n                    <ckeditor [(ngModel)]=\"offerMsg\"\r\n                      [config]=\"ckeConfig\"></ckeditor>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Custom Field</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"customOrder.active\">\r\n                      </ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\"\r\n                  *ngIf=\"customOrder.active\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Custom Field Name</ion-label>\r\n                    <ion-input class=\"form-input\"\r\n                      [(ngModel)]=\"customOrder.name\"\r\n                      autocapitalize></ion-input>\r\n                  </div>\r\n                </ion-col> -->\r\n\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <!-- Notifications -->\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Enter number below which you want notification for products going Out of Stock</ion-label>\r\n                    <ion-input class=\"form-input\" type=\"number\"\r\n                      [(ngModel)]=\"notificationSettings.outOfStockProducts\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <!-- Invoice -->\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>GST Firm Name ( Billing Name )</ion-label>\r\n                      </div>\r\n                    </div>\r\n                    <ion-input class=\"form-input\"\r\n                      [(ngModel)]=\"gstFirmName\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flex-label\">\r\n                    <p>Ask Custom Invoice No. during Invoice Regeneration</p>&nbsp;&nbsp;\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input color=\"primary\"\r\n                          type=\"checkbox\"\r\n                          [checked]=\"isCustomInvoiceNo\"\r\n                          (click)=\"allowCustomInvoiceNo()\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flex-label\">\r\n                    <p>Allow user for to enter GST</p>&nbsp;&nbsp;\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input color=\"primary\"\r\n                          type=\"checkbox\"\r\n                          [checked]=\"isUserGstAvailable\"\r\n                          (click)=\"toggleCheckbox('userGst')\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col size=\"12\">\r\n                  <div class=\"justify-content\">\r\n                    <p>Store Logo (for Invoice) (Max Size: 200px by 200px)\r\n                      <ion-text color=\"danger\">\r\n                        <p>Only image files are allowed</p>\r\n                      </ion-text>\r\n                    </p>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                      <button *ngIf=\"!storeLogo\"\r\n                        class=\"upload-btn btn-1 i-start\"> <i\r\n                          class=\"flaticon-null-16\"></i>Upload</button>\r\n                      <input *ngIf=\"!storeLogo\"\r\n                        type=\"file\"\r\n                        name=\"myfile\"\r\n                        (change)=\"uploadImage($event.target.files,'logo')\"\r\n                        accept=\"image/*\" />\r\n                    </div>\r\n                    <!-- <ion-button (click)=\"openImageActionSheet('logo')\" fill=\"outline\" shape=\"round\" size=\"small\" *ngIf=\"!storeLogo\">\r\n                      Upload\r\n                    </ion-button> -->\r\n                    <ion-button (click)=\"removeImg('logo')\"\r\n                      fill=\"outline\"\r\n                      color=\"dark\"\r\n                      shape=\"round\"\r\n                      size=\"small\"\r\n                      *ngIf=\"storeLogo\">\r\n                      Remove\r\n                    </ion-button>\r\n                  </div>\r\n                  <div *ngIf=\"storeLogo\"\r\n                    class=\"ion-text-center\">\r\n                    <img src=\"{{storeLogo}}\"\r\n                      class=\"sign-img\">\r\n                  </div>\r\n                </ion-col>\r\n\r\n                <ion-col>\r\n                  <div class=\"justify-content\">\r\n                    <p>Authorized Signatory (for Invoice) (Max Size: 200px by\r\n                      200px)<ion-text color=\"danger\">\r\n                        <p>Only image files are allowed</p>\r\n                      </ion-text>\r\n                    </p>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                      <button *ngIf=\"!signature\"\r\n                        class=\"upload-btn btn-1 i-start\"> <i\r\n                          class=\"flaticon-null-16\"></i>Upload</button>\r\n                      <input *ngIf=\"!signature\"\r\n                        type=\"file\"\r\n                        name=\"myfile\"\r\n                        (change)=\"uploadImage($event.target.files,'sign')\"\r\n                        accept=\"image/*\" />\r\n                    </div>\r\n                    <!-- <ion-button (click)=\"openImageActionSheet('sign')\" fill=\"outline\" shape=\"round\" size=\"small\" *ngIf=\"!signature\">\r\n                      Upload\r\n                    </ion-button> -->\r\n                    <ion-button (click)=\"removeImg('sign')\"\r\n                      fill=\"outline\"\r\n                      color=\"dark\"\r\n                      shape=\"round\"\r\n                      size=\"small\"\r\n                      *ngIf=\"signature\">\r\n                      Remove\r\n                    </ion-button>\r\n                  </div>\r\n                  <div *ngIf=\"signature\"\r\n                    class=\"ion-text-center\">\r\n                    <img src=\"{{signature}}\"\r\n                      class=\"sign-img\">\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Custom Message In Invoice</ion-label>\r\n                    <ion-textarea rows=\"4\"\r\n                      type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"customMessage\"></ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div>\r\n                    <p><strong>App Links (Fill this enable sharing option on\r\n                        website and app)</strong></p>\r\n                    <br />\r\n                    <div>\r\n                      <p>Play Store</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"playstoreUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>App Store</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"appStoreUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                  </div>\r\n                  <br>\r\n                  <div>\r\n                    <p><strong>Social Platforms Links ( For website, will be\r\n                        displayed at bottom)</strong></p>\r\n                    <br />\r\n                    <div>\r\n                      <p>Facebook</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"facebookUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>Twitter</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"twitterUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n\r\n                    <div>\r\n                      <p>Pinterest</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"pinterestUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>Gmail</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"gmailUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>LinkedIn</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"linkedinUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>Instagram</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"instagramUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>Youtube</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"youtubeUrl\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                    <div>\r\n                      <p>Whatsapp (Number)</p>\r\n                      <ion-input type=\"text\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"whatsappNumber\"></ion-input>\r\n                      <br />\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <p><strong>Contact on external paltform</strong></p>\r\n                  <br>\r\n                  <div>\r\n                    <p>Platform name</p>\r\n                    <ion-input type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"externalContact.name\"\r\n                      placeholder=\"Name\"></ion-input>\r\n                  </div>\r\n                  <br>\r\n                  <div>\r\n                    <p>Platform link</p>\r\n                    <ion-input type=\"text\"\r\n                      class=\"form-input\"\r\n                      [(ngModel)]=\"externalContact.link\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </ng-template>\r\n  </super-tabs-container>\r\n\r\n</super-tabs>\r\n\r\n<ion-footer *ngIf=\"!showLoader\"\r\n  no-border\r\n  class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickSaveSettings()\"\r\n      shape=\"round\"\r\n      class=\"btn-1 i-start\"\r\n      color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/admin-settings/admin-settings.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-settings/admin-settings.module.ts ***!
  \***************************************************************/
/*! exports provided: AdminSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSettingsPageModule", function() { return AdminSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-settings.page */ "./src/app/admin/admin-settings/admin-settings.page.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");










var routes = [
    {
        path: '',
        component: _admin_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminSettingsPage"]
    }
];
var AdminSettingsPageModule = /** @class */ (function () {
    function AdminSettingsPageModule() {
    }
    AdminSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"],
                src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__["ApplicationDirectivesModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__["SuperTabsModule"]
            ],
            declarations: [_admin_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminSettingsPage"]]
        })
    ], AdminSettingsPageModule);
    return AdminSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-settings/admin-settings.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-settings/admin-settings.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n\n.justify-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.state-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.state-name {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.flaticon-null-13 {\n  opacity: 0.6;\n}\n\n.flaticon-null-13::before {\n  font-size: 12px;\n}\n\n.extra-charges {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: baseline;\n          align-items: baseline;\n  margin-top: 12px;\n}\n\n.form-input {\n  margin-top: 0;\n}\n\n.colorPicker {\n  max-width: 10rem;\n  margin-right: 20px;\n  padding: 0;\n  border: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1zZXR0aW5nc1xcYWRtaW4tc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1zZXR0aW5ncy9hZG1pbi1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwrQkFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBQ0NKOztBRENBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0VGOztBRENBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0VGOztBRENBO0VBQ0UsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FDRUY7O0FEQ0E7RUFDRSxZQUFBO0FDRUY7O0FEQUE7RUFDRSxlQUFBO0FDR0Y7O0FEREE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSwyQkFBQTtVQUFBLHFCQUFBO0VBQ0EsZ0JBQUE7QUNJRjs7QURGQTtFQUNFLGFBQUE7QUNLRjs7QURIQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtBQ01GIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tc2V0dGluZ3MvYWRtaW4tc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpeC1oZWlnaHR7XHJcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuLmp1c3RpZnktY29udGVudHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLnN0YXRlLXdyYXBwZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uc3RhdGUtbmFtZSB7XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG4uZmxhdGljb24tbnVsbC0xMyB7XHJcbiAgb3BhY2l0eTogLjY7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMTM6OmJlZm9yZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcbi5leHRyYS1jaGFyZ2VzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG59XHJcbi5mb3JtLWlucHV0IHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcbi5jb2xvclBpY2tlcntcclxuICBtYXgtd2lkdGg6IDEwcmVtOyBcclxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXI6IDA7XHJcbn0iLCIuZml4LWhlaWdodCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmp1c3RpZnktY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLnN0YXRlLXdyYXBwZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhdGUtbmFtZSB7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uZmxhdGljb24tbnVsbC0xMyB7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLmZsYXRpY29uLW51bGwtMTM6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuLmV4dHJhLWNoYXJnZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIG1hcmdpbi10b3A6IDEycHg7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmNvbG9yUGlja2VyIHtcbiAgbWF4LXdpZHRoOiAxMHJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXI6IDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-settings/admin-settings.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-settings/admin-settings.page.ts ***!
  \*************************************************************/
/*! exports provided: AdminSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSettingsPage", function() { return AdminSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/states-modal/states-modal.page */ "./src/app/states-modal/states-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin-settings/admin-settings.service */ "./src/app/services/admin-settings/admin-settings.service.ts");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");








var AdminSettingsPage = /** @class */ (function () {
    function AdminSettingsPage(events, loadingController, alertController, actionSheetController, camera, modalController, configService, settingService) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.modalController = modalController;
        this.configService = configService;
        this.settingService = settingService;
        this.storeName = '';
        this.storePhone = '';
        this.storeEmail = '';
        this.welcomeMsg = '';
        this.allowComment = true;
        this.commentMsg = '';
        this.showLoader = true;
        this.storeInfo = '';
        this.allowStoreInfo = true;
        this.storeAddress = {
            address: '',
            city: '',
            state: '',
            stateCode: '',
            lat: null,
            lng: null,
            pincode: null
        };
        this.signature = '';
        this.states = [];
        this.storeLogo = '';
        this.playstoreUrl = '';
        this.appStoreUrl = '';
        this.facebookUrl = '';
        this.twitterUrl = '';
        this.pinterestUrl = '';
        this.gmailUrl = '';
        this.linkedinUrl = '';
        this.instagramUrl = '';
        this.youtubeUrl = '';
        this.whatsappNumber = 0;
        this.shopInactive = false;
        this.inactiveMsg = '';
        this.externalContact = {
            name: '',
            link: ''
        };
        this.offerMsg = '';
        this.notificationMessage = '';
        this.allowImageUpload = {
            isActive: false,
            name: '',
            isMandatory: false,
        };
        this.loginPopup = {
            name: true,
            email: true,
            dob: true,
            gst: false,
            custom: {
                active: false,
                name: '',
            }
        };
        this.splashScreen = {
            active: false,
            bgColor: '',
            logo: '',
            timeout: '',
        };
        this.customOrder = {
            active: false,
            name: ''
        };
        this.customMessage = '';
        this.taxType = '';
        this.cancelTimeForUser = '';
        this.extraCharges = 0;
        this.extraChargeType = 'flat';
        this.char = this.configService.environment.currencyCode;
        this.toggleState = 'flt';
        this.maxCharge = 0;
        this.chargeName = '';
        this.isCustomInvoiceNo = false;
        this.verifyDeliveryOtp = true;
        this.doPaymentInCod = true;
        this.deliveryAcceptanceModel = {
            active: false,
            radius: 0,
        };
        this.isUserGstAvailable = true;
        this.notificationSettings = {
            outOfStockProducts: null
        };
    }
    AdminSettingsPage.prototype.ngOnInit = function () {
        this.ckeConfig = {
            allowedContent: true,
            height: 200
        };
        this.initializeSubscriptions();
        this.currencyCode = this.configService.environment.currencyCode;
        this.events.publish('admin-settings:getSettingsData');
        this.events.publish('admin-settings:getInvoiceData');
        this.events.publish('admin-settings:getAppData');
        this.events.publish('admin-settings:getStatesData');
        this.defaultCountryCode = this.configService.environment.defaultCountryCode;
        this.taxType = this.configService.environment.taxType;
    };
    AdminSettingsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    AdminSettingsPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var notificationSettingsData;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.events.subscribe('admin-settings:saveSettingsDataSuccess', function () {
                            _this.loading.dismiss();
                            _this.presentAlert('Data saved successfully!');
                        });
                        this.events.subscribe('admin-settings:publishStatesData', function (states) {
                            _this.states = states;
                        });
                        this.events.subscribe('admin-settings:publishSettingsData', function (data) {
                            console.log('publishSettingsData', data);
                            _this.showLoader = false;
                            if (data) {
                                _this.storeName = data.storeName ? data.storeName : '';
                                _this.storeEmail = data.storeEmail ? data.storeEmail : '';
                                _this.storePhone = data.storePhone.slice(3) ? data.storePhone.slice(3) : '';
                                _this.welcomeMsg = data.welcomeMsg ? data.welcomeMsg : '';
                                _this.allowComment = 'allowComment' in data ? data.allowComment : true;
                                _this.commentMsg = data.commentMsg ? data.commentMsg : '';
                                _this.allowStoreInfo = data.allowStoreInfo ? data.allowStoreInfo : true;
                                _this.allowImageUpload = data.allowImageUpload ? data.allowImageUpload : _this.allowImageUpload;
                                _this.storeInfo = data.storeInfo ? data.storeInfo : '';
                                _this.storeAddress = data.storeAddress ? data.storeAddress : _this.storeAddress;
                                _this.facebookUrl = data.facebookUrl ? data.facebookUrl : '';
                                _this.twitterUrl = data.twitterUrl ? data.twitterUrl : '';
                                _this.pinterestUrl = data.pinterestUrl ? data.pinterestUrl : '';
                                _this.gmailUrl = data.gmailUrl ? data.gmailUrl : '';
                                _this.linkedinUrl = data.linkedinUrl ? data.linkedinUrl : '';
                                _this.instagramUrl = data.instagramUrl ? data.instagramUrl : '';
                                _this.youtubeUrl = data.youtubeUrl ? data.youtubeUrl : '';
                                _this.whatsappNumber = data.whatsappNumber ? data.whatsappNumber : 0;
                                _this.shopInactive = typeof data.shopInactive !== undefined ? data.shopInactive : false;
                                _this.inactiveMsg = data.inactiveMsg ? data.inactiveMsg : '';
                                _this.offerMsg = data.offerMsg ? data.offerMsg : '';
                                _this.externalContact = data.hasOwnProperty('externalContact') ? data.externalContact : _this.externalContact;
                                _this.notificationMessage = data.notificationMessage ? data.notificationMessage : '';
                                _this.loginPopup = data.loginPopup ? data.loginPopup : _this.loginPopup;
                                _this.splashScreen = data.splashScreen ? data.splashScreen : _this.splashScreen;
                                _this.customMessage = data.customMessage ? data.customMessage : '';
                                _this.customOrder = data.custom ? data.custom : _this.customOrder;
                                _this.cancelTimeForUser = data.cancelTimeForUser ? data.cancelTimeForUser : '';
                                _this.extraCharges = data.extraCharge ? (data.extraCharge.charge ? data.extraCharge.charge : 0) : 0;
                                _this.extraChargeType = data.extraCharge ? (data.extraCharge.type ? data.extraCharge.type : 'flat') : 'flat';
                                _this.maxCharge = data.extraCharge ? (data.extraCharge.maxCharge ? data.extraCharge.maxCharge : 0) : 0;
                                _this.chargeName = data.extraCharge ? (data.extraCharge.chargeName ? data.extraCharge.chargeName : '') : '';
                                _this.verifyDeliveryOtp = 'verifyDeliveryOtp' in data ? data.verifyDeliveryOtp : _this.verifyDeliveryOtp;
                                console.log('data:', data);
                                _this.doPaymentInCod = 'doPaymentInCod' in data ? data.doPaymentInCod : _this.doPaymentInCod;
                                _this.deliveryAcceptanceModel = 'deliveryAcceptanceModel' in data ? data.deliveryAcceptanceModel : _this.deliveryAcceptanceModel;
                                // toggle state & char
                                if (data.extraCharge && data.extraCharge.type == 'percentage') {
                                    _this.toggleState = 'perc';
                                    _this.char = '%';
                                }
                            }
                        });
                        this.events.subscribe('admin-settings:publishInvoiceData', function (data) {
                            console.log('publishInvoiceData', data);
                            if (data) {
                                _this.signature = data.signature ? data.signature : '';
                                _this.storeLogo = data.shopLogo ? data.shopLogo : '';
                                _this.customMessage = data.customMessage ? data.customMessage : '';
                                _this.gstFirmName = data.gstFirmName ? data.gstFirmName : '';
                                _this.isCustomInvoiceNo = 'isCustomInvoiceNo' in data ? data.isCustomInvoiceNo : false;
                                _this.isUserGstAvailable = 'isUserGstAvailable' in data ? data.isUserGstAvailable : true;
                            }
                        });
                        this.events.subscribe('admin-settings:publishAppData', function (data) {
                            console.log('publishInvoiceData', data);
                            if (data) {
                                _this.appStoreUrl = data.appStoreUrl ? data.appStoreUrl : '';
                                _this.playstoreUrl = data.playstoreUrl ? data.playstoreUrl : '';
                            }
                        });
                        return [4 /*yield*/, this.settingService.getNotificationData()];
                    case 1:
                        notificationSettingsData = _a.sent();
                        if (notificationSettingsData) {
                            this.notificationSettings = notificationSettingsData;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminSettingsPage.prototype.allowCommentToggleChange = function () {
        if (this.allowComment) {
            this.allowComment = false;
        }
        else {
            this.allowComment = true;
        }
    };
    AdminSettingsPage.prototype.allowStoreInfoToggleChange = function () {
        if (this.allowStoreInfo) {
            this.allowStoreInfo = false;
        }
        else {
            this.allowStoreInfo = true;
        }
    };
    AdminSettingsPage.prototype.shopInactiveToggle = function () {
        this.shopInactive = !this.shopInactive;
    };
    AdminSettingsPage.prototype.onClickSaveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var settingsData, invoiceData, appData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.allowImageUpload.isActive && this.allowImageUpload.name === '')) return [3 /*break*/, 1];
                        this.presentAlert('Please fill Name under which image to be uploaded');
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.splashScreen.active && (!this.splashScreen.bgColor || !this.splashScreen.logo))) return [3 /*break*/, 2];
                        this.presentAlert('Please upload Splash logo and background color');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.presentLoading()];
                    case 3:
                        _a.sent();
                        settingsData = {
                            storeName: this.storeName,
                            storeEmail: this.storeEmail,
                            storePhone: this.configService.environment.defaultCountryCode + this.storePhone,
                            welcomeMsg: this.welcomeMsg,
                            allowComment: this.allowComment,
                            allowImageUpload: this.allowImageUpload,
                            commentMsg: this.commentMsg,
                            storeInfo: this.storeInfo,
                            allowStoreInfo: this.allowStoreInfo,
                            storeAddress: this.storeAddress,
                            facebookUrl: this.facebookUrl,
                            twitterUrl: this.twitterUrl,
                            pinterestUrl: this.pinterestUrl,
                            gmailUrl: this.gmailUrl,
                            linkedinUrl: this.linkedinUrl,
                            instagramUrl: this.instagramUrl,
                            youtubeUrl: this.youtubeUrl,
                            whatsappNumber: this.whatsappNumber,
                            shopInactive: this.shopInactive,
                            inactiveMsg: this.inactiveMsg,
                            externalContact: this.externalContact,
                            offerMsg: this.offerMsg,
                            notificationMessage: this.notificationMessage,
                            loginPopup: this.loginPopup,
                            splashScreen: this.splashScreen,
                            custom: this.customOrder,
                            cancelTimeForUser: this.cancelTimeForUser,
                            extraCharge: {
                                type: this.extraChargeType || 'flat',
                                charge: this.extraCharges || 0,
                                maxCharge: this.maxCharge || 0,
                                chargeName: this.chargeName || ''
                            },
                            verifyDeliveryOtp: this.verifyDeliveryOtp,
                            doPaymentInCod: this.doPaymentInCod,
                            deliveryAcceptanceModel: this.deliveryAcceptanceModel
                        };
                        invoiceData = {
                            signature: this.signature,
                            shopLogo: this.storeLogo,
                            customMessage: this.customMessage,
                            gstFirmName: this.gstFirmName,
                            isCustomInvoiceNo: this.isCustomInvoiceNo,
                            isUserGstAvailable: this.isUserGstAvailable
                        };
                        appData = {
                            appStoreUrl: this.appStoreUrl,
                            playstoreUrl: this.playstoreUrl
                        };
                        this.events.publish('admin-settings:saveSettingsData', settingsData, invoiceData, appData, this.notificationSettings);
                        console.log('log data :', settingsData);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminSettingsPage.prototype.openStateModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_4__["StatesModalPage"],
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('data from modal', res);
                            if (res.data) {
                                console.log(res.data);
                                _this.storeAddress.state = res.data.state;
                                _this.storeAddress.stateCode = res.data.code;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminSettingsPage.prototype.openImageActionSheet = function (imgType) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Select any option',
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.uploadImg('camera', imgType);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'image',
                                    handler: function () {
                                        _this.uploadImg('gallery', imgType);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminSettingsPage.prototype.uploadImg = function (cameraType, imgType) {
        var _this = this;
        var options = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        if (cameraType === 'gallery') {
            options['sourceType'] = 0;
        }
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            if (imgType === 'sign') {
                _this.signature = base64Image;
            }
            else {
                _this.storeLogo = base64Image;
            }
        }, function (err) {
            console.log(err);
        });
    };
    AdminSettingsPage.prototype.uploadImage = function (files, imgType) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                if (imgType === 'sign') {
                    _this.signature = base64Image;
                }
                else if (imgType === 'logo') {
                    _this.storeLogo = base64Image;
                }
                else {
                    _this.splashScreen.logo = base64Image;
                }
            };
        }
    };
    AdminSettingsPage.prototype.removeImg = function (imgType) {
        if (imgType === 'sign') {
            this.signature = '';
        }
        else if (imgType === 'logo') {
            this.storeLogo = '';
        }
        else {
            this.splashScreen.logo = '';
        }
    };
    AdminSettingsPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: img,
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminSettingsPage.prototype.presentAlert = function (desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
    AdminSettingsPage.prototype.presentLoading = function () {
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
    AdminSettingsPage.prototype.enterEstimatedTime = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var arr, mins, secs, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        if (this.cancelTimeForUser.length > 0) {
                            arr = this.cancelTimeForUser.split(':');
                        }
                        mins = arr.length > 0 ? arr[0] : '00';
                        secs = arr.length > 0 ? arr[1] : '00';
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Order Cancel Time',
                                inputs: [
                                    {
                                        name: 'mins',
                                        type: 'number',
                                        placeholder: 'Mins',
                                        value: parseInt(mins) == 0 ? null : mins
                                    },
                                    {
                                        name: 'secs',
                                        type: 'number',
                                        placeholder: 'Secs',
                                        value: parseInt(secs) == 0 ? null : secs
                                    }
                                ],
                                buttons: [{
                                        text: 'cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                        }
                                    }, {
                                        text: 'Add',
                                        handler: function (plan) {
                                            _this.cancelTimeForUser = (plan.mins ? plan.mins : '00') + ":" + (plan.secs ? plan.secs : '00');
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
    AdminSettingsPage.prototype.removeLimit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var removeResult;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.settingService.removeTimeLimit()];
                    case 1:
                        removeResult = _a.sent();
                        if (removeResult) {
                            this.presentAlert('Time Limit Removed!');
                        }
                        this.cancelTimeForUser = '';
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminSettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('admin-settings:saveSettingsDataSuccess');
        this.events.unsubscribe('admin-settings:publishSettingsData');
        this.events.unsubscribe('admin-settings:publishStatesData');
        this.events.unsubscribe('admin-settings:publishInvoiceData');
        this.events.unsubscribe('admin-settings:publishAppData');
    };
    AdminSettingsPage.prototype.extraChargesType = function (event) {
        this.extraChargeType = event.target.checked ? 'percentage' : 'flat';
        console.log('Type :', this.extraChargeType);
        console.log('Charge :', this.extraCharges);
        console.log('Max Charge :', this.maxCharge);
        console.log('Charge Name:', this.chargeName);
        if (event.target.checked) {
            this.char = '%';
            this.toggleState = 'perc';
        }
        else {
            this.char = this.currencyCode;
            this.toggleState = 'flt';
        }
        console.log('char :', this.char);
    };
    AdminSettingsPage.prototype.allowCustomInvoiceNo = function () {
        this.isCustomInvoiceNo = !this.isCustomInvoiceNo;
    };
    AdminSettingsPage.prototype.verifyOtpToggle = function () {
        this.verifyDeliveryOtp = !this.verifyDeliveryOtp;
    };
    AdminSettingsPage.prototype.doPaymentInCodToggle = function () {
        this.doPaymentInCod = !this.doPaymentInCod;
    };
    AdminSettingsPage.prototype.deliveryAcceptanceToggle = function () {
        this.deliveryAcceptanceModel.active = !this.deliveryAcceptanceModel.active;
    };
    // ? Use this function for toggle checkbox start
    AdminSettingsPage.prototype.toggleCheckbox = function (type) {
        if (type == "userGst") {
            this.isUserGstAvailable = !this.isUserGstAvailable;
        }
    };
    AdminSettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__["Camera"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] },
        { type: src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_6__["AdminSettingsService"] }
    ]; };
    AdminSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-settings',
            template: __webpack_require__(/*! raw-loader!./admin-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-settings/admin-settings.page.html"),
            styles: [__webpack_require__(/*! ./admin-settings.page.scss */ "./src/app/admin/admin-settings/admin-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__["Camera"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"],
            src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_6__["AdminSettingsService"]])
    ], AdminSettingsPage);
    return AdminSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-settings-admin-settings-module-es5.js.map