(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-payment-settings-admin-payment-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-payment-settings/admin-payment-settings.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-payment-settings/admin-payment-settings.page.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Payment Setting</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-null\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\"\r\n    style=\"width: 100%;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2\r\n          id=\"scroll1\">\r\n          <div class=\"statusList\">\r\n            <p [id]=\"i\"\r\n              *ngFor='let item of sidemenu; let i=index'\r\n              (click)='changeComponent(i)'>{{item}}</p>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=10\r\n          style=\"margin-top: 8px; border-left: 1px solid lightgray;\"\r\n          id=\"scroll2\">\r\n          <ion-col>\r\n            <ion-button (click)=\"onClickSavePaymentSettings()\"\r\n              color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>\r\n          </ion-col>\r\n          <br>\r\n          <ion-col>\r\n            <div class=\"spinner\"\r\n              *ngIf=\"showLoader; else showPaymentSettingsData\">\r\n              <ion-spinner color=\"primary\"></ion-spinner>\r\n            </div>\r\n            <ng-template #showPaymentSettingsData>\r\n              <br>\r\n              <ion-grid [ngSwitch]=\"selectedId\">\r\n                <ion-row>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"0\">\r\n                    <div class=\"input-wrap\">\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>Auto Confirm order</ion-label>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\"\r\n                              (click)=\"autoConfirmOrderToggle()\"\r\n                              [checked]=\"autoConfirmOrder == true\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"1\">\r\n                    <div class=\"input-wrap\">\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>Generate Invoice</ion-label>&nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\"\r\n                              (click)=\"generateInvoiceToggle()\"\r\n                              [checked]=\"generateInvoice == true\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ion-col>\r\n                  <div *ngSwitchCase=\"2\">\r\n                    <ion-col size=\"6\"\r\n                      *ngSwitchCase=\"2\">\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>GST Applicable</ion-label>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\"\r\n                                (click)=\"gstToggle()\"\r\n                                [checked]=\"isGstApplicable\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\"\r\n                      *ngIf=\"isGstApplicable\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>GST No.</ion-label>\r\n                        <ion-input type=\"tel\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"gstNo\"></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n                  </div>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"3\">\r\n                    <div class=\"input-wrap\">\r\n                      <ion-label>{{taxName}}</ion-label>\r\n                      <ion-input type=\"tel\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"panNo\"></ion-input>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\"\r\n                    *ngSwitchCase=\"4\">\r\n                    <div class=\"input-wrap\">\r\n                      <ion-label>Minimum order amount ({{currencyCode}})\r\n                      </ion-label>\r\n                      <ion-input type=\"tel\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"minOrderAmount\"></ion-input>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\"\r\n                    *ngSwitchCase=\"5\">\r\n                    <div class=\"input-wrap\">\r\n                      <ion-label>Maximum order amount ({{currencyCode}})\r\n                      </ion-label>\r\n                      <ion-input type=\"tel\"\r\n                        class=\"form-input\"\r\n                        [(ngModel)]=\"maxOrderAmount\"></ion-input>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"6\">\r\n                    <div class=\"input-wrap\">\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>Allow Cash on Delivery</ion-label>\r\n                        &nbsp;&nbsp;\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\"\r\n                              (click)=\"codToggleChange()\"\r\n                              [checked]=\"isCod\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-row *ngSwitchCase=\"7\">\r\n                    <ion-col size=\"12\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>Max % of Cash On Delivery Allowed</ion-label>\r\n                        <ion-input type=\"number\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"codPercentage\"></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>% of Online Payment</ion-label>\r\n                        <ion-input type=\"number\"\r\n                          class=\"form-input\"\r\n                          value=\"{{100-codPercentage}}\"\r\n                          readonly></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n\r\n                    <!-- TODO - COD -->\r\n                    <ion-col size=\"12\">\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label>Extra Charges</ion-label>\r\n                          </div>\r\n                        </div>\r\n                        <br />\r\n                        <div class=\"flex-label\">\r\n                          <p>Flat</p>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input color=\"primary\"\r\n                                type=\"checkbox\"\r\n                                (click)=\"extraChargesType($event)\"\r\n                                [checked]=\"extraChargeType != 'flat'\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>&nbsp;&nbsp;\r\n                          <p>Percentage ( % )</p>&nbsp;&nbsp;\r\n                        </div>\r\n                        <div class=\"extra-charges\">\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charge Name\r\n                              </ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"chargeName\"\r\n                              type=\"text\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charges\r\n                                {{charCOD}}</ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"extraCharges\"\r\n                              type=\"number\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div *ngIf=\"toggleStateCOD == 'perc'\">\r\n                            <div class=\"flex-space-between\">\r\n                              <div>\r\n                                <ion-label style=\"margin-right: 20px;\">Max\r\n                                  Amount\r\n                                </ion-label>\r\n                              </div>\r\n                              <ion-input class=\"form-input\"\r\n                                [(ngModel)]=\"maxCharge\"\r\n                                type=\"number\"\r\n                                style=\"max-width: 10rem; margin-right: 20px;\">\r\n                              </ion-input>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n\r\n                  </ion-row>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"8\">\r\n                    <div class=\"input-wrap\">\r\n                      <div class=\"flex-space-between\">\r\n\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>Enable RazorPay</ion-label>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\"\r\n                                (click)=\"razorpayToggleChange()\"\r\n                                [checked]=\"razorpayActive == true\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <br />\r\n                      <div>\r\n                        <ion-label>RazorPay ID</ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"razorpayId\"></ion-input>\r\n                      </div>\r\n                      <br />\r\n                      <div>\r\n                        <ion-label>RazorPay Key Secret</ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"razorpayKeySecret\"></ion-input>\r\n                      </div>\r\n                      <br />\r\n                      <div>\r\n                        <div class=\"flex-space-between\">\r\n                          <div class=\"flex-label\">\r\n                            <ion-label>Enable Instant Refund</ion-label>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\"\r\n                                (click)=\"razorpayInstantRefundToggleChange()\"\r\n                                [checked]=\"razorpayInstantRefund == true\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <br />\r\n                      <div>\r\n                        <p style=\"color: red;\">\r\n                          *** Razorpay charges a small transaction fee to process Instant refunds. The fees is deducted directly from your account balance and reflects under the <a style=\"color: blue\" href=\"https://dashboard.razorpay.com/app/payments/\" target=\"_blank\">Razorpay Dashboard Refunds tab</a>.\r\n                           In cases where the Instant refund fails and the refund takes 5-7 working days, the levied fee is credited back to your account balance. The fee break-up is shown in the end-of-the-month invoice generated by Razorpay. You can view and download the details from the Instant Refunds Reports from the Razorpay Dashboard.\r\n                        </p>\r\n                      </div>\r\n                      <br />\r\n\r\n                      <!-- TODO - RAZORPAY -->\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label>Extra Charges</ion-label>\r\n                          </div>\r\n                        </div>\r\n                        <br />\r\n                        <div class=\"flex-label\">\r\n                          <p>Flat</p>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input color=\"primary\"\r\n                                type=\"checkbox\"\r\n                                (click)=\"extraChargesTypeRazorpay($event)\"\r\n                                [checked]=\"extraChargeTypeRazorpay != 'flat'\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>&nbsp;&nbsp;\r\n                          <p>Percentage ( % )</p>&nbsp;&nbsp;\r\n                        </div>\r\n                        <div class=\"extra-charges\">\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charge Name\r\n                              </ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"chargeNameRazorpay\"\r\n                              type=\"text\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charges\r\n                                {{charRZP}}</ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"extraChargesRazorpay\"\r\n                              type=\"number\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div *ngIf=\"toggleStateRZP == 'perc'\">\r\n                            <div class=\"flex-space-between\">\r\n                              <div>\r\n                                <ion-label style=\"margin-right: 20px;\">Max\r\n                                  Amount\r\n                                </ion-label>\r\n                              </div>\r\n                              <ion-input class=\"form-input\"\r\n                                [(ngModel)]=\"maxChargeRazorpay\"\r\n                                type=\"number\"\r\n                                style=\"max-width: 10rem; margin-right: 20px;\">\r\n                              </ion-input>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"9\">\r\n                    <div class=\"input-wrap\">\r\n                      <div class=\"flex-space-between\">\r\n\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>Enable Paytm</ion-label>&nbsp;&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\"\r\n                                (click)=\"paytmToggleChange()\"\r\n                                [checked]=\"paytmActive\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <br />\r\n                      <div>\r\n                        <ion-label>Paytm ID</ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"paytmMerchantId\"></ion-input>\r\n                      </div>\r\n                      <br />\r\n                      <ion-text color=\"danger\">\r\n                        <p>Please contact support team after updating this, it\r\n                          will not work in real time</p>\r\n                      </ion-text>\r\n                      <br />\r\n                      <div>\r\n                        <ion-label>Paytm Key Secret</ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"paytmKey\"></ion-input>\r\n                      </div>\r\n                      <br />\r\n                      <ion-text color=\"danger\">\r\n                        <p>Please contact support team after updating this, it\r\n                          will not work in real time</p>\r\n                      </ion-text>\r\n                      <br />\r\n\r\n                      <!-- TODO - PAYTM -->\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-space-between\">\r\n                          <div>\r\n                            <ion-label>Extra Charges</ion-label>\r\n                          </div>\r\n                        </div>\r\n                        <br />\r\n                        <div class=\"flex-label\">\r\n                          <p>Flat</p>&nbsp;&nbsp;\r\n                          <div class=\"toggle-btn\">\r\n                            <label class=\"switch\">\r\n                              <input color=\"primary\"\r\n                                type=\"checkbox\"\r\n                                (click)=\"extraChargesTypePaytm($event)\"\r\n                                [checked]=\"extraChargeTypePaytm != 'flat'\">\r\n                              <span class=\"slider round\"></span>\r\n                            </label>\r\n                          </div>&nbsp;&nbsp;\r\n                          <p>Percentage ( % )</p>&nbsp;&nbsp;\r\n                        </div>\r\n                        <div class=\"extra-charges\">\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charge Name\r\n                              </ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"chargeNamePaytm\"\r\n                              type=\"text\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div class=\"flex-space-between\">\r\n                            <div>\r\n                              <ion-label style=\"margin-right: 20px;\">Charges\r\n                                {{charPT}}</ion-label>\r\n                            </div>\r\n                            <ion-input class=\"form-input\"\r\n                              [(ngModel)]=\"extraChargesPaytm\"\r\n                              type=\"number\"\r\n                              style=\"max-width: 10rem; margin-right: 20px;\">\r\n                            </ion-input>\r\n                          </div>\r\n\r\n                          <div *ngIf=\"toggleStatePT == 'perc'\">\r\n                            <div class=\"flex-space-between\">\r\n                              <div>\r\n                                <ion-label style=\"margin-right: 20px;\">Max\r\n                                  Amount\r\n                                </ion-label>\r\n                              </div>\r\n                              <ion-input class=\"form-input\"\r\n                                [(ngModel)]=\"maxChargePaytm\"\r\n                                type=\"number\"\r\n                                style=\"max-width: 10rem; margin-right: 20px;\">\r\n                              </ion-input>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-row *ngSwitchCase=\"10\">\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"img-container\"\r\n                        (click)=\"openGatewaySettings('ccAvenue')\">\r\n                        <img\r\n                          src=\"../../../assets/img/payment-gateways/ccavenue.png\"\r\n                          alt=\"CCAvenue Payment\">\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"img-container\"\r\n                        (click)=\"openGatewaySettings('stripe')\">\r\n                        <img\r\n                          src=\"../../../assets/img/payment-gateways/stripe.png\"\r\n                          alt=\"Stripe Payment\">\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"img-container\"\r\n                        (click)=\"openGatewaySettings('paypal')\">\r\n                        <img\r\n                          src=\"../../../assets/img/payment-gateways/paypal.png\"\r\n                          alt=\"Paypal Payment\">\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"4\">\r\n                      <div class=\"img-container\"\r\n                        (click)=\"openGatewaySettings('cashfree')\">\r\n                        <img\r\n                          src=\"../../../assets/img/payment-gateways/cashfree.jpg\"\r\n                          alt=\"CashFree Payment\">\r\n                      </div>\r\n                    </ion-col>\r\n                    <!-- <ion-col size=\"4\">\r\n                        <div class=\"img-container\" (click)=\"openGatewaySettings('payU')\">\r\n                          <img\r\n                            src=\"../../../assets/img/payment-gateways/payU.png\"\r\n                            alt=\"PayU Payment\">\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"img-container\" (click)=\"openGatewaySettings('paykun')\">\r\n                          <img src=\"../../../assets/img/payment-gateways/paykun.png\" alt=\"Paykun Payment\">\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"img-container\" (click)=\"openGatewaySettings('atom')\">\r\n                          <img src=\"../../../assets/img/payment-gateways/atom.png\" alt=\"atom Payment\">\r\n                        </div>\r\n                      </ion-col> -->\r\n                  </ion-row>\r\n                  <ion-col size=\"12\"\r\n                    *ngSwitchCase=\"11\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>UPI Payment With Screenshot (Save Transaction\r\n                        Costs)</ion-label>&nbsp;&nbsp;\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\"\r\n                            (click)=\"upiManualToggle()\"\r\n                            [checked]=\"upiManual.active\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                    <div *ngIf=\"upiManual.active\">\r\n                      <p>Payment Details</p>\r\n                      <ion-textarea type=\"text\"\r\n                        rows=\"4\"\r\n                        class=\"input-border\"\r\n                        [(ngModel)]=\"upiManual.upiId\">\r\n                      </ion-textarea>\r\n                      <br>\r\n                      <p>QR Code</p>\r\n                      <div>\r\n                        <!-- new images-->\r\n                        <div class=\"dropzone\"\r\n                          appDropzone\r\n                          (dropped)=\"onDrop($event)\">\r\n                          <h3>Drag and Drop a File</h3>\r\n\r\n                          <div class=\"file\">\r\n                            <input class=\"file-input\"\r\n                              multiple\r\n                              type=\"file\"\r\n                              (change)=\"onDrop($event.target.files)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"ps-qr\"\r\n                          *ngIf=\"upiManual.qrCode\">\r\n                          <h3>Uploaded</h3>\r\n                          <div class=\"ps-qr-remove-btn\"\r\n                            (click)=\"removeImage()\">\r\n                            <i class=\"flaticon-null-17\"></i>\r\n                          </div>\r\n                          <img src=\"{{upiManual.qrCode}}\" />\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row *ngSwitchCase=\"12\">\r\n                  <ion-row>\r\n                    <ion-col>\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>Custom Payment option</ion-label>\r\n                          <ion-toggle [(ngModel)]=\"custom.active\"></ion-toggle>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                  <ion-row *ngIf=\"custom.active\">\r\n                    <ion-col size=\"12\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>\r\n                          Payment Option Name\r\n                        </ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          placeholder=\"Eg - Pay By Cheque\"\r\n                          [(ngModel)]=\"custom.name\"></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\">\r\n                      <div class=\"input-wrap\">\r\n                        <ion-label>\r\n                          Payment Details\r\n                        </ion-label>\r\n                        <ion-input type=\"text\"\r\n                          class=\"form-input\"\r\n                          [(ngModel)]=\"custom.details\"></ion-input>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\">\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>Make Text Details mandatory from customer\r\n                          </ion-label>\r\n                          <ion-toggle [(ngModel)]=\"custom.textMandatory\">\r\n                          </ion-toggle>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\">\r\n                      <div class=\"input-wrap\">\r\n                        <div class=\"flex-label\">\r\n                          <ion-label>Make Image mandatory from customer\r\n                          </ion-label>\r\n                          <ion-toggle [(ngModel)]=\"custom.imageMandatory\">\r\n                          </ion-toggle>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\">\r\n                      <div>\r\n                        <p>Add Image</p>\r\n                        <div>\r\n                          <!-- new images-->\r\n                          <div class=\"dropzone\"\r\n                            appDropzone\r\n                            (dropped)=\"onDrop($event, 'customPayment')\">\r\n                            <h3>Drag and Drop a File</h3>\r\n                            <div class=\"file\">\r\n                              <input class=\"file-input\"\r\n                                type=\"file\"\r\n                                (change)=\"onDrop($event.target.files, 'customPayment')\"\r\n                                accept=\"image/*\">\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"ps-qr\"\r\n                            *ngIf=\"custom.image.url\">\r\n                            <h3>Uploaded</h3>\r\n                            <div class=\"ps-qr-remove-btn\"\r\n                              (click)=\"removeImage('customPayment')\">\r\n                              <i class=\"flaticon-null-17\"></i>\r\n                            </div>\r\n                            <img src=\"{{custom.image.url}}\" />\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ng-template>\r\n          </ion-col>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-payment-settings/admin-payment-settings.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-payment-settings/admin-payment-settings.module.ts ***!
  \*******************************************************************************/
/*! exports provided: AdminPaymentSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPaymentSettingsPageModule", function() { return AdminPaymentSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_payment_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-payment-settings.page */ "./src/app/admin/admin-payment-settings/admin-payment-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _admin_payment_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminPaymentSettingsPage"]
    }
];
var AdminPaymentSettingsPageModule = /** @class */ (function () {
    function AdminPaymentSettingsPageModule() {
    }
    AdminPaymentSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_admin_payment_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminPaymentSettingsPage"]]
        })
    ], AdminPaymentSettingsPageModule);
    return AdminPaymentSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-payment-settings/admin-payment-settings.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-payment-settings/admin-payment-settings.page.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.input-border {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.payment-settings-content {\n  font-size: 14px;\n}\n\n.payment-settings-content p {\n  margin-bottom: 5px;\n  text-transform: capitalize;\n}\n\n.payment-settings-content p strong {\n  letter-spacing: 0.9px;\n}\n\n.payment-mode-active {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\nion-input,\nion-textarea {\n  font-size: 15px;\n}\n\n.img-container {\n  width: 80%;\n  height: 60%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin: auto;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n}\n\n.img-container img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.img-container img:hover {\n  cursor: pointer;\n}\n\n.dropzone {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  flex-direction: column;\n  font-weight: 200;\n  height: 150px;\n  border: 2px dashed var(--ion-color-primary);\n  border-radius: 16px;\n  background: white;\n  margin: 10px 0;\n  width: 400px;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.extra-charges {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: baseline;\n          align-items: baseline;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tcGF5bWVudC1zZXR0aW5ncy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLXBheW1lbnQtc2V0dGluZ3NcXGFkbWluLXBheW1lbnQtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1wYXltZW50LXNldHRpbmdzL2FkbWluLXBheW1lbnQtc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FERUE7RUFDRSxxQkFBQTtBQ0NGOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNDRjs7QURFQTs7RUFFRSxlQUFBO0FDQ0Y7O0FER0E7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FGOztBRENFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FEQ0U7RUFDRSxlQUFBO0FDQ0o7O0FER0E7RUFDRSxvQkFBQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FDQUo7O0FER0E7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNBRjs7QURHQztFQUNDLGdCQUFBO0FDQUY7O0FER0M7RUFDQyxnQkFBQTtFQUNBLFlBQUE7QUNBRjs7QURHQztFQUNDLGdCQUFBO0FDQUY7O0FER0M7RUFDQztJQUNFLFlBQUE7RUNBRjs7RURFQTtJQUNFLFlBQUE7RUNDRjtBQUNGOztBREVDO0VBQ0Msa0JBQUE7QUNBRjs7QURDRTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURHQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSwyQkFBQTtVQUFBLHFCQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1wYXltZW50LXNldHRpbmdzL2FkbWluLXBheW1lbnQtc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwaW5uZXIge1xyXG4gIG1hcmdpbi10b3A6IDUwJTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5pbnB1dC1ib3JkZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4ucGF5bWVudC1zZXR0aW5ncy1jb250ZW50IHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5wYXltZW50LXNldHRpbmdzLWNvbnRlbnQgcCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG59XHJcblxyXG4ucGF5bWVudC1zZXR0aW5ncy1jb250ZW50IHAgc3Ryb25nIHtcclxuICBsZXR0ZXItc3BhY2luZzogMC45cHg7XHJcbn1cclxuXHJcbi5wYXltZW50LW1vZGUtYWN0aXZlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5pb24taW5wdXQsXHJcbmlvbi10ZXh0YXJlYSB7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcblxyXG4vLyBQYXltZW50IEdhdGV3YXlcclxuLmltZy1jb250YWluZXJ7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBoZWlnaHQ6IDYwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBpbWd7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuICBpbWc6aG92ZXIge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG5cclxuLmRyb3B6b25le1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICBib3JkZXI6IDJweCBkYXNoZWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbn1cclxuXHJcbiNzY3JvbGwxe1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoXHJcbiB9XHJcblxyXG4gI3Njcm9sbDE6aG92ZXJ7XHJcbiAgb3ZlcmZsb3cteTogYXV0b1xyXG4gfVxyXG5cclxuICNzY3JvbGwye1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoO1xyXG4gfVxyXG5cclxuICNzY3JvbGwyOmhvdmVye1xyXG4gIG92ZXJmbG93LXk6IGF1dG9cclxuIH1cclxuXHJcbiBAbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAjc2Nyb2xsMXtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICAgfVxyXG4gICNzY3JvbGwye1xyXG4gICAgaGVpZ2h0OiA5MnZoO1xyXG4gICB9XHJcbiB9XHJcblxyXG4gLnN0YXR1c0xpc3R7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHB7XHJcbiAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbi5leHRyYS1jaGFyZ2VzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XHJcbn0iLCIuc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaW5wdXQtYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucGF5bWVudC1zZXR0aW5ncy1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ucGF5bWVudC1zZXR0aW5ncy1jb250ZW50IHAge1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG4ucGF5bWVudC1zZXR0aW5ncy1jb250ZW50IHAgc3Ryb25nIHtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuOXB4O1xufVxuXG4ucGF5bWVudC1tb2RlLWFjdGl2ZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuaW9uLWlucHV0LFxuaW9uLXRleHRhcmVhIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4uaW1nLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA4MCU7XG4gIGhlaWdodDogNjAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiBhdXRvO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG4uaW1nLWNvbnRhaW5lciBpbWcge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG59XG4uaW1nLWNvbnRhaW5lciBpbWc6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5kcm9wem9uZSB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgYm9yZGVyOiAycHggZGFzaGVkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIG1hcmdpbjogMTBweCAwO1xuICB3aWR0aDogNDAwcHg7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcbiAgI3Njcm9sbDEge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxuXG4gICNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn1cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5leHRyYS1jaGFyZ2VzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-payment-settings/admin-payment-settings.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/admin-payment-settings/admin-payment-settings.page.ts ***!
  \*****************************************************************************/
/*! exports provided: AdminPaymentSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPaymentSettingsPage", function() { return AdminPaymentSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/loggly-logger/loggly-logger.service */ "./src/app/services/loggly-logger/loggly-logger.service.ts");
/* harmony import */ var _payment_gateway_settings_payment_gateway_settings_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./payment-gateway-settings/payment-gateway-settings.page */ "./src/app/admin/admin-payment-settings/payment-gateway-settings/payment-gateway-settings.page.ts");









var AdminPaymentSettingsPage = /** @class */ (function () {
    function AdminPaymentSettingsPage(events, router, loadingController, alertController, labelService, configService, actionSheetController, camera, logglyService, modalController) {
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.labelService = labelService;
        this.configService = configService;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.logglyService = logglyService;
        this.modalController = modalController;
        this.paytmMerchantId = '';
        this.paytmKey = '';
        this.razorpayId = '';
        this.razorpayKeySecret = '';
        this.gstNo = '';
        this.defaultGst = '';
        this.minOrderAmount = '';
        this.maxOrderAmount = '';
        this.packaging = {
            label: '',
            price: ''
        };
        this.showLoader = true;
        this.isGstApplicable = true;
        this.panNo = '';
        this.isCod = true;
        this.codPercentage = 100;
        this.ADMIN_PAYMENT_SETTINGS_LABELS = {};
        this.SHARED_LABELS = {};
        this.upiManual = {
            active: false,
            upiId: '',
            qrCode: ''
        };
        this.generateInvoice = true;
        this.custom = {
            active: false,
            name: '',
            details: '',
            image: {
                url: ''
            },
            textMandatory: false,
            imageMandatory: false
        };
        this.sidemenu = [];
        this.selectedId = '0';
        this.isCashFreeFeature = false;
        this.extraCharges = 0;
        this.extraChargeType = 'flat';
        this.extraChargesRazorpay = 0;
        this.extraChargeTypeRazorpay = 'flat';
        this.maxChargeRazorpay = 0;
        this.chargeNameRazorpay = '';
        this.extraChargesPaytm = 0;
        this.extraChargeTypePaytm = 'flat';
        this.maxChargePaytm = 0;
        this.chargeNamePaytm = '';
        this.charCOD = this.configService.environment.currencyCode;
        this.charRZP = this.configService.environment.currencyCode;
        this.charPT = this.configService.environment.currencyCode;
        this.toggleStateCOD = 'flt';
        this.toggleStateRZP = 'flt';
        this.toggleStatePT = 'flt';
        this.maxCharge = 0;
        this.chargeName = '';
    }
    AdminPaymentSettingsPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.currencyCode = this.configService.environment.currencyCode;
        this.taxName = this.configService.environment.taxName;
        this.isCashFreeFeature = (this.configService.environment.cashfree && this.configService.environment.cashfree.production);
        this.sidemenu.push('Auto Confirm Order', 'Generate Invoice', 'GST Applicable', this.taxName, 'Minimum Order Amount', 'Maximum Order Amount', 'Allow Cash on Delivery');
        if (this.isCod) {
            this.sidemenu.push('Cash On Delivery');
        }
        this.sidemenu.push('RazorPay Settings', 'Paytm Settings', 'Payment Gateways', 'UPI Payment Settings', 'Custom Payment Option');
    };
    AdminPaymentSettingsPage.prototype.ionViewWillEnter = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADMIN_PAYMENT_SETTINGS_LABELS = this.labelService.labels['ADMIN_PAYMENT_SETTINGS'];
    };
    AdminPaymentSettingsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    AdminPaymentSettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('admin-settings:savePaymentSettingsDataSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert("" + _this.ADMIN_PAYMENT_SETTINGS_LABELS['data_saved_successfully']);
        });
        this.events.subscribe('admin-settings:publishPaytmData', function (data) {
            _this.showLoader = false;
            if (!_this.isEmptyObj(data)) {
                _this.paytmActive = data.active;
                _this.paytmKey = data.key;
                _this.paytmMerchantId = data.merchantId;
                _this.extraChargesPaytm = data.extraChargePaytm ? (data.extraChargePaytm.charge ? data.extraChargePaytm.charge : 0) : 0;
                _this.extraChargeTypePaytm = data.extraChargePaytm ? (data.extraChargePaytm.type ? data.extraChargePaytm.type : 'flat') : 'flat';
                _this.maxChargePaytm = data.extraChargePaytm ? (data.extraChargePaytm.maxCharge ? data.extraChargePaytm.maxCharge : 0) : 0;
                _this.chargeNamePaytm = data.extraChargePaytm ? (data.extraChargePaytm.chargeName ? data.extraChargePaytm.chargeName : '') : '';
                // toggle state & char
                if (data.extraChargePaytm && data.extraChargePaytm.type == 'percentage') {
                    _this.toggleStatePT = 'perc';
                    _this.charPT = '%';
                }
            }
        });
        this.events.subscribe('admin-settings:publishRazorPayData', function (data) {
            if (!_this.isEmptyObj(data)) {
                _this.razorpayActive = data.active;
                _this.razorpayId = data.id;
                _this.razorpayInstantRefund = data.instantRefund ? data.instantRefund : false;
                _this.razorpayKeySecret = data.keySecret ? data.keySecret : '';
                _this.extraChargesRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.charge ? data.extraChargeRazorpay.charge : 0) : 0;
                _this.extraChargeTypeRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.type ? data.extraChargeRazorpay.type : 'flat') : 'flat';
                _this.maxChargeRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.maxCharge ? data.extraChargeRazorpay.maxCharge : 0) : 0;
                _this.chargeNameRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.chargeName ? data.extraChargeRazorpay.chargeName : '') : '';
                // toggle state & char
                if (data.extraChargeRazorpay && data.extraChargeRazorpay.type == 'percentage') {
                    _this.toggleStateRZP = 'perc';
                    _this.charRZP = '%';
                }
            }
            _this.events.publish('admin-settings:getPaytmData');
        });
        this.events.subscribe('admin-settings:publishPaymentInfoData', function (data) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            if (!_this.isEmptyObj(data)) {
                _this.autoConfirmOrder = data.autoConfirmOrder;
                _this.gstNo = data.gstNo;
                _this.defaultGst = data.defaultGst;
                _this.minOrderAmount = data.minOrderAmount;
                _this.maxOrderAmount = data.maxOrderAmount;
                _this.isPackagingCharges = data.isPackagingCharges;
                if (!_this.isEmptyObj(data.packaging)) {
                    _this.packaging.label = data.packaging.label;
                    _this.packaging.price = data.packaging.price;
                }
                _this.isGstApplicable = typeof data.isGstApplicable !== 'undefined' ? data.isGstApplicable : true;
                _this.isCod = typeof data.isCod !== 'undefined' ? data.isCod : true;
                _this.codPercentage = data.codPercentage ? data.codPercentage : 100;
                _this.panNo = data.panNo ? data.panNo : '';
                _this.upiManual = data.upiManual ? data.upiManual : _this.upiManual;
                _this.generateInvoice = typeof data.generateInvoice !== 'undefined' ? data.generateInvoice : true;
                _this.custom = data.custom ? data.custom : _this.custom;
                _this.extraCharges = data.extraCharge ? (data.extraCharge.charge ? data.extraCharge.charge : 0) : 0;
                _this.extraChargeType = data.extraCharge ? (data.extraCharge.type ? data.extraCharge.type : 'flat') : 'flat';
                _this.maxCharge = data.extraCharge ? (data.extraCharge.maxCharge ? data.extraCharge.maxCharge : 0) : 0;
                _this.chargeName = data.extraCharge ? (data.extraCharge.chargeName ? data.extraCharge.chargeName : '') : '';
                // toggle state & char
                if (data.extraCharge && data.extraCharge.type == 'percentage') {
                    _this.toggleStateCOD = 'perc';
                    _this.charCOD = '%';
                }
            }
            _this.events.publish('admin-settings:getRazorPayData');
        });
        this.presentLoading();
        this.events.publish('admin-settings:getPaymentInfoData');
    };
    AdminPaymentSettingsPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    AdminPaymentSettingsPage.prototype.paytmToggleChange = function () {
        if (this.paytmActive) {
            this.paytmActive = false;
        }
        else {
            this.paytmActive = true;
        }
    };
    AdminPaymentSettingsPage.prototype.razorpayToggleChange = function () {
        if (this.razorpayActive) {
            this.razorpayActive = false;
        }
        else {
            this.razorpayActive = true;
        }
    };
    AdminPaymentSettingsPage.prototype.onClickSavePaymentSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var paymentData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isCod && (this.codPercentage > 100 || this.codPercentage < 0))) return [3 /*break*/, 1];
                        this.presentAlert('Please enter appropriate COD Percentage');
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.upiManual.active && (!this.upiManual.upiId || !this.upiManual.qrCode))) return [3 /*break*/, 2];
                        this.presentAlert(this.ADMIN_PAYMENT_SETTINGS_LABELS['enter_upi_or_qr']);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.custom.active && (!this.custom.name))) return [3 /*break*/, 3];
                        this.presentAlert('Please provide Payment Option Name under Custom Payment Option');
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.presentLoading()];
                    case 4:
                        _a.sent();
                        paymentData = {
                            paytmActive: this.paytmActive ? this.paytmActive : false,
                            paytmMerchantId: this.paytmMerchantId,
                            paytmKey: this.paytmKey,
                            extraChargePaytm: {
                                type: this.extraChargeTypePaytm || 'flat',
                                charge: this.extraChargesPaytm || 0,
                                maxCharge: this.maxChargePaytm || 0,
                                chargeName: this.chargeNamePaytm || ''
                            },
                            razorpayActive: this.razorpayActive ? this.razorpayActive : false,
                            razorpayId: this.razorpayId,
                            razorpayKeySecret: this.razorpayKeySecret,
                            razorpayInstantRefund: this.razorpayInstantRefund ? this.razorpayInstantRefund : false,
                            extraChargeRazorpay: {
                                type: this.extraChargeTypeRazorpay || 'flat',
                                charge: this.extraChargesRazorpay || 0,
                                maxCharge: this.maxChargeRazorpay || 0,
                                chargeName: this.chargeNameRazorpay || ''
                            },
                            autoConfirmOrder: this.autoConfirmOrder ? this.autoConfirmOrder : false,
                            gstNo: this.gstNo,
                            defaultGst: this.defaultGst,
                            minOrderAmount: this.minOrderAmount,
                            maxOrderAmount: this.maxOrderAmount,
                            isPackagingCharges: this.isPackagingCharges ? this.isPackagingCharges : false,
                            packaging: {
                                label: this.packaging.label,
                                price: this.packaging.price
                            },
                            isGstApplicable: this.isGstApplicable,
                            isCod: this.isCod,
                            codPercentage: this.codPercentage,
                            panNo: this.panNo,
                            upiManual: this.upiManual,
                            generateInvoice: this.generateInvoice,
                            custom: this.custom,
                            extraCharge: {
                                type: this.extraChargeType || 'flat',
                                charge: this.extraCharges || 0,
                                maxCharge: this.maxCharge || 0,
                                chargeName: this.chargeName || ''
                            }
                        };
                        this.events.publish('admin-settings:savePaymentSettingsData', paymentData);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminPaymentSettingsPage.prototype.presentAlert = function (desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: desc,
                            buttons: ["" + this.SHARED_LABELS['ok']]
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
    AdminPaymentSettingsPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: this.SHARED_LABELS['please_wait'],
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
    AdminPaymentSettingsPage.prototype.autoConfirmOrderToggle = function () {
        this.autoConfirmOrder = !this.autoConfirmOrder;
    };
    AdminPaymentSettingsPage.prototype.packagingToggle = function () {
        this.isPackagingCharges = !this.isPackagingCharges;
    };
    AdminPaymentSettingsPage.prototype.gstToggle = function () {
        this.isGstApplicable = !this.isGstApplicable;
    };
    AdminPaymentSettingsPage.prototype.codToggleChange = function () {
        this.isCod = !this.isCod;
    };
    AdminPaymentSettingsPage.prototype.upiManualToggle = function () {
        this.upiManual.active = !this.upiManual.active;
    };
    AdminPaymentSettingsPage.prototype.removeImage = function (customPayment) {
        if (customPayment) {
            this.custom.image.url = '';
        }
        else {
            this.upiManual.qrCode = '';
        }
    };
    AdminPaymentSettingsPage.prototype.onDrop = function (files, customPayment) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                if (customPayment) {
                    _this.custom.image.url = '';
                    _this.custom.image.url = base64Image;
                }
                else {
                    _this.upiManual.qrCode = '';
                    _this.upiManual.qrCode = base64Image;
                }
            };
        }
    };
    AdminPaymentSettingsPage.prototype.generateInvoiceToggle = function () {
        this.generateInvoice = !this.generateInvoice;
    };
    AdminPaymentSettingsPage.prototype.removeSubscriptions = function () {
        this.events.subscribe('admin-settings:savePaymentSettingsDataSuccess');
        this.events.subscribe('admin-settings:publishPaytmData');
        this.events.subscribe('admin-settings:publishRazorPayData');
        this.events.subscribe('admin-settings:publishPaymentInfoData');
    };
    AdminPaymentSettingsPage.prototype.openGatewaySettings = function (gatewayChoice) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _payment_gateway_settings_payment_gateway_settings_page__WEBPACK_IMPORTED_MODULE_8__["PaymentGatewaySettingsPage"],
                            backdropDismiss: false,
                            cssClass: 'custom-modal',
                            componentProps: {
                                gatewayChoice: gatewayChoice,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            // if(res.data) {
                            //   res.data.forEach(variantIndex => {
                            //     this.productsAdded.push(this.getCartObj(product, variantIndex));
                            //     this.statusIndex = 4;
                            //   });
                            // }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminPaymentSettingsPage.prototype.changeComponent = function (index) {
        var prevMsgDiv = document.getElementById(this.selectedId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById(index.toString());
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.selectedId = index.toString();
    };
    AdminPaymentSettingsPage.prototype.extraChargesType = function (event) {
        this.extraChargeType = event.target.checked ? 'percentage' : 'flat';
        console.log('Type :', this.extraChargeType);
        console.log('Charge :', this.extraCharges);
        console.log('Max Charge :', this.maxCharge);
        console.log('Charge Name:', this.chargeName);
        if (event.target.checked) {
            this.charCOD = '%';
            this.toggleStateCOD = 'perc';
        }
        else {
            this.charCOD = this.currencyCode;
            this.toggleStateCOD = 'flt';
        }
        console.log('char :', this.charCOD);
    };
    AdminPaymentSettingsPage.prototype.extraChargesTypeRazorpay = function (event) {
        this.extraChargeTypeRazorpay = event.target.checked ? 'percentage' : 'flat';
        console.log('Type Razorpay :', this.extraChargeTypeRazorpay);
        console.log('Charge Razorpay :', this.extraChargesRazorpay);
        console.log('Max Charge Razorpay :', this.maxChargeRazorpay);
        console.log('Charge Name Razorpay :', this.chargeNameRazorpay);
        if (event.target.checked) {
            this.charRZP = '%';
            this.toggleStateRZP = 'perc';
        }
        else {
            this.charRZP = this.currencyCode;
            this.toggleStateRZP = 'flt';
        }
        console.log('char :', this.charRZP);
    };
    AdminPaymentSettingsPage.prototype.extraChargesTypePaytm = function (event) {
        this.extraChargeTypePaytm = event.target.checked ? 'percentage' : 'flat';
        console.log('Type Paytm :', this.extraChargeTypePaytm);
        console.log('Charge Paytm :', this.extraChargesPaytm);
        console.log('Max Charge Paytm:', this.maxChargePaytm);
        console.log('Charge Name Paytm:', this.chargeNamePaytm);
        if (event.target.checked) {
            this.charPT = '%';
            this.toggleStatePT = 'perc';
        }
        else {
            this.charPT = this.currencyCode;
            this.toggleStatePT = 'flt';
        }
        console.log('char :', this.charPT);
    };
    AdminPaymentSettingsPage.prototype.razorpayInstantRefundToggleChange = function () {
        this.razorpayInstantRefund = !this.razorpayInstantRefund;
    };
    AdminPaymentSettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_6__["Camera"] },
        { type: src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    AdminPaymentSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-payment-settings',
            template: __webpack_require__(/*! raw-loader!./admin-payment-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-payment-settings/admin-payment-settings.page.html"),
            styles: [__webpack_require__(/*! ./admin-payment-settings.page.scss */ "./src/app/admin/admin-payment-settings/admin-payment-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_6__["Camera"],
            src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], AdminPaymentSettingsPage);
    return AdminPaymentSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-payment-settings-admin-payment-settings-module-es5.js.map