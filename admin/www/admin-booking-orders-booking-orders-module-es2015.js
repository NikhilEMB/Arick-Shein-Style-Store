(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-booking-orders-booking-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/booking-orders/booking-orders.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/booking-orders/booking-orders.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Bookings Orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"4\">\r\n          <div class=\"searchBox\">\r\n            <ion-input class=\"searchInput\" type='number' placeholder=\"Enter Booking Id\" [(ngModel)]='searchOrder'>\r\n            </ion-input>&nbsp;\r\n            <ion-button (click)='resetSearch()' size=\"small\" fill=\"outline\" color=\"danger\">Clear </ion-button>\r\n          </div>\r\n          <ion-button (click)='searchBookingById()' expand=\"block\" size=\"small\">Search</ion-button>&nbsp;\r\n\r\n          <ng-container *ngIf='!bookingOrders'>\r\n            <h3 class=\"text-center\">\r\n              No Booking\r\n            </h3>\r\n          </ng-container>\r\n\r\n          <div id=\"scroll1\" *ngIf='bookingOrders'>\r\n            <ng-container *ngFor=\"let booking of bookingOrders; index as i\">\r\n              <ion-grid (click)='viewBooking(i)' class='orderList'\r\n                [ngClass]=\"activeTile === i ? 'tile-bg-active' : 'tile-bg-inactive'\">\r\n                <ion-row>\r\n                  <ion-col>\r\n                    <p *ngIf=\"booking.createdAt\" style=\"color: gray;margin-bottom: 5px;\">\r\n                      {{getDateTimeFormat(booking.createdAt.toDate())}}</p>\r\n                  </ion-col>\r\n                  <ion-col style=\"text-align: right\">\r\n                    <p class=\"textCap\">{{booking.status}}</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col class=\"textLeft\">\r\n                    <span class=\"textCap\">User : </span>\r\n                    <span>{{booking.user.name}}</span>\r\n                  </ion-col>\r\n                  <ion-col style=\"text-align: right\">\r\n                    <span class=\"textCap\">Id : </span>\r\n                    <span>{{booking.bookingId}}</span>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col class=\"textLeft\">\r\n                    <span class=\"textCap\">Name : </span>\r\n                    <span>{{booking.item.name}}</span>\r\n                  </ion-col>\r\n                  <ion-col style=\"text-align: right\">\r\n                    <span class=\"textCap\">Price : </span>\r\n                    <span>{{booking.item.price | currency: currencyCode:true:'.2-2'}}</span>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ng-container>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"8\" id=\"scroll2\">\r\n          <ng-container *ngIf=\"!selectedOrder\">\r\n            <h3 class=\"text-center\">No Booking Selected !</h3>\r\n          </ng-container>\r\n\r\n          <ng-container *ngIf=\"selectedOrder\">\r\n            <!-- Buttons Start -->\r\n            <ng-container *ngIf=\"selectedOrder.status != 'completed'\">\r\n              <div class=\"justifyFlex\">\r\n                <ng-container *ngIf=\"selectedOrder.status != 'rejected'\">\r\n                  <ion-button (click)=\"askUpdateStatus('rejected')\" color=\"danger\">\r\n                    <i class=\"flaticon-null-19\"></i>&nbsp;\r\n                    reject booking\r\n                  </ion-button>\r\n                </ng-container>\r\n\r\n                <div class=\"\">\r\n                  <ng-container *ngIf=\"selectedOrder.status == 'pending'\">\r\n                    <ion-button (click)=\"askUpdateStatus('accepted')\" color=\"success\">\r\n                      <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                      accept booking\r\n                    </ion-button>\r\n                  </ng-container>\r\n\r\n                  <ng-container *ngIf=\"selectedOrder.status == 'accepted'\">\r\n                    <ion-button (click)=\"askUpdateStatus('claimed')\" color=\"success\">\r\n                      <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                      claimed\r\n                    </ion-button>\r\n                  </ng-container>\r\n\r\n                  <ng-container *ngIf=\"selectedOrder.status == 'claimed'\">\r\n                    <ion-button (click)=\"askUpdateStatus('completed')\" color=\"success\">\r\n                      <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                      complete booking\r\n                    </ion-button>\r\n                  </ng-container>\r\n                </div>\r\n\r\n              </div>\r\n            </ng-container>\r\n            <!-- Buttons End -->\r\n\r\n            <!-- <ng-container>\r\n              <ion-button (click)=\"askUpdateStatus('pending')\" color=\"success\">restart booking</ion-button>\r\n            </ng-container> -->\r\n\r\n            <ng-container *ngIf=\"selectedOrder.status == 'completed'\">\r\n              <h3 class=\"text-center\">This booking is completed.</h3>\r\n            </ng-container>\r\n\r\n            <ng-container class=\"rejectText\" *ngIf=\"selectedOrder.status == 'rejected'\">\r\n              <h3 class=\"text-center\">This booking is Rejected.</h3>\r\n            </ng-container>\r\n\r\n            <br>\r\n            <div class=\"bookingCard\">\r\n              <h5>Booking Detail</h5>\r\n              <br>\r\n              <div class=\"\">\r\n                <!-- <div class=\"bookingImg\">\r\n                  <ion-thumbnail>\r\n                    <img class=\"loading\"\r\n                      *ngIf=\"selectedOrder.coverPic && !selectedOrder.coverPic.thumb && selectedOrder.coverPic.url\"\r\n                      src=\"{{selectedOrder.coverPic.url}}\">\r\n                    <img class=\"loading\" *ngIf=\"selectedOrder.coverPic && selectedOrder.coverPic.thumb\"\r\n                      src=\"{{selectedOrder.coverPic.thumb}}\">\r\n                    <img *ngIf=\"!selectedOrder.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                  </ion-thumbnail>\r\n                </div> -->\r\n                <div>\r\n                  <p><span class=\"textCap\">Booking Id : </span>{{selectedOrder.bookingId}}</p>\r\n                  <br>\r\n                  <p *ngIf=\"selectedOrder.user\">\r\n                    <span class=\"textCap\">User Name : </span>\r\n                    {{selectedOrder.user.name}}\r\n                  </p>\r\n                  <p *ngIf=\"vendorName\">\r\n                    <br>\r\n                    <span class=\"textCap\">Vendor : </span> {{vendorName}}\r\n                  </p>\r\n                </div>\r\n                <div class=\"hr\"></div>\r\n              </div>\r\n\r\n              <!-- Booking Schedule -->\r\n              <div class=\"\" *ngIf=\"selectedOrder.schedule\">\r\n                <div class=\"d-flex\">\r\n                  <h5>Booking Schedule</h5>\r\n                  <ion-button *ngIf=\"selectedOrder.status== 'pending' || selectedOrder.status== 'accepted' \"\r\n                    (click)=\"changeBookingSlotModal()\" size=\"small\" fill=\"outline\">\r\n                    Change schedule\r\n                  </ion-button>\r\n                </div>\r\n                <p class=\"f-w-b\">\r\n                  <span class=\"textCap\">Booked Date : </span>\r\n                  {{selectedOrder.schedule.date}} at {{convert24to12(selectedOrder.schedule.slot.start)}} to\r\n                  {{convert24to12(selectedOrder.schedule.slot.end)}}\r\n                </p>\r\n                <br>\r\n                <p class=\"f-w-b\">\r\n                  <span class=\"textCap\">Booked At : </span>\r\n                  {{getDateTimeFormat(selectedOrder.createdAt.toDate())}}\r\n                </p>\r\n\r\n                <div class=\"hr\"></div>\r\n              </div>\r\n\r\n              <!-- Address -->\r\n              <ng-container *ngIf=\"selectedOrder?.user.address\">\r\n                <div class=\"content\">\r\n                  <h5>Address</h5>\r\n                  <p>{{selectedOrder.user.address.name}},</p>\r\n                  <p>{{selectedOrder.user.address.address}},</p>\r\n                  <p>{{selectedOrder.user.address.phoneNo}}</p>\r\n                </div>\r\n                <div class=\"hr\"></div>\r\n              </ng-container>\r\n\r\n              <!-- Payment -->\r\n              <ng-container *ngIf=\"selectedOrder?.payment?.mode\">\r\n                <div class=\"content\">\r\n                  <ng-container *ngIf=\"!isPartialPayment(); else paidPartially;\">\r\n                    <h5>Payment</h5>\r\n                    <p>\r\n                      <span class=\"textCap\">mode : </span>\r\n                      <span class=\"ion-text-capitalise\">{{selectedOrder.payment.mode}}</span>\r\n                    </p>\r\n                    <p *ngIf=\"selectedOrder.payment?.status\">\r\n                      <br>\r\n                      <span class=\"textCap\">status : </span>\r\n                      <span class=\"ion-text-capitalise\">{{selectedOrder.payment.status}}</span>\r\n                    </p>\r\n                    <!-- Update Payment status(Cash) -->\r\n                    <ng-container *ngIf=\"selectedOrder.payment.mode == 'cash' && !selectedOrder.payment.completed\">\r\n                      <div class=\"d-flex\">\r\n                        <p class=\"textCap\">update status if cash received</p>\r\n                        <ion-button (click)=\"askUpdatePaymentStatus()\" color=\"dark\" fill=\"outline\" size=\"small\">\r\n                          update\r\n                        </ion-button>\r\n                      </div>\r\n                    </ng-container>\r\n                    <div class=\"payment-ss\" *ngIf=\"selectedOrder.payment.mode === 'upiManual'\">\r\n                      <br>\r\n                      <p>Uploaded Payment Screen Shot</p>\r\n                      <img [src]=\"selectedOrder.payment.screenshot\" (click)=\"imgZoom(selectedOrder.payment.screenshot)\">\r\n                    </div>\r\n\r\n                    <div class=\"payment-ss\" *ngIf=\"selectedOrder.payment.mode === 'custom'\">\r\n                      <br>\r\n                      <div *ngIf=\"selectedOrder.payment.textDetails\">\r\n                        <p><span class=\"textCap\">Details :</span> {{selectedOrder.payment.textDetails}}</p>\r\n                      </div>\r\n                      <div *ngIf=\"selectedOrder.payment.screenshot\">\r\n                        <br>\r\n                        <p>Uploaded Payment Screen Shot</p>\r\n                        <img [src]=\"selectedOrder.payment.screenshot\"\r\n                          (click)=\"imgZoom(selectedOrder.payment.screenshot)\">\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                  <ng-template #paidPartially>\r\n                    <h5>Payment (partial)</h5>\r\n\r\n                    <!-- online mode -->\r\n                    <p>\r\n                      <span class=\"textCap\">Online mode: </span>\r\n                      <span class=\"ion-text-capitalize\">{{selectedOrder.payment.mode}}</span>\r\n                    </p>\r\n                    <p>\r\n                      <span class=\"textCap\">Amount: </span>\r\n                      <span>{{selectedOrder.payment.partial.online | currency: currencyCode:true:'.2-2'}}</span>\r\n                    </p>\r\n                    <p *ngIf=\"selectedOrder.payment?.status\">\r\n                      <span class=\"textCap\">status: </span>\r\n                      <span class=\"ion-text-capitalize\">{{selectedOrder.payment.status}}</span>\r\n                    </p>\r\n\r\n                    <br>\r\n                    <!-- offline Mode -->\r\n                    <p>\r\n                      <span class=\"textCap\">Offline mode: </span>\r\n                      <span class=\"ion-text-capitalize\">Cash</span>\r\n                    </p>\r\n                    <p>\r\n                      <span class=\"textCap\">Amount: </span>\r\n                      <span>{{selectedOrder.payment.partial.cod | currency: currencyCode:true:'.2-2'}}</span>\r\n                    </p>\r\n                    <p>\r\n                      <span class=\"textCap\">Status: </span>\r\n                      <span class=\"ion-text-capitalize\">{{selectedOrder.payment.partial.status}}</span>\r\n                    </p>\r\n                    <!-- Update Payment status(Cash) -->\r\n                    <ng-container *ngIf=\"selectedOrder.payment.partial.status !== 'completed'\">\r\n                      <div class=\"d-flex\">\r\n                        <p class=\"textCap\">update status if cash received</p>\r\n                        <ion-button (click)=\"askUpdatePaymentStatus()\" color=\"dark\" fill=\"outline\" size=\"small\">\r\n                          update\r\n                        </ion-button>\r\n                      </div>\r\n                    </ng-container>\r\n                  </ng-template>\r\n                  <div class=\"hr\"></div>\r\n                </div>\r\n              </ng-container>\r\n\r\n              <!-- Invoice -->\r\n              <ng-container *ngIf=\"selectedOrder?.invoice?.url\">\r\n                <div class=\"content\">\r\n                  <h5>Invoice</h5>\r\n                  <ion-item button (click)=\"showInvoice(selectedOrder.invoice.url)\" lines=\"none\"\r\n                    class=\"order-invoice ion-no-padding\">\r\n                    <ion-label>\r\n                      <h5>View Invoice</h5>\r\n                    </ion-label>\r\n                  </ion-item>\r\n                </div>\r\n                <div class=\"hr\"></div>\r\n              </ng-container>\r\n\r\n              <!-- Custom Input -->\r\n              <ng-container *ngIf=\"selectedOrder?.additionalInfo?.customInput?.value\">\r\n                <div class=\"content\">\r\n                  <h5>{{selectedOrder.additionalInfo.customInput.label}}</h5>\r\n                  <p>{{selectedOrder.additionalInfo.customInput.value}}</p>\r\n                </div>\r\n                <div class=\"hr\"></div>\r\n              </ng-container>\r\n\r\n              <!-- Price Summary -->\r\n              <div class=\"bookingInfo\">\r\n                <h5>Booking Info</h5>\r\n\r\n                <div class=\"d-flex\">\r\n                  <span class=\"textCap\">{{selectedOrder.item.name}}</span>\r\n                  <p>{{getBookingItemPrice() | currency: currencyCode:true:'.2-2'}}</p>\r\n                </div>\r\n\r\n                <!-- Add Ons -->\r\n                <div class=\"options\" *ngIf=\"selectedOrder.item.addOns.totalPrice\">\r\n                  <ng-container *ngFor=\"let section of selectedOrder.item.addOns.selectedOptions\">\r\n                    <ng-container *ngFor=\"let option of section.options\">\r\n                      <div class=\"d-flex\">\r\n                        <span class=\"textCap\">{{option.name}}</span>\r\n                        <p>{{option.price | currency: currencyCode:true:'.2-2'}}</p>\r\n                      </div>\r\n                    </ng-container>\r\n                  </ng-container>\r\n                </div>\r\n\r\n                <!-- Price Summary -->\r\n                <div class=\"priceSummary\">\r\n                  <div class=\"d-flex\" *ngIf=\"selectedOrder.payment.extraChargeOnPayment?.charge as extraCharge;\">\r\n                    <span class=\"textCap\">\r\n                      {{selectedOrder.payment.extraChargeOnPayment.name || 'Payment Gateway Charge'}}\r\n                    </span>\r\n                    <p>{{extraCharge | currency: currencyCode:true:'.2-2'}}</p>\r\n                  </div>\r\n\r\n                  <div class=\"d-flex\" *ngIf=\"getTotalAmount().totalGst as gst\">\r\n                    <div class=\"\">\r\n                      <span class=\"textCap\">{{taxType}}</span>\r\n                      <small *ngIf=\"!selectedOrder.item.gst.isExclusive\">\r\n                        (included)\r\n                      </small>\r\n                    </div>\r\n                    <p>{{gst | currency: currencyCode:true:'.2-2'}}</p>\r\n                  </div>\r\n\r\n                  <div class=\"d-flex\">\r\n                    <span class=\"textCap\">Total Service Price</span>\r\n                    <p>{{getTotalAmount().totalAmount | currency: currencyCode:true:'.2-2'}}</p>\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </ng-container>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/booking-orders/booking-orders.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/booking-orders/booking-orders.module.ts ***!
  \***************************************************************/
/*! exports provided: BookingOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingOrdersPageModule", function() { return BookingOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _booking_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./booking-orders.page */ "./src/app/admin/booking-orders/booking-orders.page.ts");







const routes = [
    {
        path: '',
        component: _booking_orders_page__WEBPACK_IMPORTED_MODULE_6__["BookingOrdersPage"]
    }
];
let BookingOrdersPageModule = class BookingOrdersPageModule {
};
BookingOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_booking_orders_page__WEBPACK_IMPORTED_MODULE_6__["BookingOrdersPage"]]
    })
], BookingOrdersPageModule);



/***/ }),

/***/ "./src/app/admin/booking-orders/booking-orders.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/booking-orders/booking-orders.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.orderList {\n  padding-right: 8px;\n  border-radius: 8px;\n  border: 1px solid #ccc;\n  margin-bottom: 8px;\n  margin-right: 4px;\n  cursor: pointer;\n}\n\n.orderList:hover {\n  box-shadow: 0 2px 5px #ccc;\n}\n\n.orderList strong {\n  font-size: 16px;\n}\n\n.rejectText {\n  color: red;\n}\n\n.justifyFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n.searchBox {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.searchInput {\n  height: 30px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n.noAppointment {\n  text-align: center;\n  width: 100%;\n  font-size: large;\n  font-weight: bold;\n}\n\n.bookingCard {\n  padding: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin-bottom: 8px;\n}\n\n.textLeft {\n  text-align: left;\n}\n\n.hr {\n  border-top: 1px solid #ccc;\n  margin-top: 8px;\n}\n\n.textCap {\n  text-transform: capitalize;\n  font-weight: 500;\n}\n\n.priceSummary {\n  padding-top: 12px;\n  border-top: 1px solid #eee;\n}\n\n.priceSummary span,\n.priceSummary p {\n  font-size: 16px;\n}\n\n.d-flex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 4px;\n}\n\n.bookingInfo {\n  padding: 4px;\n  margin-top: 8px;\n  border-radius: 5px;\n}\n\n.payment-ss img {\n  width: 200px;\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 86vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYm9va2luZy1vcmRlcnMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxib29raW5nLW9yZGVyc1xcYm9va2luZy1vcmRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9ib29raW5nLW9yZGVycy9ib29raW5nLW9yZGVycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FEQUU7RUFDRSwwQkFBQTtBQ0VKOztBREFFO0VBQ0UsZUFBQTtBQ0VKOztBREVBO0VBQ0UsVUFBQTtBQ0NGOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EscUJBQUE7VUFBQSx5QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURDQTtFQUNFLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUNFRjs7QURBQTtFQUNFLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDR0Y7O0FEREE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDSUY7O0FERkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FDS0Y7O0FEQ0E7RUFDRSxnQkFBQTtBQ0VGOztBRENBO0VBRUUsMEJBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSwwQkFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FEQUU7O0VBRUUsZUFBQTtBQ0VKOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREdFO0VBQ0UsWUFBQTtFQUNBLHVCQUFBO0VBQUEsZUFBQTtBQ0FKOztBRElBO0VBQ0U7SUFDRSxZQUFBO0VDREY7O0VER0E7SUFDRSxZQUFBO0VDQUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2Jvb2tpbmctb3JkZXJzL2Jvb2tpbmctb3JkZXJzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4NnZoO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi5vcmRlckxpc3Qge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICY6aG92ZXIge1xyXG4gICAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgfVxyXG4gIHN0cm9uZyB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ucmVqZWN0VGV4dCB7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuLmp1c3RpZnlGbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG4uc2VhcmNoQm94IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcbi5zZWFyY2hJbnB1dCB7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbi5ub0FwcG9pbnRtZW50IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZm9udC1zaXplOiBsYXJnZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4uYm9va2luZ0NhcmQge1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gIC8vICY6aG92ZXIge1xyXG4gIC8vICAgLy8gYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgLy8gfVxyXG59XHJcblxyXG4udGV4dExlZnQge1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgLy8gbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuLmhyIHtcclxuICAvLyBwYWRkaW5nOiAycHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG59XHJcblxyXG4udGV4dENhcCB7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLnByaWNlU3VtbWFyeSB7XHJcbiAgcGFkZGluZy10b3A6IDEycHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XHJcbiAgc3BhbixcclxuICBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9XHJcbn1cclxuXHJcbi5kLWZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG59XHJcblxyXG4uYm9va2luZ0luZm8ge1xyXG4gIHBhZGRpbmc6IDRweDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4ucGF5bWVudC1zcyB7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGN1cnNvcjogem9vbS1pbjtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbiAgI3Njcm9sbDIge1xyXG4gICAgaGVpZ2h0OiA4NnZoO1xyXG4gIH1cclxufVxyXG4iLCIubWFpbi1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5vcmRlckxpc3Qge1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm9yZGVyTGlzdDpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xufVxuLm9yZGVyTGlzdCBzdHJvbmcge1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5yZWplY3RUZXh0IHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLmp1c3RpZnlGbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG4uc2VhcmNoQm94IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLnNlYXJjaElucHV0IHtcbiAgaGVpZ2h0OiAzMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi5ub0FwcG9pbnRtZW50IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5ib29raW5nQ2FyZCB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4udGV4dExlZnQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uaHIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4udGV4dENhcCB7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ucHJpY2VTdW1tYXJ5IHtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xufVxuLnByaWNlU3VtbWFyeSBzcGFuLFxuLnByaWNlU3VtbWFyeSBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uZC1mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5ib29raW5nSW5mbyB7XG4gIHBhZGRpbmc6IDRweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wYXltZW50LXNzIGltZyB7XG4gIHdpZHRoOiAyMDBweDtcbiAgY3Vyc29yOiB6b29tLWluO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cblxuICAjc2Nyb2xsMiB7XG4gICAgaGVpZ2h0OiA4NnZoO1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/booking-orders/booking-orders.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/booking-orders/booking-orders.page.ts ***!
  \*************************************************************/
/*! exports provided: BookingOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingOrdersPage", function() { return BookingOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/booking/booking.service */ "./src/app/services/booking/booking.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _change_booking_slot_change_booking_slot_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./change-booking-slot/change-booking-slot.page */ "./src/app/admin/booking-orders/change-booking-slot/change-booking-slot.page.ts");










let BookingOrdersPage = class BookingOrdersPage {
    constructor(storage, sharedService, bookingService, alertController, modalController, configService) {
        this.storage = storage;
        this.sharedService = sharedService;
        this.bookingService = bookingService;
        this.alertController = alertController;
        this.modalController = modalController;
        this.configService = configService;
        this.bookingOrders = [];
        this.activeTile = 0;
        this.searchOrder = '';
        this.vendorName = '';
    }
    ngOnInit() {
        this.taxType = this.configService.environment.taxType;
        this.currencyCode = this.configService.environment.currencyCode;
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.userId = yield this.storage.get('uid');
            this.userRole = yield this.storage.get('userRole');
            yield this.getBookingOrders();
            yield this.sharedService.loading.dismiss();
        });
    }
    getBookingOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let data = yield this.bookingService.getAllBookingOrders();
            // console.log('Data:', data);
            if (data && data.length > 0) {
                this.bookingOrders = data;
                yield this.viewBooking(0);
            }
        });
    }
    viewBooking(index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.activeTile = index;
            this.selectedOrder = this.bookingOrders[index];
            // console.log(this.selectedOrder);
            if (this.userRole !== "vendor") {
                yield this.getVendorName();
            }
        });
    }
    getVendorName() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.selectedOrder.vendor && this.selectedOrder.vendor.id) {
                let vendorData = yield this.bookingService.getVendorName(this.selectedOrder.vendor.id);
                this.vendorName = vendorData ? vendorData['name'] : '';
            }
            else {
                this.vendorName = '';
            }
        });
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_2__(date).format('MMM D, YYYY hh:mm a');
    }
    convert24to12(time) {
        return moment__WEBPACK_IMPORTED_MODULE_2__(time, ['HH:mm']).format('hh:mm A');
    }
    searchBookingById() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            if (!isNaN(parseInt(this.searchOrder))) {
                let data = yield this.bookingService.returnBookingDetailsWithOrderId(parseInt(this.searchOrder));
                // console.log('res:', data);
                this.sharedService.loading.dismiss();
                if (data && data.length > 0) {
                    this.bookingOrders = data;
                    this.viewBooking(0);
                }
                else {
                    this.sharedService.presentAlert('No such booking found !');
                }
            }
            else {
                this.sharedService.loading.dismiss();
                this.sharedService.presentAlert('Please enter a valid number');
                return;
            }
        });
    }
    resetSearch() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.searchOrder = '';
            yield this.ionViewDidEnter();
        });
    }
    askUpdateStatus(status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: "Are you sure ?",
                buttons: [
                    {
                        text: "No",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: "Yes",
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            this.changeBookingStatus(status);
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    changeBookingStatus(status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.selectedOrder.status = status;
            let response = yield this.bookingService.updateBookingStatus(this.selectedOrder.id, this.selectedOrder.status);
            this.sharedService.loading.dismiss();
            if (response) {
                yield this.sharedService.presentAlert(`Booking has been ${status}`);
            }
            else {
                yield this.sharedService.presentAlert('Something went wrong !');
            }
        });
    }
    getTotalAmount() {
        return {
            totalAmount: this.selectedOrder.item.price + (this.selectedOrder.payment.extraChargeOnPayment && this.selectedOrder.payment.extraChargeOnPayment.charge ? this.selectedOrder.payment.extraChargeOnPayment.charge : 0),
            totalGst: this.selectedOrder.item.totalGst + (this.selectedOrder.payment.extraChargeOnPayment && this.selectedOrder.payment.extraChargeOnPayment.gst ? this.selectedOrder.payment.extraChargeOnPayment.gst : 0),
        };
    }
    showInvoice(url) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (url) {
                window.open(url, '_blank');
            }
            else {
                this.sharedService.presentAlert('Something went wrong, Please try again !');
            }
        });
    }
    imgZoom(img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }
    getBookingItemPrice() {
        return this.selectedOrder.item.price - this.selectedOrder.item.addOns.totalPrice - (this.selectedOrder.item.gst.isExclusive ? this.selectedOrder.item.gst.total : 0);
    }
    changeBookingSlotModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _change_booking_slot_change_booking_slot_page__WEBPACK_IMPORTED_MODULE_9__["ChangeBookingSlotPage"],
                cssClass: 'custom-modal',
                componentProps: {
                    bookingDocId: this.selectedOrder.id,
                    productId: this.selectedOrder.item.id,
                }
            });
            modal.onDidDismiss().then(res => {
                if (res && res.data && res.data.schedule) {
                    // console.log('modal res:', res.data);
                    this.selectedOrder.schedule = res.data.schedule;
                }
            });
            yield modal.present();
        });
    }
    askUpdatePaymentStatus() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const openPrompt = yield this.alertController.create({
                subHeader: "Are you sure you want to update payment status ?",
                buttons: [
                    {
                        text: "No",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: "Yes",
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            yield this.changePaymentStatus();
                        })
                    }
                ]
            });
            yield openPrompt.present();
        });
    }
    changePaymentStatus() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let paymentStatus;
            if (this.isPartialPayment()) {
                this.selectedOrder.payment.partial.status = 'completed';
                paymentStatus = {
                    'payment.partial.status': 'completed',
                };
            }
            else {
                this.selectedOrder.payment.completed = true;
                this.selectedOrder.payment.status = 'completed';
                paymentStatus = {
                    'payment.completed': true,
                    'payment.status': 'completed',
                };
            }
            let response = yield this.bookingService.updatePaymentStatus(this.selectedOrder.id, paymentStatus);
            yield this.sharedService.loading.dismiss();
            if (response) {
                yield this.sharedService.presentAlert('Payment status updated successfully.');
            }
            else {
                yield this.sharedService.presentAlert('Something went wrong !');
            }
        });
    }
    isPartialPayment() {
        return this.selectedOrder.payment.partial && this.selectedOrder.payment.partial.cod;
    }
};
BookingOrdersPage.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
    { type: src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_5__["BookingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"] }
];
BookingOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-booking-orders',
        template: __webpack_require__(/*! raw-loader!./booking-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/booking-orders/booking-orders.page.html"),
        styles: [__webpack_require__(/*! ./booking-orders.page.scss */ "./src/app/admin/booking-orders/booking-orders.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
        src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_5__["BookingService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"]])
], BookingOrdersPage);



/***/ })

}]);
//# sourceMappingURL=admin-booking-orders-booking-orders-module-es2015.js.map