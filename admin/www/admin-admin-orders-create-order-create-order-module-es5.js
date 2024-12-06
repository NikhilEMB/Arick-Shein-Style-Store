(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-orders-create-order-create-order-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/create-order/create-order.page.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-orders/create-order/create-order.page.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"{{this.userRole === 'admin' ? 'admin-orders' : 'vendor-orders'}}\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Create Order</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 1; else step1Completed;\">1</ion-label>\r\n      <ng-template #step1Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>Select User</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 2; else step3Completed;\">2</ion-label>\r\n      <ng-template #step2Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>User Details</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 3; else step3Completed;\">3</ion-label>\r\n      <ng-template #step3Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>Select Products</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 4; else step4Completed;\">4</ion-label>\r\n      <ng-template #step4Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>Order Summary</ion-label>\r\n    </super-tab-button>\r\n\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"8\">\r\n                <div class=\"searchArea\">\r\n                  <input class=\"searchInput\" [(ngModel)]=\"searchValue\" placeholder=\"Search by name, phone number\">\r\n                  &nbsp;\r\n                  <ion-button (click)='typeSenseSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n                  <!-- <ion-button (click)='clearSearch()' size=\"small\">Show All</ion-button> -->\r\n                </div>\r\n                <!-- <div class=\"input-wrap\">\r\n                  <ion-col size=\"6\" style=\"display: flex;align-items: center;\">\r\n                    <input placeholder=\"Enter name\" [(ngModel)]=\"searchUser\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearPhone()'(keyup.enter)='fireSearchQuery()'>&nbsp;\r\n                    <input placeholder=\"Enter number\" [maxlength]='phoneLimit' [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()' (keyup.enter)='fireSearchQuery()'>&nbsp;\r\n                    <ion-button (click)='fireSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n                  </ion-col>\r\n                </div> -->\r\n                <ion-list class=\"ion-no-padding list\" lines=\"none\">\r\n                  <ion-item class=\"ion-no-padding\" *ngFor=\"let user of userList; let i = index\">\r\n                    <ion-grid class=\"ion-no-padding\">\r\n                      <ion-row class=\"ion-align-items-center\">\r\n                        <ion-col size=\"2\">\r\n                          <ion-thumbnail class=\"thumbnail\">\r\n                            <img src=\"{{user.dP}}\">\r\n                          </ion-thumbnail>\r\n                        </ion-col>\r\n                        <ion-col size=\"7\">\r\n                          <p class=\"ion-text-capitalize\">{{user.name}}</p>\r\n                          <p>{{user.phoneNo}}</p>\r\n                        </ion-col>\r\n                        <ion-col size=\"3\">\r\n                          <p class=\"ion-text-center ion-text-uppercase\" class=\"bs-product-added\" *ngIf=\"user.selected\">\r\n                            <i class=\"flaticon-null-20 green\"></i></p>\r\n                          <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" *ngIf=\"!user.selected\"\r\n                            (click)=\"selectUser(user.name, user.phoneNo, user.id, i, user.subRole)\">Select</ion-button>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </ion-item>\r\n                </ion-list>\r\n              </ion-col>\r\n\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ng-container *ngIf=\"statusIndex < 2; else step2Allowed;\">\r\n            <p>Please select user at step 1 before proceeding further.</p>\r\n          </ng-container>\r\n          <ng-template #step2Allowed>\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>User Shipping Address</ion-label>\r\n                    <ion-textarea type=\"text\" row=\"3\" class=\"form-input\" [(ngModel)]=\"userAddress.address\"\r\n                      >\r\n                    </ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>City</p>\r\n                    <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"userAddress.city\"\r\n                      ></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>Pincode</p>\r\n                    <ion-input type=\"string\" class=\"form-input\" [(ngModel)]=\"userAddress.pincode\"\r\n                      ></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>State</p>\r\n                    <div class=\"form-input state-wrapper\" (click)=\"openStateModal('shipping')\">\r\n                      <div *ngIf=\"userAddress.state\">{{userAddress.state}}</div>\r\n                      <div *ngIf=\"!userAddress.state\">Select State</div>\r\n                      <div>\r\n                        <i class=\"flaticon-null-13\"></i>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div>\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Billing Address same as Shipping Address</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"shippingSameAsBilling\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row *ngIf=\"!shippingSameAsBilling\">\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>User Billing Address</ion-label>\r\n                    <ion-textarea type=\"text\" row=\"3\" class=\"form-input\" [(ngModel)]=\"billingAddress.address\"\r\n                      >\r\n                    </ion-textarea>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>City</p>\r\n                    <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"billingAddress.city\"\r\n                      ></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>Pincode</p>\r\n                    <ion-input type=\"string\" class=\"form-input\" [(ngModel)]=\"billingAddress.pincode\"\r\n                      ></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div>\r\n                    <p>State</p>\r\n                    <div class=\"form-input state-wrapper\" (click)=\"openStateModal('billing')\">\r\n                      <div *ngIf=\"billingAddress.state\">{{billingAddress.state}}</div>\r\n                      <div *ngIf=\"!billingAddress.state\">Select State</div>\r\n                      <div>\r\n                        <i class=\"flaticon-null-13\"></i>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row class=\"m-t-16\">\r\n                <ion-col size=\"6\">\r\n                  <div>\r\n                    <p>Customer {{taxType}} Number</p>\r\n                    <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"customerGstNo\"\r\n                      ></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n            <ion-footer no-border class=\"page-footer\">\r\n              <div class=\"main-container footer-no-border\">\r\n                <ion-button (click)=\"saveAddress()\" shape=\"round\" class=\"btn-1 i-start\"\r\n                  color=\"success\">\r\n                  <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                  Save\r\n                </ion-button>\r\n              </div>\r\n            </ion-footer>\r\n          </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n\r\n          <ng-container *ngIf=\"statusIndex < 3; else step3Allowed;\">\r\n            <p>Please select user at step 1 before selecting products.</p>\r\n          </ng-container>\r\n\r\n          <ng-template #step3Allowed>\r\n            <ng-container *ngIf=\"statusIndex >= 3\">\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <ion-col size=\"8\">\r\n                    <div class=\"input-wrap\">\r\n                      <ion-label>Enter product name</ion-label>\r\n                      <ion-input class=\"form-input\" type=\"text\" placeholder=\"Search for products...\"\r\n                        [(ngModel)]=\"searchProduct\" (ngModelChange)=\"fireSearchQueryForProduct()\" autocapitalize>\r\n                      </ion-input>\r\n                    </div>\r\n                    <ion-list class=\"ion-no-padding list\" lines=\"none\">\r\n                      <ion-item class=\"ion-no-padding\" *ngFor=\"let item of productList; let i = index\">\r\n                        <ion-grid class=\"ion-no-padding\">\r\n                          <ion-row class=\"ion-align-items-center\">\r\n                            <ion-col size=\"3\">\r\n                              <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                                <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                                  src=\"{{item.coverPic.url}}\">\r\n                                <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                                  src=\"{{item.coverPic.thumb}}\">\r\n                                <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                              </ion-thumbnail>\r\n                            </ion-col>\r\n                            <ion-col size=\"6\">\r\n                              <p class=\"ion-text-capitalize ion-text-center\">{{item.prodName}}</p>\r\n                              <p class=\"ion-text-capitalize ion-text-center\">Price:\r\n                                {{item.discountedPrice | currency: currencyCode:true}}</p>\r\n                            </ion-col>\r\n                            <ion-col *ngIf=\"item.status && item.productQty > 0;else noStatus\" size=\"3\">\r\n                              <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"addProduct(item, i)\" *ngIf=\"!item.added && !item.isPriceList\">Add</ion-button>\r\n                                <p class=\"green ion-text-uppercase\" style=\"display: inline;\" *ngIf=\"item.added && !item.isPriceList\">Added</p> \r\n                                <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"addProduct(item, i)\" *ngIf=\"item.isPriceList\">Select</ion-button>\r\n                                <ion-button class=\"btn-sml\" style=\"margin-left:10px\" shape=\"round\" fill=\"outline\" (click)=\"subscribeProduct(item)\" *ngIf=\" item.subscription && item.subscription.isAllowed && subscriptionFeature && !item.isPriceList\">Subscribe</ion-button>\r\n                            </ion-col>\r\n                            <ng-template #noStatus>\r\n                              <ion-col size=\"3\">\r\n                                <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"addProduct(item, i)\" *ngIf=\"item.isPriceList\">Select</ion-button>\r\n                                <ion-text *ngIf=\"!item.status && !item.isPriceList\" color=\"danger\">InActive</ion-text>\r\n                                <ion-text *ngIf=\"0 >= item.productQty && item.status && !item.isPriceList\" color=\"danger\">Out Of Stock</ion-text>\r\n                              </ion-col>\r\n                            </ng-template>\r\n                          </ion-row>\r\n                        </ion-grid>\r\n                      </ion-item>\r\n                    </ion-list>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ng-container>\r\n          </ng-template>\r\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"searchMoreProducts($event)\" *ngIf=\"searchProduct\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more products...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n\r\n          <ng-container *ngIf=\"statusIndex < 4; else step4Allowed;\">\r\n            <p>Please select product before accessing this step.</p>\r\n          </ng-container>\r\n          <ng-template #step4Allowed>\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\" size-md=\"4\">\r\n                  <div class=\"address-wrap\">\r\n                    <h3 class=\"delivery-heading\">Shipping Address</h3>\r\n                    <p> <strong>{{selectedUser.name}}</strong><br>\r\n                      {{userAddress.address}}<br>\r\n                      {{userAddress.city}}<br>\r\n                      {{userAddress.state}}<br>\r\n                      {{userAddress.pincode}}\r\n                    </p>\r\n                    <p><strong>Phone Number</strong> - {{selectedUser.phoneNo}}</p>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\" size-md=\"4\">\r\n                  <div class=\"address-wrap\">\r\n                    <h3 class=\"delivery-heading\">Billing Address</h3>\r\n                    <p> <strong>{{selectedUser.name}}</strong><br>\r\n                      {{billingAddress.address}}<br>\r\n                      {{billingAddress.city}}<br>\r\n                      {{billingAddress.state}}<br>\r\n                      {{billingAddress.pincode}}\r\n                    </p>\r\n                    <p><strong>Phone Number</strong> - {{selectedUser.phoneNo}}</p>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n            <!-- *ngIf=\"isRFQ\" -->\r\n            <ng-container>\r\n              <div class=\"divider\"></div>\r\n            \r\n              <div class=\"flex-label\">\r\n                <ion-label>Quotation Order</ion-label>\r\n                <ion-toggle [(ngModel)]=\"isQuotationOrder\"></ion-toggle>\r\n              </div>\r\n            </ng-container>\r\n            <div class=\"divider\"></div>\r\n            <div class=\"order-items-detail-wrapper\">\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <ion-col size=\"12\" size-xl=\"8\">\r\n                    <ion-text color=\"danger\" *ngIf=\"userRole == 'manager'\">\r\n                      <span>*Discounted price is disabled for manager.</span>\r\n                    </ion-text>\r\n                    <div *ngFor=\"let product of productsAdded; let i=index\">\r\n                      <ion-item class=\"ion-no-padding\">\r\n                        <ion-row style=\"width: 100%;\">\r\n                          <ion-col size=\"2\" class=\"vertical-center\">\r\n                            <div *ngIf=\"product.img?.mob\"\r\n                              [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"product-image\"></div>\r\n                            <div *ngIf=\"!product.img.mob\"\r\n                              [ngStyle]=\"{'background': 'url(' + product.img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"product-image\"></div>\r\n                          </ion-col>\r\n                          <ion-col size=\"4\">\r\n                            <div>\r\n                              <h3 class=\"product-name ion-text-wrap\"><strong>{{product.name}} \r\n                                <span *ngIf=\"product.description.length>0\">({{product.description}})</span>\r\n                              </strong></h3>\r\n                              <div *ngIf=\"(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                                \r\n                            <h3 class=\"product-name ion-text-wrap\"><strong>Subscription</strong></h3>\r\n                            <h3 class=\"ion-text-wrap product-name\"><strong> Quantity per day:\r\n                              {{product.subData.qtyPerDay}}</strong></h3>\r\n                          <h3 class=\"ion-text-wrap product-name\" *ngIf=\"product.subData.deliveryDays.length > 0\">\r\n                            <strong>Total selected days:\r\n                              {{product.subData.deliveryDays.length}}</strong>\r\n                          </h3>\r\n                          <h3 class=\"ion-text-wrap product-name\" *ngIf=\"product.subData.deliveryDates.length > 0\">\r\n                            <strong>\r\n                              Total selected dates:\r\n                              {{product.subData.deliveryDates.length}}</strong>\r\n                          </h3>\r\n                          <h3 class=\"ion-text-wrap product-name\" *ngIf=\"product.subData.type === 'weekly'\">\r\n                            <strong>\r\n                              Total weeks: {{product.subData.totalWeeks}}</strong>\r\n                          </h3>\r\n                          <h3 class=\"ion-text-wrap product-name\" *ngIf=\"product.subData.type === 'monthly'\">\r\n                            <strong>\r\n                              Total months: {{product.subData.totalMonths}}</strong>\r\n                          </h3>\r\n                          <h3 class=\"ion-text-wrap product-name\">\r\n                            <strong>\r\n                              Total deliveries:\r\n                                {{product.subData.totalDeliveries}}</strong>\r\n                            </h3>\r\n                              </div>\r\n                              <div *ngIf=\"!(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                                <h3 class=\"product-quantity product-name\">QTY: {{product.quantity}}</h3>\r\n                                <div class=\"qty-container\">\r\n                                  <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"decrement(i)\">-\r\n                                  </ion-button>\r\n                                  <ion-button class=\"btn-sml qty-btn\" shape=\"round\" fill=\"outline\" (click)=\"onClickQty(i)\">{{product.quantity}}\r\n                                  </ion-button>\r\n                                  <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"increment(i)\">+\r\n                                  </ion-button>\r\n                                </div>\r\n                              </div>\r\n                              </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"3\">\r\n                            <div *ngIf=\"!(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                              <h3 class=\"product-name\"><strong>Price(per qty)</strong></h3>\r\n                              <h3 class=\"product-quantity product-name\">{{product.mrpPrice | currency: currencyCode:true}}</h3>\r\n                            </div>\r\n                            <div *ngIf=\"(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                              <h3><strong>\r\n                                {{product.price * product.quantity | currency: currencyCode:true:'0.0'}}</strong></h3>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"3\">\r\n                            <div>\r\n                              <div *ngIf=\"!(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                                <h3 class=\"product-name\"><strong>Discounted Price(per qty)</strong></h3>\r\n                                <ion-input class=\"form-input discount-price-input\" type=\"number\" [disabled]=\"orderBy.role == 'manager'\"\r\n                                  [(ngModel)]=\"product.price\" (ionChange)=\"onChangeDiscountedPrice()\"></ion-input>\r\n                              </div>\r\n                            </div>\r\n                            <div *ngIf=\"(product.hasOwnProperty('orderType') && product.orderType === 'subscription')\">\r\n                              <ion-button fill=\"clear\" color=\"danger\" (click)=\"removeSubscribedProduct(i)\" class=\"remove-btn\">\r\n                                <ion-icon name=\"trash\" class=\"remove-icon\" slot=\"icon-only\"></ion-icon>\r\n                              </ion-button>\r\n                            </div>\r\n                          </ion-col>\r\n                          \r\n                          <ion-col size=\"12\" *ngIf=\"showCommentBoxAndImage\">\r\n                            <ion-textarea class=\"form-input\" row=\"2\" placeholder=\"add comment\" [(ngModel)]=\"product.commentMsg\" autocapitalize>\r\n                            </ion-textarea>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\">\r\n                            <div class=\"comment-imgs-wrapper\"\r\n                              *ngIf=\"showCommentBoxAndImage && (!product.hasOwnProperty('orderType') || (product.hasOwnProperty('orderType') && product.orderType !== 'membership'))\">\r\n                              <div class=\"add-imgs-btn\">\r\n                                <label [for]=\"'upload-comment' + i\">Attach Images</label>\r\n                                <input [id]=\"'upload-comment' + i\" type=\"file\" [name]=\"'myfile' + i\"\r\n                                  (change)=\"uploadCommentImgs($event.target.files, product.productId)\" multiple />\r\n                              </div>\r\n                          \r\n                              <div class=\"comment-imgs\">\r\n                                <div class=\"img\" *ngFor=\"let img of listOfCommentImages[product.productId]; let imgIndex = index\">\r\n                                  <ion-img [src]=\"img\" (click)=\"imgZoom(img)\"></ion-img>\r\n                                  <div class=\"remove-btn\" (click)=\"removeCommentImage(imgIndex, product.productId)\">\r\n                                    <ion-icon name=\"remove-circle\" color=\"primary\"></ion-icon>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n\r\n                        </ion-row>\r\n                      </ion-item>\r\n                    </div>\r\n                  </ion-col> \r\n                  <ion-col size=\"12\" size-xl=\"4\">\r\n                    <div class=\"order-summery-wrapper\">\r\n                      <h3>Order Summary</h3>\r\n                      <div class=\"coupon-wrapper\">\r\n                        <div class=\"coupon-wrap\">\r\n                          <ion-input\r\n                            class=\"form-input coupon-input\"\r\n                            placeholder=\"{{'Apply Coupon'}}\"\r\n                            [(ngModel)]=\"couponCode\"\r\n                            readonly\r\n                            (ionChange)=\"textUppercase()\"\r\n                            (click)=\"openCouponsModal()\"\r\n                          ></ion-input>\r\n    \r\n                          <div class=\"btn-wrap\">\r\n                            <ion-button\r\n                              class=\"btn-sml\"\r\n                              (click)=\"openCouponsModal()\"\r\n                              *ngIf=\"!couponApplied\"\r\n                              fill=\"clear\"\r\n                            >\r\n                              <i class=\"flaticon-next\"></i>\r\n                            </ion-button>\r\n    \r\n                            <ion-button\r\n                              class=\"btn-sml\"\r\n                              color=\"gray\"\r\n                              fill=\"outline\"\r\n                              (click)=\"removeCouponCode()\"\r\n                              *ngIf=\"couponApplied\"\r\n                            >\r\n                              {{'Remove'}}\r\n                            </ion-button>\r\n                          </div>\r\n                        </div>\r\n                        <span class=\"coupon-status success\" *ngIf=\"couponApplied\"\r\n                          >{{'Coupon Applied'}}</span\r\n                        >\r\n                      </div>\r\n                      <table>\r\n                        <tr>\r\n                          <td>Number of Items</td>\r\n                          <td>{{productsAdded.length}} items</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td>Price</td>\r\n                          <td>{{calcOrderSummaryPrice() | currency: currencyCode:true}}\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td>{{taxType}}</td>\r\n                          <td>{{calcOrderSummaryGst() | currency: currencyCode:true:'0.0'}}</td>\r\n                        </tr>\r\n\r\n                        <tr *ngIf=\"couponDiscount !== 0\">\r\n                          <td>Coupon Discount</td>\r\n                          <td class=\"color-success\">\r\n                            -{{couponDiscount | currency:\r\n                            currencyCode:true:'.2-2'}}\r\n                          </td>\r\n                        </tr>\r\n\r\n                        <tr>\r\n                          <td>Delivery Charges</td>\r\n                          <td>\r\n                            <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"delivery\"></ion-input>\r\n                          </td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderBy.role != 'manager'\">\r\n                          <td>Additional Discount</td>\r\n                          <td>\r\n                            <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"additionalDiscount\">\r\n                            </ion-input>\r\n                          </td>\r\n                        </tr>\r\n                      </table>\r\n                      <div class=\"sub-total-wrap\">\r\n                        <table>\r\n                          <tr>\r\n                            <td>\r\n                              <h3>Total Amount</h3>\r\n                              <p>(Incl of all taxes)</p>\r\n                            </td>\r\n                            <td>\r\n                              <!-- <h3 *ngIf=\"!couponApplied\">{{calcOrderSummaryTotalAmtToPaid() | currency: currencyCode:true}}</h3>\r\n                              <h3 *ngIf=\"couponApplied\">{{totalAmountToPaid | currency: currencyCode:true}}</h3> -->\r\n                              <h3>{{calcOrderSummaryTotalAmtToPaid() | currency: currencyCode:true}}</h3>\r\n\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </div>\r\n                      <div class=\"white-sep\"></div>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n          </ng-template>\r\n          <ion-footer *ngIf=\"statusIndex == 4\" class=\"page-footer\" no-border>\r\n            <div class=\"main-container footer-no-border\">\r\n              <ion-button [disabled]=\"calcOrderSummaryTotalAmtToPaid() < 0\" (click)=\"saveOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n                <i class=\"flaticon-null-20\"></i>\r\n                Save Order\r\n              </ion-button>\r\n            </div>\r\n          </ion-footer>\r\n        </div>\r\n      </ion-content>\r\n\r\n    </super-tab>\r\n\r\n\r\n\r\n\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-orders/create-order/create-order.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/admin-orders/create-order/create-order.module.ts ***!
  \************************************************************************/
/*! exports provided: CreateOrderPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateOrderPageModule", function() { return CreateOrderPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_order_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-order.page */ "./src/app/admin/admin-orders/create-order/create-order.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _create_order_page__WEBPACK_IMPORTED_MODULE_6__["CreateOrderPage"]
    }
];
var CreateOrderPageModule = /** @class */ (function () {
    function CreateOrderPageModule() {
    }
    CreateOrderPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            ],
            declarations: [_create_order_page__WEBPACK_IMPORTED_MODULE_6__["CreateOrderPage"]]
        })
    ], CreateOrderPageModule);
    return CreateOrderPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-orders/create-order/create-order.page.scss":
/*!************************************************************************!*\
  !*** ./src/app/admin/admin-orders/create-order/create-order.page.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\nion-grid {\n  background: #fff;\n}\n.input-wrap ion-label {\n  text-transform: capitalize;\n}\nsuper-tabs-toolbar .check-icon {\n  color: var(--ion-color-success);\n  font-size: 32px;\n}\nsuper-tabs-toolbar .step-count {\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  background: #3F51B5;\n  color: #fff;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin-bottom: 5px;\n}\n.coupon-wrapper {\n  margin: 21px 0;\n}\n.coupon-wrapper .coupon-wrap {\n  position: relative;\n}\n.coupon-wrapper .coupon-wrap .btn-wrap {\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  z-index: 9;\n}\n.coupon-wrapper .coupon-status {\n  margin: 6px 0 0 12px;\n  display: inline-block;\n}\n.coupon-wrapper .coupon-status.success {\n  color: var(--ion-color-success);\n}\n.coupon-wrapper .coupon-status.error {\n  color: var(--ion-color-danger);\n}\n.coupon-wrapper .coupon-input {\n  margin: 0;\n  position: relative;\n  --padding-start: 54px;\n  font-size: 16px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n}\n.coupon-wrapper .coupon-input.success {\n  border: var(--ion-color-success) 1px solid;\n  color: var(--ion-color-success);\n}\n.coupon-wrapper .coupon-input.error {\n  border: var(--ion-color-danger) 1px solid;\n  color: var(--ion-color-danger);\n}\n.coupon-wrapper .coupon-input:before {\n  content: \"\";\n  font-family: Flaticon;\n  position: absolute;\n  top: 50%;\n  left: 16px;\n  -webkit-transform: translateX(-50%);\n  transform: translateY(-50%);\n  font-size: 24px;\n  font-weight: normal;\n}\ntable {\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  table-layout: fixed;\n}\ntable caption {\n  font-size: 1.5em;\n  margin: 0.5em 0 0.75em;\n}\ntable tr {\n  padding: 0.35em;\n}\ntable th,\ntable td {\n  padding: 0.625em;\n}\ntable th {\n  font-size: 0.85em;\n  letter-spacing: 0.1em;\n  text-transform: capitalize;\n}\n.tracking-link {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.tracking-link p {\n  background-color: #f8f8f8;\n  border: 1px solid #ddd;\n  padding: 15px;\n  border-radius: 5px;\n}\n.tracking-link .copy-link {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-left: 15px;\n}\n.tracking-link .copy-link ion-icon {\n  font-size: 20px;\n}\n.tracking-link .copy-link ion-text {\n  opacity: 0.8;\n}\n.url-links {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  text-align: center;\n  margin-right: 15px;\n  text-transform: capitalize;\n}\n.url-links ion-button {\n  margin-top: 20px;\n}\n@media screen and (max-width: 600px) {\n  table {\n    border: 0;\n  }\n\n  table caption {\n    font-size: 1.3em;\n  }\n\n  table thead {\n    border: none;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n  }\n\n  table tr {\n    border-bottom: 3px solid #ddd;\n    display: block;\n    margin-bottom: 0.625em;\n  }\n\n  table td {\n    border-bottom: 1px solid #ddd;\n    display: block;\n    font-size: 0.8em;\n    text-align: right;\n  }\n\n  table td::before {\n    /*\n    * aria-label has no advantage, it won't be read inside a table\n    content: attr(aria-label);\n    */\n    content: attr(data-label);\n    float: left;\n    font-weight: bold;\n    text-transform: uppercase;\n  }\n\n  table td:last-child {\n    border-bottom: 0;\n  }\n}\n.green {\n  color: var(--ion-color-success);\n}\n.red {\n  color: var(--ion-color-danger);\n}\n.fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n.justify-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.state-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.state-name {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.flaticon-null-13 {\n  opacity: 0.6;\n}\n.flaticon-null-13::before {\n  font-size: 12px;\n}\n.value-button {\n  display: inline-block;\n  border: 1px solid #ddd;\n  margin: 0px;\n  width: 40px;\n  height: 20px;\n  text-align: center;\n  vertical-align: middle;\n  padding: 11px 0;\n  background: #eee;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.value-button:hover {\n  cursor: pointer;\n}\n#decrease {\n  margin-right: -4px;\n  border-radius: 8px 0 0 8px;\n}\n#increase {\n  margin-left: -4px;\n  border-radius: 0 8px 8px 0;\n}\n#input-wrap {\n  margin: 0px;\n  padding: 0px;\n}\ninput#number {\n  text-align: center;\n  border: none;\n  border-top: 1px solid #ddd;\n  border-bottom: 1px solid #ddd;\n  margin: 0px;\n  width: 40px;\n  height: 40px;\n}\n#number::-webkit-inner-spin-button,\n#number::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.qty-btn {\n  margin: 0px 5px;\n}\n.remove-btn {\n  margin-top: 16px;\n}\nion-icon.remove-icon {\n  font-size: 26px;\n}\n.vertical-center {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.order-details {\n  margin-top: 24px;\n}\n.address-wrap {\n  border-left: var(--ion-color-medium) 1px solid;\n  padding: 24px;\n}\n.address-wrap h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.divider {\n  border-bottom: solid 1px var(--ion-color-medium);\n  margin: 26px 0;\n}\n.items-wrapper table {\n  width: 100%;\n}\n.items-wrapper table td {\n  padding: 8px;\n  border-bottom: var(--ion-color-light) 1px solid;\n}\n.items-wrapper table td.img {\n  width: 64px;\n}\n.items-wrapper table td.img img {\n  width: 100%;\n}\n.items-wrapper table td.price-detail {\n  color: #333;\n}\n.items-wrapper table td.total-price {\n  color: var(--ion-color-success);\n}\n.items-wrapper table .item-qty {\n  color: #333;\n}\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n.product-name {\n  font-size: 18px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n.toggle {\n  padding: 24px;\n  text-align: center;\n  border-top: var(--ion-color-medium) 1px solid;\n  margin: 26px -24px -24px -24px;\n  color: var(--ion-color-primary);\n  cursor: pointer;\n}\n.order-summery-wrapper {\n  background: var(--ion-color-medium);\n  padding: 24px;\n  border-radius: 16px;\n  margin-left: 26px;\n}\n.order-summery-wrapper h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.order-summery-wrapper table {\n  width: 100%;\n}\n.order-summery-wrapper table td {\n  padding: 4px 0;\n}\n.order-summery-wrapper table td:last-child {\n  text-align: right;\n}\n.order-summery-wrapper .sub-total-wrap {\n  border-top: #ccc 1px solid;\n  margin-top: 16px;\n  padding-top: 16px;\n}\n.order-summery-wrapper .sub-total-wrap h3 {\n  font-size: 18px;\n  display: inline;\n}\n.order-summery-wrapper .sub-total-wrap span {\n  margin-left: 6px;\n  font-size: 10px;\n}\n.order-summery-wrapper .pay-method-wrap {\n  border-top: #fff 1px solid;\n  margin: 16px -24px -24px -24px;\n  padding: 16px 24px;\n}\n.delivery-heading {\n  margin-bottom: 10px !important;\n  font-size: 20px !important;\n}\n/********************** multistep ************************/\nspan.date {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 110px;\n}\n.fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n/**********************multistep end************************/\n@media (max-width: 1200px) {\n  .order-summery-wrapper {\n    margin-left: 0;\n    margin-top: 26px;\n  }\n}\n@media (max-width: 992px) {\n  .address-wrap {\n    border-left: 0;\n    border-top: var(--ion-color-medium) 1px solid;\n  }\n}\n@media (max-width: 500px) {\n  .header {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n  }\n  .header .btn-2-outline {\n    margin-top: 16px;\n  }\n}\n.previewImg {\n  padding: 10px;\n  border-radius: 10px;\n}\n.discount-price-input {\n  margin-top: 0px;\n  padding-left: 16px !important;\n}\n.footer-no-border {\n  border-left: 0px !important;\n  border-right: 0px !important;\n}\n.comment-imgs-wrapper .add-imgs-btn {\n  margin-top: 10px;\n}\n.comment-imgs-wrapper .add-imgs-btn label {\n  color: var(--ion-color-primary);\n  cursor: pointer;\n}\n.comment-imgs-wrapper .add-imgs-btn input[type=file] {\n  display: none;\n}\n.comment-imgs-wrapper .comment-imgs {\n  margin-right: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  flex-wrap: wrap;\n}\n.comment-imgs-wrapper .comment-imgs .img {\n  cursor: pointer;\n  position: relative;\n  margin-right: 15px;\n  margin-top: 15px;\n}\n.comment-imgs-wrapper .comment-imgs .img ion-img {\n  width: 60px;\n  height: 60px;\n  -o-object-fit: fill;\n     object-fit: fill;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.comment-imgs-wrapper .comment-imgs .img .remove-btn {\n  position: absolute;\n  top: -20px;\n  right: -20px;\n  font-size: 20px;\n}\n.comment-imgs-wrapper .comment-imgs .img .remove-btn ion-icon {\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tb3JkZXJzL2NyZWF0ZS1vcmRlci9jcmVhdGUtb3JkZXIucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1vcmRlcnMvY3JlYXRlLW9yZGVyL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4tb3JkZXJzXFxjcmVhdGUtb3JkZXJcXGNyZWF0ZS1vcmRlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCO0VBQ0ksZ0JBQUE7QURFSjtBQ0VFO0VBQ0UsMEJBQUE7QURDSjtBQ0lJO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FERFI7QUNHSTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0FERFI7QUNJQTtFQUNFLGNBQUE7QURERjtBQ0VFO0VBQ0Usa0JBQUE7QURBSjtBQ0NJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxVQUFBO0FEQ047QUNFRTtFQUNFLG9CQUFBO0VBQ0EscUJBQUE7QURBSjtBQ0NJO0VBQ0UsK0JBQUE7QURDTjtBQ0NJO0VBQ0UsOEJBQUE7QURDTjtBQ0VFO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FEQUo7QUNDSTtFQUNFLDBDQUFBO0VBQ0EsK0JBQUE7QURDTjtBQ0NJO0VBQ0UseUNBQUE7RUFDQSw4QkFBQTtBRENOO0FDQ0k7RUFDRSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsbUNBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBRENOO0FDR0E7RUFFSSx5QkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FEREo7QUNJRTtFQUNFLGdCQUFBO0VBQ0Esc0JBQUE7QURESjtBQ0lFO0VBR0UsZUFBQTtBREhKO0FDTUU7O0VBRUUsZ0JBQUE7QURISjtBQ09FO0VBQ0UsaUJBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0FESko7QUNPRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FESko7QUNLSTtFQUNFLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QURITjtBQ09JO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGlCQUFBO0FETE47QUNNTTtFQUNFLGVBQUE7QURKUjtBQ01NO0VBQ0UsWUFBQTtBREpSO0FDU0U7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtBRE5KO0FDT0k7RUFDRSxnQkFBQTtBRExOO0FDU0U7RUFDRTtJQUNFLFNBQUE7RUROSjs7RUNTRTtJQUNFLGdCQUFBO0VETko7O0VDU0U7SUFDRSxZQUFBO0lBQ0EsbUJBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGdCQUFBO0lBQ0EsVUFBQTtJQUNBLGtCQUFBO0lBQ0EsVUFBQTtFRE5KOztFQ1NFO0lBQ0UsNkJBQUE7SUFDQSxjQUFBO0lBQ0Esc0JBQUE7RUROSjs7RUNTRTtJQUNFLDZCQUFBO0lBQ0EsY0FBQTtJQUNBLGdCQUFBO0lBQ0EsaUJBQUE7RUROSjs7RUNTRTtJQUNFOzs7S0FBQTtJQUlBLHlCQUFBO0lBQ0EsV0FBQTtJQUNBLGlCQUFBO0lBQ0EseUJBQUE7RUROSjs7RUNTRTtJQUNFLGdCQUFBO0VETko7QUFDRjtBQ1NBO0VBQ0UsK0JBQUE7QURQRjtBQ1NBO0VBQ0UsOEJBQUE7QURORjtBQ1NBO0VBQ0UsK0JBQUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7QUROSjtBQ1FBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBRExGO0FDUUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FETEY7QUNRQTtFQUNFLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBRExGO0FDUUE7RUFDRSxZQUFBO0FETEY7QUNPQTtFQUNFLGVBQUE7QURKRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBRUEsc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FETEY7QUNRQTtFQUNFLGVBQUE7QURMRjtBQ1FBO0VBQ0Usa0JBQUE7RUFDQSwwQkFBQTtBRExGO0FDUUE7RUFDRSxpQkFBQTtFQUNBLDBCQUFBO0FETEY7QUNRQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FETEY7QUNRQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QURMRjtBQ1FBOztFQUVJLHdCQUFBO0VBQ0EsU0FBQTtBRExKO0FDUUE7RUFDRSxlQUFBO0FETEY7QUNTQTtFQUNFLGdCQUFBO0FETkY7QUNRQTtFQUFxQixlQUFBO0FESnJCO0FDS0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FERkY7QUNJQTtFQUFlLGdCQUFBO0FEQWY7QUNFQTtFQUNFLDhDQUFBO0VBQ0UsYUFBQTtBRENKO0FDQ0U7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FEQ0o7QUNHQTtFQUNFLGdEQUFBO0VBQ0EsY0FBQTtBREFGO0FDR0U7RUFDRSxXQUFBO0FEQUo7QUNDSTtFQUFHLFlBQUE7RUFBYSwrQ0FBQTtBREdwQjtBQ0ZJO0VBQ0UsV0FBQTtBRElOO0FDSE07RUFBSSxXQUFBO0FETVY7QUNKSTtFQUFnQixXQUFBO0FET3BCO0FDTkk7RUFBZSwrQkFBQTtBRFNuQjtBQ1JJO0VBQVUsV0FBQTtBRFdkO0FDUEE7RUFDRSxzR0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FEVUY7QUNSQTtFQUNFLGVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QURXRjtBQ1JBO0VBQ0UsYUFBQTtFQUNFLGtCQUFBO0VBQ0EsNkNBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtBRFdKO0FDUkE7RUFDSSxtQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FEV0o7QUNWSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7QURZTjtBQ1ZFO0VBQ0UsV0FBQTtBRFlKO0FDWEk7RUFBRyxjQUFBO0FEY1A7QUNiSTtFQUFjLGlCQUFBO0FEZ0JsQjtBQ2RFO0VBQ0UsMEJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FEZ0JKO0FDZkk7RUFBRyxlQUFBO0VBQWdCLGVBQUE7QURtQnZCO0FDbEJJO0VBQUssZ0JBQUE7RUFBaUIsZUFBQTtBRHNCMUI7QUNwQkU7RUFDRSwwQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QURzQko7QUNuQkE7RUFDRSw4QkFBQTtFQUNBLDBCQUFBO0FEc0JGO0FDcEJBLDBEQUFBO0FBR0E7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFlBQUE7QURxQko7QUNqQkE7RUFDRSwrQkFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBRG9CSjtBQ2xCQSw0REFBQTtBQUVBO0VBQ0U7SUFDRSxjQUFBO0lBQ0EsZ0JBQUE7RURvQkY7QUFDRjtBQ2pCQTtFQUNFO0lBQ0UsY0FBQTtJQUNBLDZDQUFBO0VEbUJGO0FBQ0Y7QUNoQkE7RUFDRTtJQUNFLDRCQUFBO0lBQUEsNkJBQUE7WUFBQSxzQkFBQTtFRGtCRjtFQ2pCRTtJQUFlLGdCQUFBO0VEb0JqQjtBQUNGO0FDakJBO0VBQ0UsYUFBQTtFQUVBLG1CQUFBO0FEa0JGO0FDZkE7RUFDRSxlQUFBO0VBQ0EsNkJBQUE7QURrQkY7QUNmQTtFQUNFLDJCQUFBO0VBQ0EsNEJBQUE7QURrQkY7QUNkRTtFQUNFLGdCQUFBO0FEaUJKO0FDZkk7RUFDRSwrQkFBQTtFQUNBLGVBQUE7QURpQk47QUNkSTtFQUNFLGFBQUE7QURnQk47QUNaRTtFQUNFLGtCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EsZUFBQTtBRGNKO0FDWkk7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FEY047QUNaTTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7S0FBQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QURjUjtBQ1hNO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QURhUjtBQ1hRO0VBQ0UsZUFBQTtBRGFWIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tb3JkZXJzL2NyZWF0ZS1vcmRlci9jcmVhdGUtb3JkZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuaW9uLWdyaWQge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG4uaW5wdXQtd3JhcCBpb24tbGFiZWwge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuc3VwZXItdGFicy10b29sYmFyIC5jaGVjay1pY29uIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgZm9udC1zaXplOiAzMnB4O1xufVxuc3VwZXItdGFicy10b29sYmFyIC5zdGVwLWNvdW50IHtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMjJweDtcbiAgaGVpZ2h0OiAyMnB4O1xuICBiYWNrZ3JvdW5kOiAjM0Y1MUI1O1xuICBjb2xvcjogI2ZmZjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLmNvdXBvbi13cmFwcGVyIHtcbiAgbWFyZ2luOiAyMXB4IDA7XG59XG4uY291cG9uLXdyYXBwZXIgLmNvdXBvbi13cmFwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmNvdXBvbi13cmFwcGVyIC5jb3Vwb24td3JhcCAuYnRuLXdyYXAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxNnB4O1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB6LWluZGV4OiA5O1xufVxuLmNvdXBvbi13cmFwcGVyIC5jb3Vwb24tc3RhdHVzIHtcbiAgbWFyZ2luOiA2cHggMCAwIDEycHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5jb3Vwb24td3JhcHBlciAuY291cG9uLXN0YXR1cy5zdWNjZXNzIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cbi5jb3Vwb24td3JhcHBlciAuY291cG9uLXN0YXR1cy5lcnJvciB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cbi5jb3Vwb24td3JhcHBlciAuY291cG9uLWlucHV0IHtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC0tcGFkZGluZy1zdGFydDogNTRweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogM3B4O1xufVxuLmNvdXBvbi13cmFwcGVyIC5jb3Vwb24taW5wdXQuc3VjY2VzcyB7XG4gIGJvcmRlcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpIDFweCBzb2xpZDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cbi5jb3Vwb24td3JhcHBlciAuY291cG9uLWlucHV0LmVycm9yIHtcbiAgYm9yZGVyOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKSAxcHggc29saWQ7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cbi5jb3Vwb24td3JhcHBlciAuY291cG9uLWlucHV0OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi74S7XCI7XG4gIGZvbnQtZmFtaWx5OiBGbGF0aWNvbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogMTZweDtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuXG50YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG59XG5cbnRhYmxlIGNhcHRpb24ge1xuICBmb250LXNpemU6IDEuNWVtO1xuICBtYXJnaW46IDAuNWVtIDAgMC43NWVtO1xufVxuXG50YWJsZSB0ciB7XG4gIHBhZGRpbmc6IDAuMzVlbTtcbn1cblxudGFibGUgdGgsXG50YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDAuNjI1ZW07XG59XG5cbnRhYmxlIHRoIHtcbiAgZm9udC1zaXplOiAwLjg1ZW07XG4gIGxldHRlci1zcGFjaW5nOiAwLjFlbTtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi50cmFja2luZy1saW5rIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRyYWNraW5nLWxpbmsgcCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cbi50cmFja2luZy1saW5rIC5jb3B5LWxpbmsge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMTVweDtcbn1cbi50cmFja2luZy1saW5rIC5jb3B5LWxpbmsgaW9uLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG59XG4udHJhY2tpbmctbGluayAuY29weS1saW5rIGlvbi10ZXh0IHtcbiAgb3BhY2l0eTogMC44O1xufVxuXG4udXJsLWxpbmtzIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG4udXJsLWxpbmtzIGlvbi1idXR0b24ge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICB0YWJsZSB7XG4gICAgYm9yZGVyOiAwO1xuICB9XG5cbiAgdGFibGUgY2FwdGlvbiB7XG4gICAgZm9udC1zaXplOiAxLjNlbTtcbiAgfVxuXG4gIHRhYmxlIHRoZWFkIHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBtYXJnaW46IC0xcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMXB4O1xuICB9XG5cbiAgdGFibGUgdHIge1xuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjZGRkO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNjI1ZW07XG4gIH1cblxuICB0YWJsZSB0ZCB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgfVxuXG4gIHRhYmxlIHRkOjpiZWZvcmUge1xuICAgIC8qXG4gICAgKiBhcmlhLWxhYmVsIGhhcyBubyBhZHZhbnRhZ2UsIGl0IHdvbid0IGJlIHJlYWQgaW5zaWRlIGEgdGFibGVcbiAgICBjb250ZW50OiBhdHRyKGFyaWEtbGFiZWwpO1xuICAgICovXG4gICAgY29udGVudDogYXR0cihkYXRhLWxhYmVsKTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG5cbiAgdGFibGUgdGQ6bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbTogMDtcbiAgfVxufVxuLmdyZWVuIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cblxuLnJlZCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cblxuLmZpeC1oZWlnaHQge1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzE1cHgpO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5qdXN0aWZ5LWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5zdGF0ZS13cmFwcGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXRlLW5hbWUge1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTMge1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi5mbGF0aWNvbi1udWxsLTEzOjpiZWZvcmUge1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi52YWx1ZS1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIG1hcmdpbjogMHB4O1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHBhZGRpbmc6IDExcHggMDtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi52YWx1ZS1idXR0b246aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiNkZWNyZWFzZSB7XG4gIG1hcmdpbi1yaWdodDogLTRweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4IDAgMCA4cHg7XG59XG5cbiNpbmNyZWFzZSB7XG4gIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICBib3JkZXItcmFkaXVzOiAwIDhweCA4cHggMDtcbn1cblxuI2lucHV0LXdyYXAge1xuICBtYXJnaW46IDBweDtcbiAgcGFkZGluZzogMHB4O1xufVxuXG5pbnB1dCNudW1iZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICBtYXJnaW46IDBweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbn1cblxuI251bWJlcjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiNudW1iZXI6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIG1hcmdpbjogMDtcbn1cblxuLnF0eS1idG4ge1xuICBtYXJnaW46IDBweCA1cHg7XG59XG5cbi5yZW1vdmUtYnRuIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuaW9uLWljb24ucmVtb3ZlLWljb24ge1xuICBmb250LXNpemU6IDI2cHg7XG59XG5cbi52ZXJ0aWNhbC1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ub3JkZXItZGV0YWlscyB7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG59XG5cbi5hZGRyZXNzLXdyYXAge1xuICBib3JkZXItbGVmdDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBwYWRkaW5nOiAyNHB4O1xufVxuLmFkZHJlc3Mtd3JhcCBoMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luOiAwO1xufVxuXG4uZGl2aWRlciB7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luOiAyNnB4IDA7XG59XG5cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAxcHggc29saWQ7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZC5pbWcge1xuICB3aWR0aDogNjRweDtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLmltZyBpbWcge1xuICB3aWR0aDogMTAwJTtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLnByaWNlLWRldGFpbCB7XG4gIGNvbG9yOiAjMzMzO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgdGQudG90YWwtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgLml0ZW0tcXR5IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtYXJnaW4tdG9wOiA3cHg7XG4gIG1hcmdpbi1ib3R0b206IDdweDtcbn1cblxuLnRvZ2dsZSB7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBtYXJnaW46IDI2cHggLTI0cHggLTI0cHggLTI0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBwYWRkaW5nOiAyNHB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBtYXJnaW4tbGVmdDogMjZweDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgaDMge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbjogMDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUge1xuICB3aWR0aDogMTAwJTtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUgdGQge1xuICBwYWRkaW5nOiA0cHggMDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUgdGQ6bGFzdC1jaGlsZCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciAuc3ViLXRvdGFsLXdyYXAge1xuICBib3JkZXItdG9wOiAjY2NjIDFweCBzb2xpZDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgcGFkZGluZy10b3A6IDE2cHg7XG59XG4ub3JkZXItc3VtbWVyeS13cmFwcGVyIC5zdWItdG90YWwtd3JhcCBoMyB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZGlzcGxheTogaW5saW5lO1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciAuc3ViLXRvdGFsLXdyYXAgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgLnBheS1tZXRob2Qtd3JhcCB7XG4gIGJvcmRlci10b3A6ICNmZmYgMXB4IHNvbGlkO1xuICBtYXJnaW46IDE2cHggLTI0cHggLTI0cHggLTI0cHg7XG4gIHBhZGRpbmc6IDE2cHggMjRweDtcbn1cblxuLmRlbGl2ZXJ5LWhlYWRpbmcge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKiBtdWx0aXN0ZXAgKioqKioqKioqKioqKioqKioqKioqKioqL1xuc3Bhbi5kYXRlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB3aWR0aDogMTEwcHg7XG59XG5cbi5maXgtaGVpZ2h0IHtcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKm11bHRpc3RlcCBlbmQqKioqKioqKioqKioqKioqKioqKioqKiovXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XG4gIC5vcmRlci1zdW1tZXJ5LXdyYXBwZXIge1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi10b3A6IDI2cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xuICAuYWRkcmVzcy13cmFwIHtcbiAgICBib3JkZXItbGVmdDogMDtcbiAgICBib3JkZXItdG9wOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xuICAuaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5oZWFkZXIgLmJ0bi0yLW91dGxpbmUge1xuICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gIH1cbn1cbi5wcmV2aWV3SW1nIHtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmRpc2NvdW50LXByaWNlLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDE2cHggIWltcG9ydGFudDtcbn1cblxuLmZvb3Rlci1uby1ib3JkZXIge1xuICBib3JkZXItbGVmdDogMHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yaWdodDogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5jb21tZW50LWltZ3Mtd3JhcHBlciAuYWRkLWltZ3MtYnRuIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi5jb21tZW50LWltZ3Mtd3JhcHBlciAuYWRkLWltZ3MtYnRuIGxhYmVsIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbW1lbnQtaW1ncy13cmFwcGVyIC5hZGQtaW1ncy1idG4gaW5wdXRbdHlwZT1maWxlXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uY29tbWVudC1pbWdzLXdyYXBwZXIgLmNvbW1lbnQtaW1ncyB7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLmNvbW1lbnQtaW1ncy13cmFwcGVyIC5jb21tZW50LWltZ3MgLmltZyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG4uY29tbWVudC1pbWdzLXdyYXBwZXIgLmNvbW1lbnQtaW1ncyAuaW1nIGlvbi1pbWcge1xuICB3aWR0aDogNjBweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBvYmplY3QtZml0OiBmaWxsO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY29tbWVudC1pbWdzLXdyYXBwZXIgLmNvbW1lbnQtaW1ncyAuaW1nIC5yZW1vdmUtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC0yMHB4O1xuICByaWdodDogLTIwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cbi5jb21tZW50LWltZ3Mtd3JhcHBlciAuY29tbWVudC1pbWdzIC5pbWcgLnJlbW92ZS1idG4gaW9uLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG59IiwiaW9uLWdyaWR7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcblxyXG4uaW5wdXQtd3JhcCB7XHJcbiAgaW9uLWxhYmVsIHtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gIH1cclxufVxyXG5cclxuc3VwZXItdGFicy10b29sYmFyIHtcclxuICAgIC5jaGVjay1pY29uIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIH1cclxuICAgIC5zdGVwLWNvdW50IHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgd2lkdGg6IDIycHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMnB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICMzRjUxQjU7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgIH1cclxufVxyXG4uY291cG9uLXdyYXBwZXIge1xyXG4gIG1hcmdpbjogMjFweCAwO1xyXG4gIC5jb3Vwb24td3JhcCB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAuYnRuLXdyYXAge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHJpZ2h0OiAxNnB4O1xyXG4gICAgICB0b3A6IDUwJTtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgICB6LWluZGV4OiA5O1xyXG4gICAgfVxyXG4gIH1cclxuICAuY291cG9uLXN0YXR1cyB7XHJcbiAgICBtYXJnaW46IDZweCAwIDAgMTJweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICYuc3VjY2VzcyB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICB9XHJcbiAgICAmLmVycm9yIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuICAuY291cG9uLWlucHV0IHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC0tcGFkZGluZy1zdGFydDogNTRweDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDNweDtcclxuICAgICYuc3VjY2VzcyB7XHJcbiAgICAgIGJvcmRlcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpIDFweCBzb2xpZDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgIH1cclxuICAgICYuZXJyb3Ige1xyXG4gICAgICBib3JkZXI6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpIDFweCBzb2xpZDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgfVxyXG4gICAgJjpiZWZvcmUge1xyXG4gICAgICBjb250ZW50OiBcIlxcZjEzYlwiO1xyXG4gICAgICBmb250LWZhbWlseTogRmxhdGljb247XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiA1MCU7XHJcbiAgICAgIGxlZnQ6IDE2cHg7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxudGFibGUge1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gIH1cclxuICBcclxuICB0YWJsZSBjYXB0aW9uIHtcclxuICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICBtYXJnaW46IC41ZW0gMCAuNzVlbTtcclxuICB9XHJcbiAgXHJcbiAgdGFibGUgdHIge1xyXG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcclxuICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBwYWRkaW5nOiAuMzVlbTtcclxuICB9XHJcbiAgXHJcbiAgdGFibGUgdGgsXHJcbiAgdGFibGUgdGQge1xyXG4gICAgcGFkZGluZzogLjYyNWVtO1xyXG4gICAgLy8gdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICB0YWJsZSB0aCB7XHJcbiAgICBmb250LXNpemU6IC44NWVtO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IC4xZW07XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICB9XHJcblxyXG4gIC50cmFja2luZy1saW5rIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC5jb3B5LWxpbmsge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tbGVmdDogMTVweDtcclxuICAgICAgaW9uLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgfVxyXG4gICAgICBpb24tdGV4dCB7XHJcbiAgICAgICAgb3BhY2l0eTogLjg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51cmwtbGlua3Mge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gICAgdGFibGUge1xyXG4gICAgICBib3JkZXI6IDA7XHJcbiAgICB9XHJcbiAgXHJcbiAgICB0YWJsZSBjYXB0aW9uIHtcclxuICAgICAgZm9udC1zaXplOiAxLjNlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGFibGUgdGhlYWQge1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XHJcbiAgICAgIGhlaWdodDogMXB4O1xyXG4gICAgICBtYXJnaW46IC0xcHg7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgd2lkdGg6IDFweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGFibGUgdHIge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI2RkZDtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IC42MjVlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGFibGUgdGQge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGZvbnQtc2l6ZTogLjhlbTtcclxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRhYmxlIHRkOjpiZWZvcmUge1xyXG4gICAgICAvKlxyXG4gICAgICAqIGFyaWEtbGFiZWwgaGFzIG5vIGFkdmFudGFnZSwgaXQgd29uJ3QgYmUgcmVhZCBpbnNpZGUgYSB0YWJsZVxyXG4gICAgICBjb250ZW50OiBhdHRyKGFyaWEtbGFiZWwpO1xyXG4gICAgICAqL1xyXG4gICAgICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRhYmxlIHRkOmxhc3QtY2hpbGQge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAwO1xyXG4gICAgfVxyXG4gIH1cclxuLy8gU2VsZWN0IHVzZXIgdGFiXHJcbi5ncmVlbnsgXHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxufVxyXG4ucmVke1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxufSAgXHJcbi8vIEZvciBhZGRyZXNzIHRhYlxyXG4uZml4LWhlaWdodHtcclxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzE1cHgpO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgcGFkZGluZzogMTZweDtcclxufVxyXG4uanVzdGlmeS1jb250ZW50e1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uc3RhdGUtd3JhcHBlciB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGF0ZS1uYW1lIHtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbi5mbGF0aWNvbi1udWxsLTEzIHtcclxuICBvcGFjaXR5OiAuNjtcclxufVxyXG4uZmxhdGljb24tbnVsbC0xMzo6YmVmb3JlIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi8vIEZvciBTZWxlY3QgcHJvZHVjdCB0YWJcclxuLnZhbHVlLWJ1dHRvbiB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIHBhZGRpbmc6IDExcHggMDtcclxuICBiYWNrZ3JvdW5kOiAjZWVlO1xyXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxufVxyXG5cclxuLnZhbHVlLWJ1dHRvbjpob3ZlciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4jZGVjcmVhc2Uge1xyXG4gIG1hcmdpbi1yaWdodDogLTRweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHggMCAwIDhweDtcclxufVxyXG5cclxuI2luY3JlYXNlIHtcclxuICBtYXJnaW4tbGVmdDogLTRweDtcclxuICBib3JkZXItcmFkaXVzOiAwIDhweCA4cHggMDtcclxufVxyXG5cclxuI2lucHV0LXdyYXAge1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIHBhZGRpbmc6IDBweDtcclxufVxyXG5cclxuaW5wdXQjbnVtYmVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxufVxyXG5cclxuI251bWJlcjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcclxuI251bWJlcjo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuLy8gRm9yIHByb2R1Y3QgVGFiXHJcbi5xdHktYnRue1xyXG4gIG1hcmdpbjogMHB4IDVweDtcclxufVxyXG5cclxuLy8gRm9yIG9yZGVyIHN1bW1hcnkgdGFiXHJcbi5yZW1vdmUtYnRue1xyXG4gIG1hcmdpbi10b3A6IDE2cHg7XHJcbn1cclxuaW9uLWljb24ucmVtb3ZlLWljb257Zm9udC1zaXplOiAyNnB4O31cclxuLnZlcnRpY2FsLWNlbnRlcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLm9yZGVyLWRldGFpbHN7bWFyZ2luLXRvcDogMjRweDt9XHJcblxyXG4uYWRkcmVzcy13cmFwe1xyXG4gIGJvcmRlci1sZWZ0OiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICBwYWRkaW5nOiAyNHB4O1xyXG4gICBcclxuICBoM3tcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG59XHJcblxyXG4uZGl2aWRlcntcclxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbWFyZ2luOiAyNnB4IDA7XHJcbn1cclxuLml0ZW1zLXdyYXBwZXJ7XHJcbiAgdGFibGV7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHRke3BhZGRpbmc6IDhweDtib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpIDFweCBzb2xpZDt9XHJcbiAgICB0ZC5pbWd7XHJcbiAgICAgIHdpZHRoOiA2NHB4O1xyXG4gICAgICBpbWd7d2lkdGg6IDEwMCU7fVxyXG4gICAgfVxyXG4gICAgdGQucHJpY2UtZGV0YWlse2NvbG9yOiAjMzMzO31cclxuICAgIHRkLnRvdGFsLXByaWNle2NvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7fVxyXG4gICAgLml0ZW0tcXR5e2NvbG9yOiMzMzN9XHJcbiAgICBcclxuICB9XHJcbn1cclxuLnByb2R1Y3QtaW1hZ2V7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbn1cclxuLnByb2R1Y3QtbmFtZXtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbWFyZ2luLXRvcDogN3B4O1xyXG4gIG1hcmdpbi1ib3R0b206IDdweDtcclxufVxyXG5cclxuLnRvZ2dsZXtcclxuICBwYWRkaW5nOiAyNHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAyNnB4IC0yNHB4IC0yNHB4IC0yNHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm9yZGVyLXN1bW1lcnktd3JhcHBlcntcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgcGFkZGluZzogMjRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjZweDtcclxuICAgIGgze1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB0YWJsZXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGR7cGFkZGluZzogNHB4IDA7fVxyXG4gICAgdGQ6bGFzdC1jaGlsZHt0ZXh0LWFsaWduOiByaWdodDt9XHJcbiAgfVxyXG4gIC5zdWItdG90YWwtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNjY2MgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIHBhZGRpbmctdG9wOiAxNnB4O1xyXG4gICAgaDN7Zm9udC1zaXplOiAxOHB4O2Rpc3BsYXk6IGlubGluZTt9XHJcbiAgICBzcGFue21hcmdpbi1sZWZ0OiA2cHg7Zm9udC1zaXplOiAxMHB4O31cclxuICB9XHJcbiAgLnBheS1tZXRob2Qtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNmZmYgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAxNnB4IC0yNHB4IC0yNHB4IC0yNHB4O1xyXG4gICAgcGFkZGluZzogMTZweCAyNHB4O1xyXG4gIH1cclxufVxyXG4uZGVsaXZlcnktaGVhZGluZ3tcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4IWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDIwcHghaW1wb3J0YW50O1xyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqIG11bHRpc3RlcCAqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi5zdGVwcy13cmFwcGVye31cclxuXHJcbnNwYW4uZGF0ZXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICAgIHdpZHRoOiAxMTBweDtcclxufVxyXG5cclxuXHJcbi5maXgtaGVpZ2h0e1xyXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgICBwYWRkaW5nOiAxNnB4O1xyXG59XHJcbi8qKioqKioqKioqKioqKioqKioqKioqbXVsdGlzdGVwIGVuZCoqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6MTIwMHB4KXtcclxuICAub3JkZXItc3VtbWVyeS13cmFwcGVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xyXG5cclxuICB9XHJcbn1cclxuQG1lZGlhKG1heC13aWR0aDo5OTJweCl7XHJcbiAgLmFkZHJlc3Mtd3JhcHtcclxuICAgIGJvcmRlci1sZWZ0OiAwO1xyXG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhKG1heC13aWR0aDo1MDBweCl7XHJcbiAgLmhlYWRlcntcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAuYnRuLTItb3V0bGluZXttYXJnaW4tdG9wOiAxNnB4O31cclxuICB9XHJcbn1cclxuXHJcbi5wcmV2aWV3SW1ne1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgLy8gd2lkdGg6IDIwMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHhcclxufVxyXG5cclxuLmRpc2NvdW50LXByaWNlLWlucHV0e1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE2cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmZvb3Rlci1uby1ib3JkZXJ7XHJcbiAgYm9yZGVyLWxlZnQ6IDBweCFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLXJpZ2h0OiAwcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG4uY29tbWVudC1pbWdzLXdyYXBwZXIge1xyXG4gIC5hZGQtaW1ncy1idG4ge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuXHJcbiAgICBsYWJlbCB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFt0eXBlPVwiZmlsZVwiXSB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuY29tbWVudC1pbWdzIHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcblxyXG4gICAgLmltZyB7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcblxyXG4gICAgICBpb24taW1nIHtcclxuICAgICAgICB3aWR0aDogNjBweDtcclxuICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgICAgb2JqZWN0LWZpdDogZmlsbDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnJlbW92ZS1idG4ge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IC0yMHB4O1xyXG4gICAgICAgIHJpZ2h0OiAtMjBweDtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcblxyXG4gICAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-orders/create-order/create-order.page.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/admin-orders/create-order/create-order.page.ts ***!
  \**********************************************************************/
/*! exports provided: CreateOrderPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateOrderPage", function() { return CreateOrderPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/states-modal/states-modal.page */ "./src/app/states-modal/states-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _product_variant_product_variant_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product-variant/product-variant.page */ "./src/app/admin/admin-orders/create-order/product-variant/product-variant.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_subscription_create_subscription_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-subscription/create-subscription.page */ "./src/app/admin/admin-orders/create-order/create-subscription/create-subscription.page.ts");
/* harmony import */ var src_app_services_product_subscriptions_product_subscriptions_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/product-subscriptions/product-subscriptions.service */ "./src/app/services/product-subscriptions/product-subscriptions.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/search-engine/search-engine.service */ "./src/app/services/search-engine/search-engine.service.ts");
/* harmony import */ var _coupons_list_coupons_list_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../coupons-list/coupons-list.page */ "./src/app/admin/admin-orders/coupons-list/coupons-list.page.ts");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
















var CreateOrderPage = /** @class */ (function () {
    // isInventoryManaged = false;
    function CreateOrderPage(events, modalController, toastController, configService, loadingController, router, productSubscriptionsService, alertController, sharedService, userService, storage, searchEngineService) {
        this.events = events;
        this.modalController = modalController;
        this.toastController = toastController;
        this.configService = configService;
        this.loadingController = loadingController;
        this.router = router;
        this.productSubscriptionsService = productSubscriptionsService;
        this.alertController = alertController;
        this.sharedService = sharedService;
        this.userService = userService;
        this.storage = storage;
        this.searchEngineService = searchEngineService;
        // Step 1
        this.userName = '';
        this.userList = [];
        this.selectedUser = {
            id: '',
            name: '',
            phoneNo: '',
            subRole: ''
        };
        this.statusIndex = 1;
        this.doneTypingInterval = 1000;
        // Step 2
        this.userAddressExists = false;
        this.userAddress = {
            address: '',
            city: '',
            state: '',
            stateCode: '',
            pincode: '',
            phoneNo: '',
            createdAt: new Date(),
            defaultAddress: true,
            name: ''
        };
        this.shippingSameAsBilling = true;
        this.billingAddress = {
            address: '',
            city: '',
            state: '',
            stateCode: '',
            pincode: '',
            phoneNo: '',
            createdAt: new Date(),
            name: ''
        };
        // Step 3
        this.searchProduct = '';
        this.productList = [];
        this.productsAdded = [];
        this.page = 0;
        this.noMoreSearchProducts = false;
        this.subscriptionFeature = false;
        this.delivery = 0;
        this.additionalDiscount = 0;
        this.orderObj = {
            orderId: null,
            status: 'Confirmed',
            createdAt: new Date(),
            payment: {
                completed: false,
                mode: 'cash',
                details: {
                    amount: null
                }
            },
            discount: 0,
            // couponDiscount: 0,
            // couponId: '',
            // couponName: '',
            scheduledDate: '',
            scheduledTime: '',
            deliveryGstObj: {
                value: 0,
                total: 0
            },
            customerGstNo: '',
            storePickupObj: {},
            region: '',
            vendorId: '',
            membershipDiscount: 0
        };
        this.productsPrice = 0;
        this.totalGst = 0;
        this.customerGstNo = '';
        this.searchUser = '';
        this.searchUserPhone = '';
        this.phoneLimit = 10;
        this.orderBy = {
            role: '',
            id: '',
            name: ''
        };
        this.isQuotationOrder = false;
        this.isRFQ = false;
        this.userRole = "";
        this.searchValue = '';
        this.couponCode = '';
        this.couponApplied = false;
        this.couponDiscount = 0;
        this.couponId = '';
        this.isCodAvailableForCoupon = true;
        // loader: any;
        this.isGstApplicable = true;
        this.paymentDetails = {
            products: [],
            totalMrp: 0,
            discountOnMrp: 0,
            totalGst: 0,
            totalPayable: 0,
            delivery: {
                deliveryCost: 0,
            },
            deliveryGstObj: {
                value: 0
            }
        };
        this.totalAmountToPaid = 0;
        this.totalMrp = 0;
        this.discountOnMrp = 0;
        this.listOfCommentImages = {};
        this.showCommentBoxAndImage = false;
    }
    CreateOrderPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('orderBy:', this.orderBy);
                        this.phoneLimit = this.configService.environment.phoneLength;
                        _a = this.orderBy;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 1:
                        _a.role = _e.sent();
                        _b = this.orderBy;
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 2:
                        _b.id = _e.sent();
                        _c = this.orderBy;
                        return [4 /*yield*/, this.storage.get('userName')];
                    case 3:
                        _c.name = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 4:
                        _d.userRole = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.initializeSubscriptions();
                this.currencyCode = this.configService.environment.currencyCode;
                this.subscriptionFeature = this.configService.environment.subscriptionFeature;
                this.taxType = this.configService.environment.taxType;
                this.isRFQ = this.configService.environment.RFQFeature;
                this.storage.get('storeInfo').then(function (data) {
                    console.log("storeInfo", data);
                    _this.showCommentBoxAndImage = data.allowComment || false;
                });
                return [2 /*return*/];
            });
        });
    };
    CreateOrderPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    CreateOrderPage.prototype.presentLoading = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: 4000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        this.loading.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['ok']
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
    CreateOrderPage.prototype.filterProductsByVendor = function (productList) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var vendorProducts;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log("userRole", this.userRole);
                console.log("userRole", this.orderBy.id);
                if (this.userRole == 'vendor') {
                    vendorProducts = productList.filter(function (product) { return product.vendorId === _this.orderBy.id; });
                    console.log("vendorProducts", vendorProducts);
                    return [2 /*return*/, vendorProducts];
                }
                else {
                    return [2 /*return*/, productList];
                }
                return [2 /*return*/];
            });
        });
    };
    CreateOrderPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.events.subscribe('user:getUserToCreateOrderSuccess', function (userList) {
                    userList.forEach(function (user) {
                        user['selected'] = false;
                        _this.userList.push(user);
                    });
                    _this.userList = userList;
                    console.log('searchedUsersDocs', userList);
                });
                this.events.subscribe('search-engine:publishProductsToCreateOrder', function (productList) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var fetchedProducts, index1, _loop_1, this_1, index2;
                    var _this = this;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('productList:', productList);
                                return [4 /*yield*/, this.filterProductsByVendor(productList)];
                            case 1:
                                fetchedProducts = _a.sent();
                                for (index1 = 0; index1 < fetchedProducts.length; index1++) {
                                    fetchedProducts[index1]['added'] = false;
                                    _loop_1 = function (index2) {
                                        if (fetchedProducts[index1].id === this_1.productsAdded[index2].productId) {
                                            console.log('prod found with id:', fetchedProducts[index1].id);
                                            fetchedProducts[index1]['added'] = true;
                                            if (fetchedProducts[index1].isPriceList) {
                                                var variantType_1 = fetchedProducts[index1].variantType;
                                                fetchedProducts[index1].priceList.forEach(function (prodVariant) {
                                                    //console.log('variantType:', variantType, ' prodVariant:', prodVariant);
                                                    if (prodVariant[variantType_1] === _this.productsAdded[index2].pack[variantType_1]) {
                                                        prodVariant.added = true;
                                                    }
                                                });
                                            }
                                        }
                                    };
                                    this_1 = this;
                                    for (index2 = 0; index2 < this.productsAdded.length; index2++) {
                                        _loop_1(index2);
                                    }
                                }
                                console.log('fetchedProducts:', fetchedProducts);
                                fetchedProducts.forEach(function (product) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.prepareProductData(product)];
                                            case 1:
                                                product = _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                this.productList = fetchedProducts;
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.events.subscribe('user:publishUserDetails', function (userData) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var address, defaultAddress;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('usersData::', userData);
                                if (!(userData.defaultAddress && userData.defaultAddress.defaultAddress)) return [3 /*break*/, 1];
                                this.userAddressExists = true;
                                this.userAddress = userData.defaultAddress;
                                this.statusIndex = 3;
                                return [3 /*break*/, 5];
                            case 1: return [4 /*yield*/, this.userService.getAllUserAddresses(this.selectedUser.id)];
                            case 2:
                                address = _a.sent();
                                if (!(address && address.length)) return [3 /*break*/, 4];
                                defaultAddress = address.find(function (a) { return a.defaultAddress === true; });
                                if (defaultAddress) {
                                    this.userAddress = defaultAddress;
                                }
                                else {
                                    this.userAddress = address[0];
                                }
                                return [4 /*yield*/, this.userService.saveToDefaultAddress(this.selectedUser.id, this.userAddress)];
                            case 3:
                                _a.sent();
                                this.statusIndex = 3;
                                this.userAddressExists = true;
                                console.log('address:', address);
                                return [3 /*break*/, 5];
                            case 4:
                                this.userAddressExists = false;
                                this.userAddress = {
                                    address: '',
                                    city: '',
                                    state: '',
                                    stateCode: '',
                                    pincode: '',
                                    phoneNo: '',
                                    createdAt: new Date(),
                                    defaultAddress: true,
                                    name: ''
                                };
                                _a.label = 5;
                            case 5:
                                this.customerGstNo = userData.customerGstNo ? userData.customerGstNo : this.customerGstNo;
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.events.subscribe('user:saveUserAddressToCreateOrderSuccess', function () {
                    _this.presentToast('Details saved successfully & Address is added to users Address List');
                    _this.statusIndex = 3;
                });
                this.events.subscribe('user:saveUserAddressToCreateOrderFailure', function () {
                    _this.presentToast('An error occured while saving user details');
                });
                this.events.subscribe('order:placeOrderForUserSuccess', function () {
                    _this.loading.dismiss();
                    if (_this.userRole == 'vendor') {
                        _this.router.navigate(['vendor-orders']);
                    }
                    else {
                        _this.router.navigate(['admin-orders']);
                    }
                });
                this.events.subscribe('productVariantSubscribed', function (prodObj) {
                    if (Object.entries(prodObj).length != 0) {
                        _this.productsAdded.push(prodObj);
                        _this.statusIndex = 4;
                        _this.setBillingAddress();
                    }
                });
                this.events.subscribe('coupon-codes:couponCodeNotApplied', function (msg) {
                    _this.couponCode = '';
                    _this.loading.dismiss();
                    _this.presentAlert(msg);
                });
                this.events.subscribe('coupon-codes:couponCodeApplied', function (response) {
                    if (response.details.totalCouponDiscount === 0) {
                        _this.loading.dismiss();
                        _this.presentAlert('coupon not applicable');
                    }
                    else {
                        var coupon = response.data;
                        _this.couponApplied = true;
                        _this.couponId = coupon.couponId;
                        _this.isCodAvailableForCoupon = 'codAvailable' in coupon ? coupon.codAvailable : true;
                        _this.totalGst = response.details.totalGst;
                        _this.productsAdded = response.details.products;
                        _this.totalAmountToPaid = response.details.totalAmountToPaid;
                        _this.couponDiscount = response.details.totalCouponDiscount;
                        _this.totalMrp = 'totalMrp' in response.details ? response.details.totalMrp : _this.totalMrp;
                        _this.discountOnMrp = 'discountOnMrp' in response.details ? response.details.discountOnMrp : _this.discountOnMrp;
                        var price_1 = 0;
                        var totalGst_1 = 0;
                        _this.productsAdded.map(function (p) {
                            price_1 += p.price * p.quantity;
                            if (p.gstObj) {
                                totalGst_1 += p.gstObj.total;
                            }
                            //   if (price >= this.freeDeliveryAmt) {
                            //     this.deliveryFree();
                            // }
                            // if (this.deliveryType === 'pickup' && this.isStorePickup && this.storeAddress.hasOwnProperty('address')) {
                            //     this.setStorePickupPayment();
                            // }
                            // this.checkUserMembership();
                            // this.checkFreeProductStatus();
                            _this.loading.dismiss();
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CreateOrderPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:getUserToCreateOrderSuccess');
        this.events.unsubscribe('search-engine:publishProductsToCreateOrder');
        this.events.unsubscribe('user:publishUserDetails');
        this.events.unsubscribe('user:saveUserAddressToCreateOrderSuccess');
        this.events.unsubscribe('user:saveUserAddressToCreateOrderFailure');
        this.events.unsubscribe('order:placeOrderForUserSuccess');
        this.events.unsubscribe('coupon-codes:couponCodeNotApplied');
        this.events.unsubscribe('coupon-codes:couponCodeApplied');
    };
    CreateOrderPage.prototype.close = function () {
        this.modalController.dismiss();
    };
    CreateOrderPage.prototype.fireSearchQueryForProduct = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(function () {
                console.log('in fireSearchQuery...');
                // this.showSearchLoader = true;
                // this.showNoProducts = false;
                _this.events.publish('search-engine:alogoliaSearchProductsToCreateOrder', _this.searchProduct, 0, 'new_search');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                // this.showNoProducts = true;
            }
        }
    };
    CreateOrderPage.prototype.searchMoreProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('loading more data...');
                this.page = this.page + 1;
                this.events.publish('search-engine:alogoliaSearchProductsToCreateOrder', this.searchProduct, this.page, 'existing_search');
                setTimeout(function () {
                    event.target.complete();
                }, 1000);
                if (this.noMoreSearchProducts === true) {
                    event.target.disabled = true;
                }
                return [2 /*return*/];
            });
        });
    };
    // async presentLoading(msg: string) {
    //   this.loader = await this.loadingController.create({
    //       message: msg,
    //       duration: 30000
    //   });
    //   await this.loader.present();
    // }
    CreateOrderPage.prototype.openStateModal = function (choice) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_3__["StatesModalPage"],
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            if (res.data) {
                                console.log(res.data);
                                if (choice == 'shipping') {
                                    _this.userAddress.state = res.data.state;
                                    _this.userAddress.stateCode = res.data.code;
                                }
                                else if (choice == 'billing') {
                                    _this.billingAddress.state = res.data.state;
                                    _this.billingAddress.stateCode = res.data.code;
                                }
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
    CreateOrderPage.prototype.selectUser = function (userName, userPhoneNo, userId, userIndex, subRole) {
        this.statusIndex = 2;
        this.userList.forEach(function (user) {
            user['selected'] = false;
        });
        this.userList[userIndex].selected = true;
        this.selectedUser.id = userId;
        this.selectedUser.name = userName;
        this.selectedUser.phoneNo = userPhoneNo;
        this.selectedUser.subRole = subRole || '';
        this.events.publish('user:getUserDetails', userId);
    };
    CreateOrderPage.prototype.saveAddress = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var userDetails;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.userAddress.address && this.userAddress.city && this.userAddress.state && this.userAddress.pincode)) return [3 /*break*/, 2];
                        this.statusIndex = 3;
                        this.userAddress.phoneNo = this.selectedUser.phoneNo;
                        this.userAddress.name = this.selectedUser.name;
                        this.events.publish('user:saveUserAddressToCreateOrder', this.selectedUser.id, this.userAddress);
                        return [4 /*yield*/, this.userService.updateUserInfo(this.selectedUser.id, { customerGstNo: this.customerGstNo })];
                    case 1:
                        userDetails = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.presentToast('Please fill all details in address');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.presentToast = function (msg) {
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
    CreateOrderPage.prototype.presentProductVariantModal = function (product, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _product_variant_product_variant_page__WEBPACK_IMPORTED_MODULE_5__["ProductVariantPage"],
                            backdropDismiss: false,
                            cssClass: 'custom-modal',
                            componentProps: {
                                product: product,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            if (res.data) {
                                res.data.forEach(function (variantIndex) {
                                    _this.productsAdded.push(_this.getCartObj(product, variantIndex));
                                    _this.statusIndex = 4;
                                    _this.setBillingAddress();
                                });
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
    CreateOrderPage.prototype.getCartObj = function (product, plIndex) {
        var cartObj = {
            name: product.prodName,
            quantity: 1,
            img: product.coverPic,
            productId: product.id,
            commentMsg: '',
            commentImgs: [],
            maxQty: product.maxQty ? product.maxQty : null,
            minQty: product.minQty ? product.minQty : null,
            gst: product.gst ? product.gst : 0,
            status: typeof product.status !== 'undefined' ? product.status : true,
            stopWhenNoQty: product.hasOwnProperty('stopWhenNoQty') && typeof product.stopWhenNoQty !== 'undefined' ? product.stopWhenNoQty : false,
            hsn: product.hsnCode ? product.hsnCode : '',
            sku: product.productCode ? product.productCode : '',
            description: '',
            gstExclusive: product.gstExclusive || false,
            extraCharges: ('extraCharges' in product) && (typeof product.extraCharges === 'object') && product.extraCharges.active ? product.extraCharges : { charge: 0 },
            isCod: 'isCod' in product ? product.isCod : true,
            vendorId: product.vendorId || '',
            priceSlabs: 'priceSlabs' in product ? { active: product.priceSlabs.active } : { active: false },
            batches: 'batches' in product ? product.batches : [],
            slug: 'slug' in product ? product.slug : {},
        };
        if (product.ptype === 'child') {
            cartObj['parentProductId'] = product.parentId;
        }
        if (product.hasOwnProperty('color') && product.color.hasOwnProperty('name')) {
            cartObj['color'] = product.color;
        }
        if (!product.isPriceList) {
            cartObj['totalQty'] = product.productQty ? product.productQty : '';
            cartObj['barcode'] = product.barcode ? product.barcode : '';
            cartObj['shippingWt'] = product.shippingWeight || 0;
            cartObj['mrpPrice'] = product.prodPrice;
            cartObj['price'] = product.discountedPrice;
            cartObj['barcodeNo'] = product.barcodeNo || '';
        }
        else {
            cartObj['description'] = product.priceList[plIndex].weight,
                cartObj['totalQty'] = product.priceList[plIndex].totalQuantity || '';
            cartObj['barcode'] = product.priceList[plIndex].barcode || '';
            cartObj['shippingWt'] = product.priceList[plIndex].shippingWeight || 0;
            cartObj['barcodeNo'] = product.priceList[plIndex].barcodeNo || '';
            cartObj['pack'] = {
                weight: product.priceList[plIndex].weight,
                variantType: product.variantType || 'variant'
            };
            if (product.variantType && product.variantType === 'pieces') {
                cartObj['mrpPrice'] = product.priceList[plIndex].price * parseInt(product.priceList[plIndex].weight);
                cartObj['price'] = product.priceList[plIndex].discountedPrice * parseInt(product.priceList[plIndex].weight);
                cartObj.pack['price'] = product.priceList[plIndex].discountedPrice * parseInt(product.priceList[plIndex].weight);
                cartObj.pack['perPcPrice'] = product.priceList[plIndex].discountedPrice;
            }
            else {
                cartObj['mrpPrice'] = product.priceList[plIndex].price;
                cartObj['price'] = product.priceList[plIndex].discountedPrice;
                cartObj.pack['price'] = product.priceList[plIndex].discountedPrice;
            }
        }
        cartObj['price'] = parseFloat(cartObj['price'].toFixed(2));
        if (cartObj.pack) {
            cartObj.pack['price'] = parseFloat(cartObj.pack['price'].toFixed(2));
        }
        console.log("getCartObj()", cartObj);
        return cartObj;
    };
    CreateOrderPage.prototype.checkPdtStock = function (pdt, priceListIndex) {
        var isOutOfStock = false;
        if (!pdt.isPriceList) {
            if (pdt.productQty === '0' && pdt.stopWhenNoQty) {
                isOutOfStock = true;
            }
        }
        else {
            if (pdt.stopWhenNoQty) {
                if (pdt.priceList[priceListIndex].totalQuantity !== '0') {
                    isOutOfStock = false;
                }
                else {
                    isOutOfStock = true;
                }
            }
        }
        return isOutOfStock;
    };
    CreateOrderPage.prototype.textUppercase = function () {
        this.couponCode = this.couponCode.toUpperCase();
        if (this.couponCode.includes(' ')) {
            this.couponCode = this.couponCode.replace(/\s/g, '');
        }
    };
    CreateOrderPage.prototype.addProduct = function (product, index) {
        if (product.isPriceList) {
            this.presentProductVariantModal(product, index);
        }
        else {
            var outOfStock = this.checkPdtStock(product, 0);
            if (outOfStock) {
                this.sharedService.presentAlert('This product is out of stock.');
                return;
            }
            this.productList[index].added = true;
            this.productsAdded.push(this.getCartObj(product));
            this.statusIndex = 4;
            this.setBillingAddress();
        }
        console.log('productsAdded:', this.productsAdded);
    };
    CreateOrderPage.prototype.setBillingAddress = function () {
        if (this.shippingSameAsBilling) {
            this.billingAddress = this.userAddress;
        }
        else {
            this.billingAddress['name'] = this.selectedUser.name;
        }
    };
    CreateOrderPage.prototype.increment = function (index) {
        if (this.productsAdded[index].quantity < this.productsAdded[index].totalQty) {
            this.productsAdded[index].quantity += 1;
        }
        else if (this.productsAdded[index].quantity >= this.productsAdded[index].totalQty) {
            this.sharedService.presentAlert("Only " + this.productsAdded[index].totalQty + " Quantity Available");
            return;
        }
    };
    CreateOrderPage.prototype.decrement = function (index) {
        console.log("index", index);
        console.log("productsAdded", this.productsAdded);
        if (this.productsAdded[index].quantity != 0 || this.productsAdded[index].quantity > 0) {
            this.productsAdded[index].quantity -= 1;
        }
        else if (this.productsAdded[index].quantity === 0) {
            console.log("productList", this.productList);
            // this.productList[index].added = false;
            for (var _i = 0, _a = this.productList; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.id === this.productsAdded[index].productId) {
                    product.added = false;
                    if (product.isPriceList) {
                        var variantType = product.variantType;
                        for (var _b = 0, _c = product.priceList; _b < _c.length; _b++) {
                            var prodVariant = _c[_b];
                            if (prodVariant[variantType] === this.productsAdded[index].pack[variantType]) {
                                prodVariant.added = false;
                            }
                        }
                    }
                }
            }
            this.productsAdded.splice(index, 1);
        }
        if (this.productsAdded.length === 0) {
            this.statusIndex = 3;
        }
    };
    CreateOrderPage.prototype.calcOrderSummaryPrice = function () {
        var subtotal = 0;
        this.productsAdded.map(function (p) {
            var price = 0;
            price = p.price;
            if ('gstExclusive' in p && p.gstExclusive && p.gst) {
                price += (p.price * (p.gst / 100));
                // console.log('price:', price);
            }
            subtotal += price * p.quantity;
        });
        return subtotal - this.calcOrderSummaryGst() + (this.orderObj.deliveryGstObj.total || 0);
        // 
        // let price = 0;
        // this.productsAdded.forEach(product => {
        //   price += product.price * product.quantity;
        // });
        // return price - this.calcOrderSummaryGst();
    };
    ;
    CreateOrderPage.prototype.calcOrderSummaryGst = function () {
        var totalGst = 0;
        var allGst = [];
        var minGst = 0;
        var gstOnDelivery = 0;
        this.productsAdded.map(function (p) {
            if (p.gst) {
                var gstValue = 0;
                if ('gstExclusive' in p && p.gstExclusive) {
                    gstValue = (p.price * (p.gst / 100)) * p.quantity;
                }
                else {
                    gstValue = (p.price - (p.price / (1 + (p.gst / 100)))) * p.quantity;
                }
                //let gstValue = (p.price - (p.price / (1 + (p.gst / 100)))) * p.quantity;
                allGst.push(p.gst);
                //this.totalGst += gstValue;
                totalGst += gstValue;
                p.gstObj = {
                    value: p.gst,
                    total: gstValue,
                    cgst: p.gst / 2,
                    sgst: p.gst / 2,
                    igst: p.gst
                };
            }
            else {
                p.gstObj = {
                    value: 0,
                    total: 0,
                    cgst: 0,
                    sgst: 0,
                    igst: 0
                };
            }
        });
        if (allGst.length) {
            minGst = Math.min.apply(Math, allGst);
            //console.log('minGst', minGst);
            gstOnDelivery = (this.delivery - (this.delivery / (1 + ((minGst) / 100))));
            //this.delivery * (minGst / 100);
            totalGst += gstOnDelivery;
        }
        this.orderObj.deliveryGstObj = {
            value: minGst,
            total: gstOnDelivery
        };
        return totalGst;
    };
    ;
    CreateOrderPage.prototype.calcOrderSummaryTotalAmtToPaid = function () {
        var totalAmount = 0;
        totalAmount = parseFloat(((this.calcTotalMrp(this.productsAdded) - this.calcDiscountOnMrp(this.productsAdded)) + this.delivery - this.additionalDiscount - this.couponDiscount).toFixed(2));
        this.totalAmountToPaid = totalAmount;
        return totalAmount;
    };
    CreateOrderPage.prototype.calcTotalMrp = function (products) {
        var totalMrp = 0;
        products.map(function (p) {
            var price = 0;
            price = p.hasOwnProperty('mrpPrice') ? p.mrpPrice : p.price;
            if ('gstExclusive' in p && p.gstExclusive && p.gst) {
                price += (price * (p.gst / 100));
            }
            totalMrp += price * p.quantity;
        });
        this.totalMrp = totalMrp;
        return totalMrp;
    };
    CreateOrderPage.prototype.calcDiscountOnMrp = function (products) {
        var discountOnMrp = 0;
        products.map(function (p) {
            var discountedPrice = p.hasOwnProperty('mrpPrice') ? (p.mrpPrice - p.price) : 0;
            if ('gstExclusive' in p && p.gstExclusive && p.gst) {
                discountedPrice += (discountedPrice * (p.gst / 100));
            }
            if (p.hasOwnProperty('mrpPrice')) {
                discountOnMrp += discountedPrice * p.quantity;
            }
        });
        this.discountOnMrp = discountOnMrp;
        return discountOnMrp;
    };
    CreateOrderPage.prototype.saveOrder = function () {
        var _this = this;
        this.presentLoading('Please Wait...');
        this.productsAdded.map(function (p) {
            _this.productsPrice += p.price * p.quantity;
            if ('pack' in p && p.pack.variantType == 'pieces') {
                p.pack.price = p.price;
                p.pack.perPcPrice = parseFloat((p.price / parseInt(p.pack.weight)).toFixed(2));
            }
        });
        this.userAddress['name'] = this.selectedUser.name;
        this.orderObj['products'] = this.productsAdded;
        this.orderObj['additionalDiscount'] = this.additionalDiscount;
        this.orderObj['address'] = this.userAddress;
        this.orderObj['billingAddress'] = this.billingAddress;
        this.orderObj['userId'] = this.selectedUser.id;
        this.orderObj['userName'] = this.selectedUser.name;
        this.orderObj['delivery'] = this.delivery;
        //this.orderObj['billingAddress'] = this.userAddress;
        this.orderObj['productsPrice'] = this.productsPrice;
        this.orderObj['totalAmountToPaid'] = this.totalAmountToPaid;
        // this.orderObj['totalAmountToPaid'] = this.calcOrderSummaryTotalAmtToPaid();
        this.orderObj.payment.details.amount = this.orderObj['totalAmountToPaid'];
        this.orderObj['totalMrp'] = this.totalMrp;
        // this.orderObj['TotalMrp'] = this.calcTotalMrp(this.productsAdded);
        this.orderObj['discountOnMrp'] = this.discountOnMrp;
        // this.orderObj['discountOnMrp'] = this.calcDiscountOnMrp(this.productsAdded);
        this.orderObj['defaultGst'] = this.calcOrderSummaryGst();
        this.orderObj['customerGstNo'] = this.customerGstNo;
        this.orderObj['autoConfirmOrder'] = true;
        this.orderObj['cashbackAmount'] = 0;
        this.orderObj['couponDiscount'] = this.couponDiscount;
        this.orderObj['couponId'] = this.couponId;
        this.orderObj['couponName'] = this.couponCode;
        this.orderObj['metaData'] = {
            source: 'manual',
            orderBy: this.orderBy,
            inventoryManaged: false
            // inventoryManaged: this.isInventoryManaged || false
        };
        if (this.isQuotationOrder) {
            this.orderObj['orderType'] = 'quotation';
            this.orderObj.status = 'Pending';
        }
        if (this.userRole === 'vendor') {
            this.orderObj.vendorId = this.orderBy.id;
        }
        console.log("this.orderObj", this.orderObj);
        this.events.publish('order:placeOrderForUser', this.orderObj, this.listOfCommentImages);
    };
    CreateOrderPage.prototype.subscribeProduct = function (productData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subsData, productObj, modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productSubscriptionsService.getSettings('return')];
                    case 1:
                        subsData = _a.sent();
                        productObj = {
                            id: productData.id,
                            data: productData,
                        };
                        return [4 /*yield*/, this.modalController.create({
                                component: _create_subscription_create_subscription_page__WEBPACK_IMPORTED_MODULE_7__["CreateSubscriptionPage"],
                                backdropDismiss: false,
                                cssClass: 'custom-modal',
                                componentProps: {
                                    product: productObj,
                                    subSettings: subsData
                                }
                            })];
                    case 2:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (prodObj) {
                            if (Object.entries(prodObj.data).length != 0) {
                                _this.productsAdded.push(prodObj.data);
                                _this.statusIndex = 4;
                                _this.setBillingAddress();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateOrderPage.prototype.removeSubscribedProduct = function (i) {
        this.productsAdded.splice(i, 1);
        if (this.productsAdded.length === 0) {
            this.statusIndex = 3;
        }
    };
    CreateOrderPage.prototype.onClickQty = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Enter Quantity',
                            inputs: [
                                {
                                    name: 'qty',
                                    type: 'number',
                                    placeholder: 'Enter Quantity Here'
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
                                    text: 'Done',
                                    handler: function (data) {
                                        var qty = parseInt(data.qty);
                                        if (!(parseInt(data.qty) && parseInt(data.qty) > 0)) {
                                            _this.sharedService.presentToast('Enter Valid Quantity');
                                            return false;
                                        }
                                        else if (parseInt(data.qty) > _this.productsAdded[index].totalQty) {
                                            _this.sharedService.presentAlert("Only " + _this.productsAdded[index].totalQty + " Quantity Available");
                                        }
                                        else if (qty < _this.productsAdded[index].minQty || qty > _this.productsAdded[index].maxQty) {
                                            _this.sharedService.presentAlert("Min. & Max Quantity for " + _this.productsAdded[index].name + " is " + (_this.productsAdded[index].minQty ? _this.productsAdded[index].minQty : 'NA') + " and " + (_this.productsAdded[index].maxQty ? _this.productsAdded[index].maxQty : 'NA') + " respectively");
                                        }
                                        else {
                                            _this.productsAdded[index].quantity = parseInt(data.qty);
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
    CreateOrderPage.prototype.prepareProductData = function (product) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var deal, retailDiscount_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkLimitedTimeDeal(product)];
                    case 1:
                        deal = _a.sent();
                        if (deal.dealTime) {
                            if (deal.discount > 0) {
                                product.dealActive = true;
                                if (!product.isPriceList) {
                                    product.discountedPrice = product.prodPrice - (product.prodPrice * (deal.discount / 100));
                                }
                                else {
                                    product.priceList.forEach(function (pl) {
                                        pl.discountedPrice = pl.price - (pl.price * (deal.discount / 100));
                                    });
                                }
                            }
                        }
                        if (this.selectedUser.subRole && this.selectedUser.subRole === 'retailer' && this.configService.environment.priceForRetail) {
                            retailDiscount_1 = product.retailDiscount ? product.retailDiscount : 0;
                            if (retailDiscount_1) {
                                if (!product.isPriceList) {
                                    product.discountedPrice = product.prodPrice - (product.prodPrice * (retailDiscount_1 / 100));
                                }
                                else {
                                    product.priceList.forEach(function (pl) {
                                        pl.discountedPrice = pl.price - (pl.price * (retailDiscount_1 / 100));
                                    });
                                }
                            }
                        }
                        return [2 /*return*/, product];
                }
            });
        });
    };
    CreateOrderPage.prototype.checkLimitedTimeDeal = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var discount, index, currentTime, startDate, startTime, endDate, endTime, startDateTime, endDateTime, diff, duration, dealTime;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (data.hasOwnProperty('deal') && data.deal.isAllowed) {
                    discount = data.deal.discount;
                    if ('specificUsers' in data.deal && data.deal.specificUsers.active && data.deal.specificUsers.users && data.deal.specificUsers.users.length) {
                        index = data.deal.specificUsers.users.findIndex(function (u) { return u.id === _this.selectedUser.id; });
                        if (index === -1) {
                            return [2 /*return*/, { dealTime: null, discount: null }];
                        }
                        else {
                            discount = data.deal.specificUsers.users[index].discount;
                        }
                    }
                    currentTime = moment__WEBPACK_IMPORTED_MODULE_10__();
                    startDate = moment__WEBPACK_IMPORTED_MODULE_10__(data.deal.start.date).format('YYYY-MM-DD');
                    startTime = moment__WEBPACK_IMPORTED_MODULE_10__(data.deal.start.time).format('HH:mm');
                    endDate = moment__WEBPACK_IMPORTED_MODULE_10__(data.deal.end.date).format('YYYY-MM-DD');
                    endTime = moment__WEBPACK_IMPORTED_MODULE_10__(data.deal.end.time).format('HH:mm');
                    startDateTime = moment__WEBPACK_IMPORTED_MODULE_10__(startDate + " " + startTime);
                    endDateTime = moment__WEBPACK_IMPORTED_MODULE_10__(endDate + " " + endTime);
                    if (moment__WEBPACK_IMPORTED_MODULE_10__(currentTime).isBetween(startDateTime, endDateTime)) {
                        diff = moment__WEBPACK_IMPORTED_MODULE_10__(endDateTime, 'YYYY-MM-DD HH:mm:ss').diff(moment__WEBPACK_IMPORTED_MODULE_10__(currentTime, 'DD/MM/YYYY HH:mm:ss'));
                        duration = moment__WEBPACK_IMPORTED_MODULE_10__["duration"](diff);
                        dealTime = Math.floor(duration.asHours()) + moment__WEBPACK_IMPORTED_MODULE_10__["utc"](diff).format(":mm:ss");
                        //console.log('dealTime', dealTime);
                        return [2 /*return*/, { dealTime: dealTime, discount: discount }];
                    }
                    else {
                        //console.log('not between');
                        return [2 /*return*/, { dealTime: null, discount: null }];
                    }
                }
                else {
                    return [2 /*return*/, { dealTime: null, discount: null }];
                }
                return [2 /*return*/];
            });
        });
    };
    CreateOrderPage.prototype.clearPhone = function () {
        this.searchUserPhone = '';
    };
    CreateOrderPage.prototype.clearName = function () {
        this.searchUser = '';
    };
    // async fireSearchQuery() {
    //   if (this.searchUserPhone != ''){
    //     let result:any = await this.userService.searchUserByNumber(this.configService.environment.defaultCountryCode + this.searchUserPhone)
    //     for (let i = 0; i < result.length; i++) {
    //       let data = result[i].data
    //       data['id'] = result[i].id
    //       result[i] = data
    //     }
    //     this.userList = []
    //     result.forEach(user => {
    //       if (user.role == 'user'){
    //         user['selected'] = false;
    //         this.userList.push(user);
    //       }
    //     });
    //   }
    //   if (this.searchUser != ''){
    //     let result:any = await this.userService.searchUserByName(this.searchUser)
    //     for (let i = 0; i < result.length; i++) {
    //       let data = result[i].data
    //       data['id'] = result[i].id
    //       result[i] = data
    //     }
    //     this.userList = []
    //     result.forEach(user => {
    //       if (user.role == 'user'){
    //         user['selected'] = false;
    //         this.userList.push(user);
    //       }
    //     });
    //   }
    // }
    CreateOrderPage.prototype.typeSenseSearchQuery = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var page, typeSenseResponse, i, data;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.searchValue != '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        page = 1;
                        return [4 /*yield*/, this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, page, 'new_search', [])];
                    case 2:
                        typeSenseResponse = _a.sent();
                        console.log("typeSenseResponse", typeSenseResponse);
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
                            for (i = 0; i < typeSenseResponse.users.length; i++) {
                                data = typeSenseResponse.users[i].data;
                                data['id'] = typeSenseResponse.users[i].id;
                                typeSenseResponse.users[i] = data;
                            }
                            this.userList = [];
                            typeSenseResponse.users.forEach(function (user) {
                                if (user.role == 'user') {
                                    user['selected'] = false;
                                    // if (user.phoneNo) {
                                    //   if (!user.phoneNo.startsWith(this.defaultCountryCode)) {
                                    //     user.phoneNo = this.defaultCountryCode + user.phoneNo;
                                    //   }
                                    // }
                                    _this.userList.push(user);
                                }
                            });
                        }
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.sharedService.presentAlert("Please enter valid details!")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.openCouponsModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.couponApplied) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.modalController.create({
                            component: _coupons_list_coupons_list_page__WEBPACK_IMPORTED_MODULE_14__["CouponsListPage"],
                            componentProps: {
                                uid: this.selectedUser.id
                            },
                            cssClass: 'coupons-list-modal modal-bg'
                        })];
                    case 2:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                if (res && res.data) {
                                    this.couponCode = res.data.couponName;
                                    this.applyCouponCode();
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.applyCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.paymentDetails.products = this.productsAdded.filter(p => p.orderType !== 'free');
                        this.paymentDetails.products = this.productsAdded;
                        this.paymentDetails.totalMrp = this.calcTotalMrp(this.productsAdded);
                        this.paymentDetails.discountOnMrp = this.calcDiscountOnMrp(this.productsAdded);
                        this.paymentDetails.totalGst = this.calcOrderSummaryGst();
                        this.paymentDetails.totalPayable = this.calcOrderSummaryTotalAmtToPaid();
                        this.paymentDetails.delivery.deliveryCost = this.delivery;
                        console.log('...', this.paymentDetails);
                        return [4 /*yield*/, this.presentLoading('verifying coupon code')];
                    case 1:
                        _a.sent();
                        data = {
                            code: this.couponCode,
                            paymentDetails: this.paymentDetails,
                            isGstApplicable: this.isGstApplicable,
                            userId: this.selectedUser.id
                        };
                        this.events.publish('coupon-codes:verifyCouponCode', data);
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.removeCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.couponApplied = false;
                this.couponDiscount = 0;
                this.couponCode = '';
                this.couponId = '';
                this.isCodAvailableForCoupon = true;
                return [2 /*return*/];
            });
        });
    };
    CreateOrderPage.prototype.onChangeDiscountedPrice = function () {
        // if(this.couponApplied) {
        //   this.removeCouponCode()
        // }
    };
    // ? Attach image functionality Start
    CreateOrderPage.prototype.readBase64 = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var reader;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                    resolve(event.target.result);
                };
                return [2 /*return*/];
            });
        }); });
    };
    CreateOrderPage.prototype.uploadCommentImgs = function (files, pid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var imgs, i, base64Image;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imgs = this.listOfCommentImages[pid] || [];
                        console.log("imgs", imgs);
                        console.log("uploadCommentImgs", this.listOfCommentImages[pid]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.readBase64(files.item(i))];
                    case 2:
                        base64Image = _a.sent();
                        if (imgs.length !== 0) {
                            imgs.push(base64Image);
                        }
                        else {
                            imgs = [base64Image];
                        }
                        this.listOfCommentImages[pid] = imgs;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("listOfCommentImages", this.listOfCommentImages);
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateOrderPage.prototype.removeCommentImage = function (imgIndex, pid) {
        this.listOfCommentImages[pid].splice(imgIndex, 1);
        console.log('listOfCommentImages', this.listOfCommentImages);
    };
    CreateOrderPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_15__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    CreateOrderPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: src_app_services_product_subscriptions_product_subscriptions_service__WEBPACK_IMPORTED_MODULE_8__["ProductSubscriptionsService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_12__["Storage"] },
        { type: src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_13__["SearchEngineService"] }
    ]; };
    CreateOrderPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-order',
            template: __webpack_require__(/*! raw-loader!./create-order.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/create-order/create-order.page.html"),
            styles: [__webpack_require__(/*! ./create-order.page.scss */ "./src/app/admin/admin-orders/create-order/create-order.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            src_app_services_product_subscriptions_product_subscriptions_service__WEBPACK_IMPORTED_MODULE_8__["ProductSubscriptionsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_12__["Storage"],
            src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_13__["SearchEngineService"]])
    ], CreateOrderPage);
    return CreateOrderPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-orders-create-order-create-order-module-es5.js.map