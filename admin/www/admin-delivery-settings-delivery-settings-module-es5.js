(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-delivery-settings-delivery-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/delivery-settings/delivery-settings.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/delivery-settings/delivery-settings.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Delivery Setting</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-null\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Settings</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>States / Pincodes</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n\r\n    <!-- 1st Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\"\r\n          style=\"width: 100%;\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2\r\n                id=\"scroll1\"\r\n                style=\"margin-top: 8px;\">\r\n                <ion-button expand=\"block\"\r\n                  (click)=\"createNewDeliveryType()\"\r\n                  style=\"margin: 8px 0 0 8px;\">\r\n                  Add New +\r\n                </ion-button>\r\n                <div class=\"statusList\">\r\n                  <div *ngIf=\"newDeliveryType.length\">\r\n                    <p [id]=\"'field' + idx\"\r\n                      style=\"z-index: 1000\"\r\n                      *ngFor='let item of newDeliveryType; let idx=index'\r\n                      (click)=\"newSelection(idx)\">\r\n                      {{item.id}}\r\n                      <button *ngIf=\"idx != 0\"\r\n                        style=\"float: right; background-color: transparent; z-index: 1001;\">\r\n                        <i class=\"flaticon-null-17\"\r\n                          style=\"margin-right: 5px;\"\r\n                          (click)=\"removeProfile(item.id, idx)\"></i>\r\n                      </button>\r\n                    </p>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=2\r\n                id=\"scroll1\"\r\n                style=\"margin-top: 8px; border-left: 1px solid lightgray;\">\r\n                <div class=\"statusList\">\r\n                  <p [id]=\"i\"\r\n                    *ngFor='let item of sidemenu; let i=index'\r\n                    (click)='changeComponent(i)'>{{item}}</p>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=8\r\n                style=\"margin-top: 8px; border-left: 1px solid lightgray;\"\r\n                id=\"scroll2\">\r\n                <ion-col>\r\n                  <ion-button (click)=\"saveAllDeliverySetting()\"\r\n                    color=\"success\">\r\n                    <i class=\"flaticon-null-20 margin-icon\"></i>&nbsp;\r\n                    Save\r\n                  </ion-button>\r\n                </ion-col>\r\n                <br>\r\n                <ion-col>\r\n                  <ion-grid [ngSwitch]=\"selectedId\">\r\n                    <ion-row>\r\n                      <ion-col size=\"6\"\r\n                        *ngSwitchCase=\"0\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Default delivery amount ({{currencyCode}})\r\n                          </ion-label>\r\n                          <ion-input type=\"tel\"\r\n                            class=\"form-input\"\r\n                            [(ngModel)]=\"defaultDeliveryAmt\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\"\r\n                        *ngSwitchCase=\"1\">\r\n                        <ion-col size=\"6\"\r\n                          *ngSwitchCase=\"1\">\r\n                          <div style=\"display: flex;align-items: center\">\r\n                            <p>Allow free delivery for order</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"allowFreeDelivery\"\r\n                                  (click)=\"freeDeliveryToggle()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                          <br><br>\r\n                          <div class=\"input-wrap\"\r\n                            *ngIf=\"allowFreeDelivery == true\">\r\n                            <ion-label>Free delivery above amount\r\n                              ({{currencyCode}})\r\n                            </ion-label>\r\n                            <ion-input type=\"tel\"\r\n                              class=\"form-input\"\r\n                              [(ngModel)]=\"freeDeliveryAmt\"></ion-input>\r\n                          </div>\r\n                        </ion-col>\r\n                      </ion-col>\r\n                      <div *ngSwitchCase=\"2\">\r\n                        <ion-col size=\"12\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <!-- <ion-label>Allow Store pickup</ion-label>&nbsp; -->\r\n                            <!-- <ion-toggle color=\"primary\"\r\n                              (ionChange)=\"storePickupToggle()\"\r\n                              [checked]=\"isStorePickup\">\r\n                            </ion-toggle> -->\r\n                            <p>Allow store pickup</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"isStorePickup\"\r\n                                  (click)=\"storePickupToggle()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"isStorePickup\">\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Store pickup charges ({{currencyCode}})\r\n                            </ion-label>\r\n                            <ion-input type=\"tel\"\r\n                              class=\"form-input\"\r\n                              [(ngModel)]=\"storePickupCharges\"></ion-input>\r\n                          </div>\r\n                        </ion-col>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"3\">\r\n                        <ion-col size=\"12\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <div>Allow Delivery based on Km</div>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\"\r\n                                  (click)=\"deliveryBasedToggle()\"\r\n                                  [checked]=\"isKmBasedDelivery\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"isKmBasedDelivery\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <div>Delivery by Km Slabs</div>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\"\r\n                                  (click)=\"activeKmSlab()\"\r\n                                  [checked]=\"kmSlabs.active\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                          <br>\r\n                          <div *ngIf='!kmSlabs.active'>\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Delivery Charges per km\r\n                                ({{currencyCode}})\r\n                              </ion-label>\r\n                              <ion-input type=\"tel\"\r\n                                class=\"form-input\"\r\n                                [(ngModel)]=\"chargesPerKm\"></ion-input>\r\n                            </div>\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Maximum delivery charges\r\n                                ({{currencyCode}})\r\n                              </ion-label>\r\n                              <ion-input type=\"tel\"\r\n                                class=\"form-input\"\r\n                                [(ngModel)]=\"maxDeliveryOfKm\"></ion-input>\r\n                            </div>\r\n                          </div>\r\n                          <div *ngIf='kmSlabs.active'>\r\n                            <div style=\"display: flex;align-items: center;\">\r\n                              <ion-button (click)='enterSlabData()'>\r\n                                <p\r\n                                  *ngIf=\"kmSlabs.slabs && kmSlabs.slabs.length == 0\">\r\n                                  Create Slab</p>\r\n                                <p\r\n                                  *ngIf=\"kmSlabs.slabs && kmSlabs.slabs.length > 0\">\r\n                                  Add Slab</p>\r\n                              </ion-button>&nbsp;&nbsp;\r\n                              <ion-button (click)=\"removeSlabs()\">\r\n                                Remove All Slabs\r\n                              </ion-button>\r\n                            </div>\r\n                            <br>\r\n                            <ion-grid\r\n                              *ngIf=\"kmSlabs.slabs && kmSlabs.slabs.length > 0\"\r\n                              class=\"ion-no-padding data-table ion-text-center\"\r\n                              style=\"margin-top: 12px;width: 400px;\">\r\n                              <ion-row>\r\n                                <ion-col>Range</ion-col>\r\n                                <ion-col>Cost</ion-col>\r\n                                <ion-col>Free Delivery Amount</ion-col>\r\n                              </ion-row>\r\n                              <ion-row\r\n                                *ngFor=\"let slab of kmSlabs.slabs; let i=index;\"\r\n                                style=\"border-top: 1px solid lightgray;\">\r\n                                <ion-col>\r\n                                  <p>{{slab.range[0]}} - {{slab.range[1]}}</p>\r\n                                </ion-col>\r\n                                <ion-col>\r\n                                  <p>{{slab.cost}}</p>\r\n                                </ion-col>\r\n                                <ion-col>\r\n                                  <p>{{slab.freeDeliveryAmount}}</p>\r\n                                </ion-col>\r\n                              </ion-row>\r\n                            </ion-grid>\r\n                          </div>\r\n                        </ion-col>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"4\">\r\n                        <ion-col size=\"6\"\r\n                          *ngIf=\"isDeliveryBasedOnWeight\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <div>Delivery Based On Weight</div>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\"\r\n                                  (click)=\"deliveryWeightBasedToggle()\"\r\n                                  [checked]=\"deliveryByWeight.active\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <div *ngIf=\"isDeliveryBasedOnWeight\">\r\n                          <div *ngIf=\"deliveryByWeight.active\">\r\n                            <div style=\"display: flex;align-items: center;\">\r\n                              <div>Delivery by Weight Slabs</div>&nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input type=\"checkbox\"\r\n                                    (click)=\"activeWeightSlab()\"\r\n                                    [checked]=\"weightSlabs.active\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </div>\r\n                            <br>\r\n                            <div *ngIf='!weightSlabs.active'>\r\n                              <div class=\"input-wrap\">\r\n                                <ion-label>Charges Per 100Gm ({{currencyCode}})\r\n                                </ion-label>\r\n                                <ion-input type=\"number\"\r\n                                  class=\"input-border\"\r\n                                  [(ngModel)]=\"deliveryByWeight.cost\">\r\n                                </ion-input>\r\n                              </div>\r\n                              <br>\r\n                              <div class=\"ds-alignment\">\r\n                                <p class=\"delivery-wt-txt\">\r\n                                  Delivery weight upto\r\n                                  &nbsp;<ion-input type=\"number\"\r\n                                    class=\"input-border\"\r\n                                    [(ngModel)]=\"deliveryByWeight.baseWeight\">\r\n                                  </ion-input>\r\n                                  &nbsp;Grams is\r\n                                  {{currencyCode}}\r\n                                  &nbsp;<ion-input type=\"number\"\r\n                                    class=\"input-border\"\r\n                                    [(ngModel)]=\"deliveryByWeight.baseCost\">\r\n                                  </ion-input>\r\n                                </p>\r\n                              </div>\r\n                            </div>\r\n                            <div *ngIf='weightSlabs.active'>\r\n                              <div style=\"display: flex;align-items: center;\">\r\n                                <ion-button (click)='enterWeightSlabData()'>\r\n                                  <p\r\n                                    *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length == 0\">\r\n                                    Create Slab</p>\r\n                                  <p\r\n                                    *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length > 0\">\r\n                                    Add Slab</p>\r\n                                </ion-button>&nbsp;&nbsp;\r\n                                <ion-button (click)=\"removeWeightSlabs()\">\r\n                                  Remove All Slabs\r\n                                </ion-button>\r\n                              </div>\r\n                              <br>\r\n                              <ion-grid\r\n                                *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length > 0\"\r\n                                class=\"ion-no-padding data-table ion-text-center\"\r\n                                style=\"margin-top: 12px;width: 400px;\">\r\n                                <ion-row>\r\n                                  <ion-col>Range</ion-col>\r\n                                  <ion-col>Cost</ion-col>\r\n                                </ion-row>\r\n                                <ion-row\r\n                                  *ngFor=\"let slab of weightSlabs.slabs; let i=index;\"\r\n                                  style=\"border-top: 1px solid lightgray;\">\r\n                                  <ion-col>\r\n                                    <p>{{slab.range[0]}} - {{slab.range[1]}}</p>\r\n                                  </ion-col>\r\n                                  <ion-col>\r\n                                    <p>{{slab.cost}}</p>\r\n                                  </ion-col>\r\n                                </ion-row>\r\n                              </ion-grid>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"5\">\r\n                        <ion-col size=\"12\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <!-- <ion-label>Allow Instant Delivery</ion-label>&nbsp;\r\n                            <ion-toggle color=\"primary\"\r\n                              [(ngModel)]=\"instantDelivery.isActive\"></ion-toggle> -->\r\n                            <p>Allow instant delivery</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"instantDelivery.isActive\"\r\n                                  (click)=\"allowInstantDelivery()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"instantDelivery.isActive\">\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Enter Instant Delivery Time (In Hours)\r\n                            </ion-label>\r\n                            <ion-input type=\"number\"\r\n                              class=\"form-input\"\r\n                              [(ngModel)]=\"instantDelivery.time\"></ion-input>\r\n                          </div>\r\n                        </ion-col>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"6\">\r\n                        <ion-col size=\"12\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <!-- <ion-label>Allow Delivery By Store</ion-label>&nbsp;\r\n                            <ion-toggle color=\"primary\"\r\n                              [(ngModel)]=\"isStoreDelivery.isActive\"></ion-toggle> -->\r\n                            <p>Allow Delivery by Store</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"isStoreDelivery.isActive\"\r\n                                  (click)=\"allowDeliverybyStore()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"isStoreDelivery.isActive\">\r\n                          <div class=\"input-wrap\">\r\n                            <ion-label>Enter Store Estimated Delivery Time\r\n                            </ion-label>\r\n                            <ion-input type=\"text\"\r\n                              class=\"form-input\"\r\n                              [(ngModel)]=\"isStoreDelivery.estimatedTime\"\r\n                              (click)=\"enterEstimatedTime(0, '', 'isStoreDelivery')\"\r\n                              readonly></ion-input>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"isStoreDelivery.isActive\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <!-- <ion-label>Allow Delivery schedule</ion-label>&nbsp;\r\n                            <ion-toggle color=\"primary\"\r\n                              (ionChange)=\"deliveryScheduleToggle()\"\r\n                              [checked]=\"isDeliverySchedule\">\r\n                            </ion-toggle> -->\r\n                            <p>Allow Delivery Schedule</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"isDeliverySchedule\"\r\n                                  (click)=\"deliveryScheduleToggle()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\"\r\n                          *ngIf=\"isDeliverySchedule && isStoreDelivery.isActive\">\r\n                          <div style=\"display: flex;align-items: center;\">\r\n                            <!-- <ion-label>Is Delivery schedule mandatory</ion-label>\r\n                            &nbsp;\r\n                            <ion-toggle color=\"primary\"\r\n                              (ionChange)=\"deliveryScheduleMandatoryToggle()\"\r\n                              [checked]=\"isDeliveryScheduleMandatory\"></ion-toggle> -->\r\n                            <p>Is delivery schedule mandatory</p>&nbsp;&nbsp;\r\n                            <div class=\"toggle-btn\">\r\n                              <label class=\"switch\">\r\n                                <input color=\"primary\"\r\n                                  type=\"checkbox\"\r\n                                  [checked]=\"isDeliveryScheduleMandatory\"\r\n                                  (click)=\"deliveryScheduleMandatoryToggle()\">\r\n                                <span class=\"slider round\"></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ng-container\r\n                          *ngIf=\"isDeliverySchedule && isStoreDelivery.isActive\">\r\n                          <ion-col size=\"12\">\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Max number of days for Delivery\r\n                              </ion-label>\r\n                              <ion-input type=\"number\"\r\n                                class=\"form-input\"\r\n                                [(ngModel)]=\"maxDaysOfDelivery\"></ion-input>\r\n                            </div>\r\n                          </ion-col>\r\n\r\n                          <ion-col size=\"12\">\r\n                            <div style=\"display: flex;align-items: center;\">\r\n                              <!-- <ion-label>Allow same day delivery</ion-label>&nbsp;\r\n                              <ion-toggle color=\"primary\"\r\n                                (ionChange)=\"allowSameDayDeliveryToggle()\"\r\n                                [checked]=\"allowSameDayDelivery\"></ion-toggle> -->\r\n                              <p>Allow same day delivery</p>&nbsp;&nbsp;\r\n                              <div class=\"toggle-btn\">\r\n                                <label class=\"switch\">\r\n                                  <input color=\"primary\"\r\n                                    type=\"checkbox\"\r\n                                    [checked]=\"allowSameDayDelivery\"\r\n                                    (click)=\"allowSameDayDeliveryToggle()\">\r\n                                  <span class=\"slider round\"></span>\r\n                                </label>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\"\r\n                            *ngIf=\"allowSameDayDelivery\">\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Minimum hours required to prepare order\r\n                              </ion-label>\r\n                              <ion-input type=\"number\"\r\n                                class=\"form-input\"\r\n                                [(ngModel)]=\"minHrs\"></ion-input>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\"\r\n                            *ngIf=\"allowSameDayDelivery\">\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Last delivery time</ion-label>\r\n                              <ion-datetime class=\"form-input time-picker\"\r\n                                displayFormat=\"hh:mm A\"\r\n                                pickerFormat=\"hh:mm A\"\r\n                                [(ngModel)]=\"lastDeliveryTime\"></ion-datetime>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\">\r\n                            <div class=\"input-wrap\">\r\n                              <ion-label>Days</ion-label>\r\n                              <div class=\"ds-days-container\">\r\n                                <div *ngFor=\"let x of days;let i = index;\"\r\n                                  [ngClass]=\"{'ds-days-inactive': !x.active, 'ds-days-active': x.active}\"\r\n                                  (click)=\"daySelectToggle(i)\">\r\n                                  {{x.day}}\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\">\r\n                            <ion-label>Time:</ion-label>\r\n                          </ion-col>\r\n                          <ion-col size=\"5\">\r\n                            <ion-datetime class=\"form-input time-picker\"\r\n                              displayFormat=\"hh:mm A\"\r\n                              pickerFormat=\"hh:mm A\"\r\n                              [(ngModel)]=\"time.start\"\r\n                              placeholder=\"Select Start Time\"></ion-datetime>\r\n                          </ion-col>\r\n                          <ion-col size=\"5\">\r\n                            <ion-datetime class=\"form-input time-picker\"\r\n                              displayFormat=\"hh:mm A\"\r\n                              pickerFormat=\"hh:mm A\"\r\n                              [(ngModel)]=\"time.end\"\r\n                              placeholder=\"Select End Time\"></ion-datetime>\r\n                          </ion-col>\r\n                          <ion-col size=\"2\">\r\n                            <ion-button (click)=\"addTimeSchedule()\"\r\n                              fill=\"outline\"\r\n                              shape=\"round\"\r\n                              class=\"btn-sml m-t-16\"\r\n                              [disabled]=\"disableAddTimeSchedule()\">\r\n                              Add\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\">\r\n                            <div class=\"timer-wraper\">\r\n                              <ion-chip outline\r\n                                color=\"dark\"\r\n                                *ngFor=\"let time of timeSchedules; let i = index;\">\r\n                                <ion-label>{{time.start}} - {{time.end}}\r\n                                </ion-label>\r\n                                <ion-icon name=\"close-circle\"\r\n                                  (click)=\"removeTimeSchedule(i)\"></ion-icon>\r\n                              </ion-chip>\r\n                            </div>\r\n                          </ion-col>\r\n                          <ion-col size=\"12\"\r\n                            *ngIf=\"!currentSelection || currentSelection.id === 'standard'\">\r\n                            <div class=\"manage-slots\"\r\n                              *ngIf=\"scheduledDates.length && timeSchedules.length\">\r\n                              <div class=\"ds-alignment\">\r\n                                <p class=\"ds-headings\">Manage slots</p>\r\n                                <ion-button (click)=\"updateSlot()\"\r\n                                  fill=\"outline\"\r\n                                  shape=\"round\"\r\n                                  size=\"small\"\r\n                                  [disabled]=\"!manageSlots.date\">\r\n                                  Update\r\n                                </ion-button>\r\n                              </div>\r\n                              <br>\r\n                              <div class=\"c-c-a\">\r\n                                <ion-select class=\"border\"\r\n                                  (ionChange)=\"selectDate($event)\"\r\n                                  placeholder=\"Select date\"\r\n                                  style=\"border: 2px solid lightgray\">\r\n                                  <ion-select-option [value]=\"date\"\r\n                                    *ngFor=\"let date of scheduledDates\">{{date |\r\n                                    date}}\r\n                                  </ion-select-option>\r\n                                </ion-select>\r\n                              </div>\r\n                              <div *ngIf=\"manageSlots.slots.length\">\r\n                                <ion-grid class=\"ion-no-padding data-table\">\r\n                                  <ion-row\r\n                                    style=\"display: flex;align-items: center;text-align: center;\">\r\n                                    <ion-col>Slot</ion-col>\r\n                                    <ion-col>Order Limit</ion-col>\r\n                                    <ion-col>Orders Received</ion-col>\r\n                                    <ion-col>Active</ion-col>\r\n                                  </ion-row>\r\n                                  <ion-row\r\n                                    *ngFor=\"let slot of manageSlots.slots; let i=index;\"\r\n                                    style=\"display: flex;align-items: center;text-align: center;\">\r\n                                    <ion-col>\r\n                                      {{slot.start}}-{{slot.end}}\r\n                                    </ion-col>\r\n                                    <ion-col>\r\n                                      <ion-input class=\"input-border\"\r\n                                        type=\"number\"\r\n                                        [(ngModel)]=\"slot.orderLimit\">\r\n                                      </ion-input>\r\n                                    </ion-col>\r\n                                    <ion-col>\r\n                                      <p>{{slot.orderCreated || 0}}</p>\r\n                                    </ion-col>\r\n                                    <ion-col>\r\n                                      <div class=\"toggle-btn\">\r\n                                        <label class=\"switch\">\r\n                                          <input type=\"checkbox\"\r\n                                            (click)=\"manageSlotsActive(i)\"\r\n                                            [checked]=\"slot.active\">\r\n                                          <span class=\"slider round\"></span>\r\n                                        </label>\r\n                                      </div>\r\n                                    </ion-col>\r\n                                  </ion-row>\r\n                                </ion-grid>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ng-container>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"7\">\r\n                        <ion-grid>\r\n                          <ion-row>\r\n                            <ion-col size=\"12\">\r\n                              <ion-text color=\"danger\">\r\n                                <p>Note: You can select either pincode or area\r\n                                </p>\r\n                              </ion-text>\r\n                              <div class=\"flex-label\">\r\n                                <!-- <ion-label>Pincode</ion-label>\r\n                                <ion-toggle color=\"primary\"\r\n                                  (ionChange)=\"changeDeliveryType($event)\"\r\n                                  [checked]=\"deliveryType == 'areas'\"></ion-toggle>\r\n                                <ion-label>Area</ion-label> -->\r\n                                <p>PinCode</p>&nbsp;&nbsp;\r\n                                <div class=\"toggle-btn\">\r\n                                  <label class=\"switch\">\r\n                                    <input color=\"primary\"\r\n                                      type=\"checkbox\"\r\n                                      [checked]=\"deliveryType == 'areas'\"\r\n                                      (click)=\"changeDeliveryType($event)\">\r\n                                    <span class=\"slider round\"></span>\r\n                                  </label>\r\n                                </div>&nbsp;&nbsp;\r\n                                <p>Area</p>&nbsp;&nbsp;\r\n                              </div>\r\n                            </ion-col>\r\n                          </ion-row>\r\n                        </ion-grid>\r\n                        <div class=\"ds-content\"\r\n                          *ngIf=\"!showLoader && deliveryType == 'pincodes'\">\r\n                          <ion-grid>\r\n                            <ion-row>\r\n                              <ion-col size=\"12\">\r\n                                <ion-text color=\"danger\">\r\n                                  <p>Please <b\r\n                                      (click)=\"presentImportInstructions()\"\r\n                                      style=\"cursor: pointer;\">ClICK HERE</b>\r\n                                    to read import Instructions</p>\r\n                                </ion-text>\r\n                              </ion-col>\r\n                              <ion-col size=\"4\">\r\n                                <div class=\"flex-label\">\r\n                                  <!-- <ion-label>allow all pincodes</ion-label>\r\n                                  <ion-toggle color=\"primary\"\r\n                                    (ionChange)=\"allowAllPincodesToggle()\"\r\n                                    [checked]=\"isAllowAllPincodes\"></ion-toggle> -->\r\n                                  <p>Allow all pincodes</p>&nbsp;&nbsp;\r\n                                  <div class=\"toggle-btn\">\r\n                                    <label class=\"switch\">\r\n                                      <input color=\"primary\"\r\n                                        type=\"checkbox\"\r\n                                        [checked]=\"isAllowAllPincodes\"\r\n                                        (click)=\"allowAllPincodesToggle()\">\r\n                                      <span class=\"slider round\"></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </ion-col>\r\n                              <ion-col size=\"4\">\r\n                                <div class=\"flex-label\">\r\n                                  <ion-button (click)=\"openPincodeModal()\"\r\n                                    fill=\"outline\"\r\n                                    shape=\"round\"\r\n                                    size=\"small\">\r\n                                    Search Pincode\r\n                                  </ion-button>\r\n                                </div>\r\n                              </ion-col>\r\n                              <ion-col size=\"4\">\r\n                                <div class=\"flex-label\">\r\n                                  <div class=\"upload-btn-wrapper\"\r\n                                    (click)=\"exportPincodes()\">\r\n                                    <button class=\"upload-btn btn-1 i-start\"> <i\r\n                                        class=\"flaticon-null-16\"></i>\r\n                                      Export Pincodes CSV</button>\r\n                                  </div>\r\n                                  <!-- <ion-button (click)=\"exportPincodes()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                                    Export Pincodes\r\n                                  </ion-button> -->\r\n                                  <div class=\"upload-btn-wrapper\">\r\n                                    <button class=\"upload-btn btn-1 i-start\"> <i\r\n                                        class=\"flaticon-null-16\"></i>Import\r\n                                      Pincode\r\n                                      CSV</button>\r\n                                    <input type=\"file\"\r\n                                      #inputFile\r\n                                      name=\"myfile\"\r\n                                      (change)=\"importPincodes($event)\"\r\n                                      accept=\".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\" />\r\n                                  </div>\r\n                                </div>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n\r\n                          <ion-grid class=\"ion-no-padding\">\r\n                            <ion-row *ngIf=\"deliveryPincodes.length > 0\">\r\n                              <ion-col size=\"2\">\r\n                                <p>Pincodes</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Cost</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <p>Min Amount</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\"\r\n                                *ngIf=\"allowFreeDelivery == true\">\r\n                                <p>Free Delivery above Amount</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <p>Estimated Delivery time\r\n                                  <br>\r\n                                  (Format: Days:Hours:Mins)\r\n                                </p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Active</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                Remove\r\n                              </ion-col>\r\n                            </ion-row>\r\n\r\n                            <ion-row\r\n                              *ngFor=\"let x of deliveryPincodes; let i = index;\">\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"tel\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.pincode\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-input type=\"tel\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.cost\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.minAmnt\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\"\r\n                                *ngIf=\"allowFreeDelivery == true\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.freeDeliveryAmnt\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"text\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.estimatedDeliveryTime\"\r\n                                  (click)=\"enterEstimatedTime(i, x, 'pincode')\"\r\n                                  readonly></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-toggle color=\"success\"\r\n                                  (ionChange)=\"changePinActiveToggle(i)\"\r\n                                  [checked]=\"x.active\">\r\n                                </ion-toggle>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <ion-button (click)=\"removePincode(i)\"\r\n                                  color=\"danger\"\r\n                                  class=\"btm-sml i-start\"\r\n                                  shape=\"round\"\r\n                                  fill=\"outline\">\r\n                                  Remove\r\n                                </ion-button>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                            <ion-row class=\"ion-justify-content-center\">\r\n                              <ion-button (click)=\"addPincode()\"\r\n                                fill=\"outline\"\r\n                                shape=\"round\"\r\n                                size=\"small\">\r\n                                Add Pincode\r\n                              </ion-button>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n                        </div>\r\n                        <!-- Area -->\r\n                        <div class=\"ds-content\"\r\n                          *ngIf=\"!showLoader && deliveryType == 'areas'\">\r\n                          <ion-grid>\r\n                            <ion-row class=\"ion-justify-content-center\">\r\n                              <ion-button (click)=\"addBlankArea()\"\r\n                                fill=\"outline\"\r\n                                shape=\"round\"\r\n                                size=\"small\">\r\n                                Add Area Manually\r\n                              </ion-button>\r\n                              <p class=\"or-text\">OR</p>\r\n                              <ion-button (click)=\"openAreaModal()\"\r\n                                fill=\"outline\"\r\n                                shape=\"round\"\r\n                                size=\"small\">\r\n                                Add Area through map\r\n                              </ion-button>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n                          <br>\r\n                          <ion-grid class=\"ion-no-padding\">\r\n                            <ion-row *ngIf=\"deliveryAreas.length > 0\">\r\n                              <ion-col size=\"2\">\r\n                                <p>Latitude</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <p>Longitude</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Radius(In Km)</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Cost</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Min Amount</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\"\r\n                                *ngIf=\"allowFreeDelivery == true\">\r\n                                <p>Free Delivery above Amount</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <p>Estimated Delivery time\r\n                                  <br>\r\n                                  (Format: Days:Hours:Mins)\r\n                                </p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <p>Active</p>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                Remove\r\n                              </ion-col>\r\n                            </ion-row>\r\n\r\n                            <ion-row\r\n                              *ngFor=\"let x of deliveryAreas; let i = index;\">\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.lat\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.lng\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.radius\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.cost\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.minAmnt\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\"\r\n                                *ngIf=\"allowFreeDelivery == true\">\r\n                                <ion-input type=\"number\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.freeDeliveryAmnt\"></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"2\">\r\n                                <ion-input type=\"text\"\r\n                                  class=\"form-input\"\r\n                                  [(ngModel)]=\"x.estimatedDeliveryTime\"\r\n                                  (click)=\"enterEstimatedTime(i, x, 'area')\"\r\n                                  readonly></ion-input>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-toggle color=\"success\"\r\n                                  [(ngModel)]=\"x.active\"></ion-toggle>\r\n                              </ion-col>\r\n                              <ion-col size=\"1\">\r\n                                <ion-button (click)=\"removeArea(i)\"\r\n                                  color=\"danger\"\r\n                                  class=\"btm-sml i-start remove-area-btn\"\r\n                                  shape=\"round\"\r\n                                  fill=\"outline\">\r\n                                  Remove\r\n                                </ion-button>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                            <br>\r\n                          </ion-grid>\r\n                        </div>\r\n                      </div>\r\n                      <div *ngSwitchCase=\"8\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>GST Percentage\r\n                          </ion-label>\r\n                          <ion-input type=\"number\"\r\n                            class=\"form-input\" [(ngModel)]=\"gstPerc\"></ion-input>\r\n                        </div>\r\n                      </div>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-col>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- 2nd Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\"\r\n          style=\"width: 100%;\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"2\">\r\n                <div class=\"statusList\">\r\n                  <p (click)=\"locationType = 'states'; secondTabActiveElement = 1\" [ngClass]=\"secondTabActiveElement === 1 ? 'tile-bg-active' : 'tile-bg-inactive'\">\r\n                    States\r\n                  </p>\r\n                  <p (click)=\"locationType = 'pincodes'; secondTabActiveElement = 2\" [ngClass]=\"secondTabActiveElement === 2 ? 'tile-bg-active' : 'tile-bg-inactive'\">\r\n                    Pincodes\r\n                  </p>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=8\r\n                style=\"margin-top: 8px; border-left: 1px solid lightgray;\"\r\n                id=\"scroll2\">\r\n                <ion-col>\r\n                  <ion-button (click)=\"saveLocations()\"\r\n                    color=\"success\">\r\n                    <i class=\"flaticon-null-20 margin-icon\"></i>&nbsp;\r\n                    Save\r\n                  </ion-button>\r\n                </ion-col>\r\n                <br>\r\n                <ion-col>\r\n                  <!-- For States -->\r\n                  <ion-grid [hidden]=\"locationType == 'pincodes'\">\r\n                    <ion-row *ngFor=\"let state of availableLocations.states; let i = index\">\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>State</ion-label>\r\n                          <div class=\"form-input state-wrapper\"\r\n                            (click)=\"openStateModal(i)\">\r\n                            <div *ngIf=\"state.state\">{{state.state}}\r\n                            </div>\r\n                            <div *ngIf=\"!state.state\">Select State</div>\r\n                            <div>\r\n                              <i class=\"flaticon-null-13\"></i>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Type</ion-label>\r\n                          <ion-select multiple class=\"form-input\" placeholder=\"Select Type\" (ionChange)=\"setStateTypes($event, i)\" [(ngModel)]=\"state.types\" [value]=\"state.types\">\r\n                                <ion-select-option *ngFor=\"let item of newDeliveryType\" value=\"{{item.id}}\">{{item.id}}</ion-select-option>\r\n                          </ion-select>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"1\" class=\"vertical-center\">\r\n                        <i class=\"flaticon-null-19 remove-icon\" (click)=\"removeLocation('states', i)\"></i>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-justify-content-center\">\r\n                      <ion-button (click)=\"addMoreLocation('states')\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        Add More States\r\n                      </ion-button>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                  <!-- For Pincodes -->\r\n                  <ion-grid [hidden]=\"locationType == 'states'\">\r\n                    <ion-row *ngFor=\"let pincode of availableLocations.pincodes; let i = index\">\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Pincode</ion-label>\r\n                          <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"pincode.pincode\"></ion-input>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"4\">\r\n                        <div class=\"input-wrap\">\r\n                          <ion-label>Type</ion-label>\r\n                          <ion-select placeholder=\"Select Type\" multiple [(ngModel)]=\"pincode.types\">\r\n                            <ng-container *ngFor=\"let item of newDeliveryType\">\r\n                              <ion-select-option value=\"{{item.id}}\">{{item.id}}</ion-select-option>\r\n                            </ng-container>\r\n                          </ion-select>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"1\" class=\"vertical-center\">\r\n                        <i class=\"flaticon-null-19 remove-icon\" (click)=\"removeLocation('pincodes', i)\"></i>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-justify-content-center\">\r\n                      <ion-button (click)=\"addMoreLocation('pincodes')\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        Add More Pincodes\r\n                      </ion-button>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-col>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/delivery-settings/delivery-settings.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/delivery-settings/delivery-settings.module.ts ***!
  \*********************************************************************/
/*! exports provided: DeliverySettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliverySettingsPageModule", function() { return DeliverySettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delivery_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delivery-settings.page */ "./src/app/admin/delivery-settings/delivery-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _delivery_settings_page__WEBPACK_IMPORTED_MODULE_6__["DeliverySettingsPage"]
    }
];
var DeliverySettingsPageModule = /** @class */ (function () {
    function DeliverySettingsPageModule() {
    }
    DeliverySettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_delivery_settings_page__WEBPACK_IMPORTED_MODULE_6__["DeliverySettingsPage"]]
        })
    ], DeliverySettingsPageModule);
    return DeliverySettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/delivery-settings/delivery-settings.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/admin/delivery-settings/delivery-settings.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".input-border {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.ds-content {\n  font-size: 14px;\n  text-transform: capitalize;\n}\n\n.ds-all-pincodes ion-input {\n  --padding-start: 0px;\n}\n\nion-input {\n  font-size: 13px;\n}\n\n.ds-content p {\n  margin-bottom: 5px;\n}\n\n.ds-alignment {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.ds-headings {\n  width: 45%;\n  margin-right: 10%;\n}\n\n.ds-days-container {\n  display: -webkit-box;\n  display: flex;\n  flex-flow: wrap;\n}\n\n.ds-days-inactive {\n  border: 1px solid #ccc;\n  text-align: center;\n  padding: 10px 15px 10px 15px;\n  border-radius: 5px;\n  margin: 4px;\n}\n\n.ds-days-active {\n  border: 1px solid var(--ion-color-chat-border);\n  text-align: center;\n  padding: 10px 15px 10px 15px;\n  border-radius: 5px;\n  margin: 4px;\n  background: var(--ion-color-chat-background);\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.flaticon-null-17::before {\n  font-size: 18px;\n  opacity: 0.7;\n  margin-right: -10px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.time-picker {\n  padding-right: 15px;\n}\n\nion-datetime {\n  font-size: small;\n}\n\n.delivery-wt-txt {\n  display: -webkit-box;\n  display: flex;\n}\n\n.delivery-wt-txt ion-input {\n  margin-top: -10px;\n}\n\n.remove-area-btn {\n  --padding-start: 10px;\n  --padding-end: 10px;\n}\n\n.or-text {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin: 0px 10px;\n  margin-bottom: 0px !important;\n}\n\n.img-container {\n  width: 80%;\n  height: 60%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin: auto;\n}\n\n.img-container img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  text-transform: capitalize;\n}\n\n.state-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.tile-bg-active {\n  background-color: var(--ion-color-categories-background);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZGVsaXZlcnktc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxkZWxpdmVyeS1zZXR0aW5nc1xcZGVsaXZlcnktc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9kZWxpdmVyeS1zZXR0aW5ncy9kZWxpdmVyeS1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURJSTtFQUNJLG9CQUFBO0FDRFI7O0FES0E7RUFDSSxlQUFBO0FDRko7O0FES0E7RUFDSSxrQkFBQTtBQ0ZKOztBREtBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNGSjs7QURLQTtFQUNJLFVBQUE7RUFDQSxpQkFBQTtBQ0ZKOztBREtBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsZUFBQTtBQ0ZKOztBREtBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FDRko7O0FES0E7RUFDSSw4Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSw0Q0FBQTtBQ0ZKOztBREtBO0VBQ0ksU0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNGSjs7QURLQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUNGSjs7QURLQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtBQ0ZKOztBREtBO0VBQ0ksbUJBQUE7QUNGSjs7QURLQTtFQUNJLGdCQUFBO0FDRko7O0FES0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7QUNGSjs7QURHSTtFQUNJLGlCQUFBO0FDRFI7O0FESUE7RUFDSSxxQkFBQTtFQUNBLG1CQUFBO0FDREo7O0FER0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtBQ0FKOztBRElBO0VBQ0ksVUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsWUFBQTtBQ0RKOztBREVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDQU47O0FESUU7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNESjs7QURJRztFQUNDLGdCQUFBO0FDREo7O0FESUc7RUFDQyxnQkFBQTtFQUNBLFlBQUE7QUNESjs7QURJRztFQUNDLGdCQUFBO0FDREo7O0FESUc7RUFDQztJQUNFLFlBQUE7RUNESjs7RURHRTtJQUNFLFlBQUE7RUNBSjtBQUNGOztBREdHO0VBQ0Msa0JBQUE7QUNESjs7QURFSTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtBQ0FOOztBRElBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0RKOztBRElBO0VBQ0ksd0RBQUE7QUNESiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2RlbGl2ZXJ5LXNldHRpbmdzL2RlbGl2ZXJ5LXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnB1dC1ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmRzLWNvbnRlbnQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcblxyXG59XHJcblxyXG4uZHMtYWxsLXBpbmNvZGVzIHtcclxuICAgIGlvbi1pbnB1dCB7XHJcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlvbi1pbnB1dCB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi5kcy1jb250ZW50IHAge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4uZHMtYWxpZ25tZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZHMtaGVhZGluZ3Mge1xyXG4gICAgd2lkdGg6IDQ1JTtcclxuICAgIG1hcmdpbi1yaWdodDogMTAlO1xyXG59XHJcblxyXG4uZHMtZGF5cy1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZmxvdzogd3JhcDtcclxufVxyXG5cclxuLmRzLWRheXMtaW5hY3RpdmUge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwcHggMTVweCAxMHB4IDE1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW46IDRweDtcclxufVxyXG5cclxuLmRzLWRheXMtYWN0aXZlIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHggMTBweCAxNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgbWFyZ2luOiA0cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItY2hhdC1iYWNrZ3JvdW5kKTtcclxufVxyXG5cclxuLmxpbmV7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBjbGVhcjogYm90aDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgaGVpZ2h0OiAxcHg7XHJcbiAgICBvcGFjaXR5OiAuNDtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtMTc6OmJlZm9yZSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIG1hcmdpbi1yaWdodDogLTEwcHg7XHJcbiAgfVxyXG5cclxuLnNwaW5uZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50aW1lLXBpY2tlciB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG59XHJcblxyXG5pb24tZGF0ZXRpbWUge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxufVxyXG5cclxuLmRlbGl2ZXJ5LXd0LXR4dHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBpb24taW5wdXR7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogLTEwcHhcclxuICAgIH1cclxufVxyXG4ucmVtb3ZlLWFyZWEtYnRue1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMTBweDtcclxufVxyXG4ub3ItdGV4dHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAwcHggMTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDBweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8vIERlbGl2ZXJ5IFBhcnRuZXJcclxuLmltZy1jb250YWluZXJ7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgaGVpZ2h0OiA2MCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBpbWd7XHJcbiAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgbWF4LWhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICNzY3JvbGwxe1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGhlaWdodDogODJ2aFxyXG4gICB9XHJcbiAgXHJcbiAgICNzY3JvbGwxOmhvdmVye1xyXG4gICAgb3ZlcmZsb3cteTogYXV0b1xyXG4gICB9XHJcbiAgXHJcbiAgICNzY3JvbGwye1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGhlaWdodDogODJ2aDtcclxuICAgfVxyXG4gIFxyXG4gICAjc2Nyb2xsMjpob3ZlcntcclxuICAgIG92ZXJmbG93LXk6IGF1dG9cclxuICAgfVxyXG4gIFxyXG4gICBAbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAgICNzY3JvbGwxe1xyXG4gICAgICBoZWlnaHQ6IDkydmg7XHJcbiAgICAgfVxyXG4gICAgI3Njcm9sbDJ7XHJcbiAgICAgIGhlaWdodDogOTJ2aDtcclxuICAgICB9XHJcbiAgIH1cclxuICBcclxuICAgLnN0YXR1c0xpc3R7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwe1xyXG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBtYXJnaW46IDhweDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4uc3RhdGUtd3JhcHBlciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuLnRpbGUtYmctYWN0aXZle1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XHJcbn1cclxuLnRpbGUtYmctaW5hY3RpdmV7fSIsIi5pbnB1dC1ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5kcy1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmRzLWFsbC1waW5jb2RlcyBpb24taW5wdXQge1xuICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcbn1cblxuaW9uLWlucHV0IHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uZHMtY29udGVudCBwIHtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4uZHMtYWxpZ25tZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZHMtaGVhZGluZ3Mge1xuICB3aWR0aDogNDUlO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLmRzLWRheXMtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiB3cmFwO1xufVxuXG4uZHMtZGF5cy1pbmFjdGl2ZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMTBweCAxNXB4IDEwcHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW46IDRweDtcbn1cblxuLmRzLWRheXMtYWN0aXZlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWNoYXQtYm9yZGVyKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxMHB4IDE1cHggMTBweCAxNXB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG1hcmdpbjogNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItY2hhdC1iYWNrZ3JvdW5kKTtcbn1cblxuLmxpbmUge1xuICBib3JkZXI6IDA7XG4gIGNsZWFyOiBib3RoO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gIGhlaWdodDogMXB4O1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi5mbGF0aWNvbi1udWxsLTE3OjpiZWZvcmUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luLXJpZ2h0OiAtMTBweDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRpbWUtcGlja2VyIHtcbiAgcGFkZGluZy1yaWdodDogMTVweDtcbn1cblxuaW9uLWRhdGV0aW1lIHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbn1cblxuLmRlbGl2ZXJ5LXd0LXR4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4uZGVsaXZlcnktd3QtdHh0IGlvbi1pbnB1dCB7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4ucmVtb3ZlLWFyZWEtYnRuIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xuICAtLXBhZGRpbmctZW5kOiAxMHB4O1xufVxuXG4ub3ItdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbjogMHB4IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xufVxuXG4uaW1nLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA4MCU7XG4gIGhlaWdodDogNjAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmltZy1jb250YWluZXIgaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cblxuI3Njcm9sbDE6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cblxuI3Njcm9sbDI6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cblxuICAjc2Nyb2xsMiB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG59XG4uc3RhdHVzTGlzdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zdGF0dXNMaXN0IHAge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLnN0YXRlLXdyYXBwZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udGlsZS1iZy1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/delivery-settings/delivery-settings.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/delivery-settings/delivery-settings.page.ts ***!
  \*******************************************************************/
/*! exports provided: DeliverySettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliverySettingsPage", function() { return DeliverySettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _delivery_partner_settings_delivery_partner_settings_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./delivery-partner-settings/delivery-partner-settings.page */ "./src/app/admin/delivery-settings/delivery-partner-settings/delivery-partner-settings.page.ts");
/* harmony import */ var src_app_pincodes_modal_pincodes_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/pincodes-modal/pincodes-modal.page */ "./src/app/pincodes-modal/pincodes-modal.page.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./area-modal/area-modal.page */ "./src/app/admin/delivery-settings/area-modal/area-modal.page.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_delivery_settings_delivery_settings_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/delivery-settings/delivery-settings.service */ "./src/app/services/delivery-settings/delivery-settings.service.ts");
/* harmony import */ var src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/states-modal/states-modal.page */ "./src/app/states-modal/states-modal.page.ts");











// import { triggerId } from 'async_hooks';


var DeliverySettingsPage = /** @class */ (function () {
    function DeliverySettingsPage(events, loadingController, alertController, configService, modalController, papa, sharedService, deliverySettingsService) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.configService = configService;
        this.modalController = modalController;
        this.papa = papa;
        this.sharedService = sharedService;
        this.deliverySettingsService = deliverySettingsService;
        this.defaultDeliveryAmt = '';
        this.freeDeliveryAmt = '';
        this.isStorePickup = false;
        this.storePickupCharges = '';
        this.isKmBasedDelivery = false;
        this.chargesPerKm = '';
        this.maxDeliveryOfKm = '';
        this.isDeliverySchedule = false;
        this.deliveryDays = [];
        this.timeSchedules = [];
        this.allowSameDayDelivery = false;
        this.lastDeliveryTime = new Date().toISOString();
        this.instantDelivery = {
            isActive: false,
            time: null
        };
        this.isStoreDelivery = { isActive: false, estimatedTime: '' };
        this.days = [
            { day: 'Sunday', active: false }, { day: 'Monday', active: false }, { day: 'Tuesday', active: false }, { day: 'Wednesday', active: false },
            { day: 'Thursday', active: false }, { day: 'Friday', active: false }, { day: 'Saturday', active: false }
        ];
        this.time = {
            start: null,
            end: null,
        };
        this.deliveryType = 'pincodes';
        this.isAllowAllPincodes = true;
        this.deliveryPincodes = [
            {
                pincode: '',
                cost: '0',
                active: true,
                minAmnt: null,
                freeDeliveryAmnt: null,
                estimatedDeliveryTime: ''
            }
        ];
        this.deliveryAreas = [
            {
                lat: 0,
                lng: 0,
                cost: 0,
                radius: 0,
                active: true,
                minAmnt: null,
                freeDeliveryAmnt: null,
                estimatedDeliveryTime: ''
            }
        ];
        this.showLoader = true;
        this.isDeliveryScheduleMandatory = false;
        this.minHrs = null;
        this.DELIVERY_SETTINGS_LABELS = {};
        this.SHARED_LABELS = {};
        this.scheduledDates = [];
        this.manageSlots = {
            date: null,
            slots: []
        };
        this.isDeliveryBasedOnWeight = false;
        this.deliveryByWeight = {
            active: false,
            cost: 0,
            baseWeight: 0,
            baseCost: 0
        };
        this.sidemenu = [];
        this.selectedId = 'field0';
        this.selectedIdType = '0';
        this.kmSlabs = {
            active: false,
            slabs: []
        };
        this.weightSlabs = {
            active: false,
            slabs: []
        };
        this.allowFreeDelivery = true;
        this.locationType = 'states';
        this.availableLocations = {
            states: [{ state: '', stateCode: '', types: [] }],
            pincodes: [{ pincode: '', types: [] }]
        };
        this.secondTabActiveElement = 1;
    }
    DeliverySettingsPage.prototype.ngOnInit = function () {
        this.newDeliveryType = [];
        this.isDeliveryBasedKmAllowed = this.configService.environment.isDeliveryBasedKm;
        this.isDeliveryBasedOnWeight = this.configService.environment.isDeliveryBasedOnWeight;
        this.initializeSubscriptions();
        this.events.publish('delivery-settings:getDeliverySettingsData');
        this.currencyCode = this.configService.environment.currencyCode;
        this.sidemenu.push('Default Delivery', 'Free Delivery', 'Allow Store Pickup', 'Delivery Based on Km', 'Delivery Based On Weight', 'Instant Delivery', 'Store Delivery / Schedule', 'Pincode / Area', 'GST Percentage');
    };
    DeliverySettingsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    DeliverySettingsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.manageSlots = {
                    date: null,
                    slots: []
                };
                return [2 /*return*/];
            });
        });
    };
    DeliverySettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('delivery-settings:saveDeliverySettingsSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Delivery data saved successfully!');
        });
        this.events.subscribe('delivery-settings:publishDeliverySettingsData', function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showLoader = false;
                        this.setDeliverySettings(data);
                        _a = this;
                        return [4 /*yield*/, this.deliverySettingsService.getDeliveryType()];
                    case 1:
                        _a.newDeliveryType = _b.sent();
                        this.newDeliveryType.unshift({ id: 'standard', settings: data });
                        this.currentSelection = { id: 'standard', settings: data };
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('delivery-settings:slotsWithDate', function (slotsDoc) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            if (slotsDoc && slotsDoc !== undefined) {
                var finalSlots = [];
                for (var index = 0; index < slotsDoc.slots.length; index++) {
                    console.log('removing slot index', index);
                    if (_this.findTimeSlot(slotsDoc.slots, index, _this.timeSchedules)) {
                        finalSlots.push(slotsDoc.slots[index]);
                    }
                }
                for (var index = 0; index < _this.timeSchedules.length; index++) {
                    if (!_this.findTimeSlot(_this.timeSchedules, index, slotsDoc.slots)) {
                        finalSlots.push({
                            start: _this.timeSchedules[index].start,
                            end: _this.timeSchedules[index].end,
                            active: false,
                            orderLimit: 0,
                            orderCreated: 0
                        });
                    }
                }
                _this.manageSlots.slots = finalSlots;
            }
            else {
                _this.timeSchedules.forEach(function (schedule) {
                    _this.manageSlots.slots.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, schedule, { active: false, orderLimit: 0, orderCreated: 0 }));
                });
            }
            setTimeout(function () {
                _this.content.scrollToBottom(500);
            }, 200);
        });
        this.events.subscribe('delivery-settings:slotUpdated', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Slot data saved successfully');
        });
        this.getLocations();
    };
    DeliverySettingsPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    DeliverySettingsPage.prototype.updateSlot = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('delivery-settings:updateSlot', this.manageSlots);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.findTimeSlot = function (src, index, target) {
        var slot = { start: src[index].start, end: src[index].end };
        var slotPresent = target.some(function (sch) { return sch.start === slot.start && sch.end === slot.end; });
        return slotPresent;
    };
    DeliverySettingsPage.prototype.selectDate = function (e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(e.target.value);
                        this.manageSlots.date = e.target.value;
                        this.manageSlots.slots = [];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('delivery-settings:getSlotsWithDate', this.manageSlots.date.toDateString());
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.manageSlotsActive = function (i) {
        this.manageSlots.slots[i].active = !this.manageSlots.slots[i].active;
    };
    DeliverySettingsPage.prototype.getDeliveryDates = function () {
        this.scheduledDates = [];
        for (var index = 0; index < this.maxDaysOfDelivery; index++) {
            var dayToCheck = moment__WEBPACK_IMPORTED_MODULE_3__().add(index + 1, 'days');
            if (this.deliveryDays.includes(dayToCheck.format('dddd'))) {
                this.scheduledDates.push(dayToCheck.toDate());
            }
        }
        if (this.allowSameDayDelivery) {
            this.appendSameDateToDeliveryDates(this.lastDeliveryTime);
        }
        this.minHrsReqCheck();
    };
    DeliverySettingsPage.prototype.appendSameDateToDeliveryDates = function (lastTime) {
        var now = moment__WEBPACK_IMPORTED_MODULE_3__().format('HH:mm');
        var lastDeliveryTime = moment__WEBPACK_IMPORTED_MODULE_3__(lastTime, ['hh:mm A']).format('HH:mm');
        if (now < lastDeliveryTime) {
            this.scheduledDates.unshift(new Date());
        }
    };
    DeliverySettingsPage.prototype.minHrsReqCheck = function () {
        var now = parseInt(moment__WEBPACK_IMPORTED_MODULE_3__().format('HH'));
        var t1 = now + this.minHrs;
        if (t1 > 24) {
            var disabledDays = Math.floor(t1 / 24);
            var actualDays = [];
            disabledDays = this.allowSameDayDelivery ? disabledDays : disabledDays - 1;
            disabledDays = disabledDays < 0 ? 0 : disabledDays;
            for (var index = disabledDays; index < this.scheduledDates.length; index++) {
                actualDays.push(this.scheduledDates[index]);
            }
            this.scheduledDates = actualDays;
        }
    };
    DeliverySettingsPage.prototype.storePickupToggle = function () {
        this.isStorePickup = !this.isStorePickup;
    };
    DeliverySettingsPage.prototype.deliveryBasedToggle = function () {
        this.isKmBasedDelivery = !this.isKmBasedDelivery;
    };
    DeliverySettingsPage.prototype.deliveryScheduleToggle = function () {
        this.isDeliverySchedule = !this.isDeliverySchedule;
    };
    DeliverySettingsPage.prototype.deliveryScheduleMandatoryToggle = function () {
        this.isDeliveryScheduleMandatory = !this.isDeliveryScheduleMandatory;
    };
    DeliverySettingsPage.prototype.daySelectToggle = function (i) {
        this.days[i].active = !this.days[i].active;
    };
    DeliverySettingsPage.prototype.allowAllPincodesToggle = function () {
        this.isAllowAllPincodes = !this.isAllowAllPincodes;
    };
    DeliverySettingsPage.prototype.addTimeSchedule = function () {
        this.timeSchedules.push({
            start: moment__WEBPACK_IMPORTED_MODULE_3__(this.time.start).format('hh:mm A'),
            end: moment__WEBPACK_IMPORTED_MODULE_3__(this.time.end).format('hh:mm A')
        });
        this.time.start = null;
        this.time.end = null;
    };
    DeliverySettingsPage.prototype.disableAddTimeSchedule = function () {
        if (!this.time.start || !this.time.end) {
            return true;
        }
        else {
            return false;
        }
    };
    DeliverySettingsPage.prototype.getTime = function (time) {
        return moment__WEBPACK_IMPORTED_MODULE_3__(time).format('hh:mm A');
    };
    DeliverySettingsPage.prototype.removeTimeSchedule = function (index) {
        this.timeSchedules.splice(index, 1);
    };
    DeliverySettingsPage.prototype.changePinActiveToggle = function (index) {
        this.deliveryPincodes[index].active = !this.deliveryPincodes[index].active;
    };
    DeliverySettingsPage.prototype.removePincode = function (index) {
        this.deliveryPincodes.splice(index, 1);
    };
    DeliverySettingsPage.prototype.removeArea = function (index) {
        this.deliveryAreas.splice(index, 1);
    };
    DeliverySettingsPage.prototype.changeDeliveryType = function (ev) {
        console.log('ev:', ev);
        this.deliveryType = ev.target.checked ? 'areas' : 'pincodes';
    };
    DeliverySettingsPage.prototype.addPincode = function () {
        var blankPincode = {
            pincode: '',
            cost: '0',
            active: true,
            minAmnt: null,
            freeDeliveryAmnt: null,
            estimatedDeliveryTime: ''
        };
        this.deliveryPincodes.push(blankPincode);
    };
    DeliverySettingsPage.prototype.addBlankArea = function () {
        var blankPincode = {
            lat: 0,
            lng: 0,
            cost: 0,
            radius: 0,
            active: true,
            minAmnt: null,
            freeDeliveryAmnt: null,
            estimatedDeliveryTime: ''
        };
        this.deliveryAreas.push(blankPincode);
    };
    DeliverySettingsPage.prototype.saveAllDeliverySetting = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var index, emptyPincode, index, emptyLatLng, index, details, currentIndex;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.currentSelection = this.triggeredSelection;
                        if (this.instantDelivery.isActive && this.instantDelivery.time == null) {
                            this.presentAlert('Please enter instant delivery time');
                            return [2 /*return*/];
                        }
                        this.deliveryDays = [];
                        for (index = 0; index < this.days.length; index++) {
                            if (this.days[index].active) {
                                this.deliveryDays.push(this.days[index].day);
                            }
                        }
                        emptyPincode = false;
                        for (index = 0; index < this.deliveryPincodes.length; index++) {
                            this.deliveryPincodes[index].pincode = this.deliveryPincodes[index].pincode.trim();
                            if (this.deliveryPincodes[index].pincode === '' || this.deliveryPincodes[index].cost === '') {
                                emptyPincode = true;
                                break;
                            }
                        }
                        console.log('deliveryareas:', this.deliveryAreas);
                        emptyLatLng = false;
                        for (index = 0; index < this.deliveryAreas.length; index++) {
                            if (this.deliveryAreas[index].lat == 0 || this.deliveryAreas[index].lng == 0 || this.deliveryAreas[index].radius == 0) {
                                emptyLatLng = true;
                                break;
                            }
                        }
                        if (!(emptyPincode && this.deliveryType == 'pincodes')) return [3 /*break*/, 1];
                        this.presentAlert('Pincodes and Cost cannot be empty');
                        return [2 /*return*/];
                    case 1:
                        if (!(emptyLatLng && this.deliveryType == 'areas')) return [3 /*break*/, 2];
                        this.presentAlert('Latitude, Longitude and Radius cannot be empty or 0');
                        return [2 /*return*/];
                    case 2:
                        details = {
                            defaultDeliveryAmt: this.defaultDeliveryAmt,
                            freeDeliveryAmt: this.freeDeliveryAmt,
                            isStorePickup: this.isStorePickup,
                            storePickupCharges: this.storePickupCharges,
                            isKmBasedDelivery: this.isKmBasedDelivery,
                            deliveryByWeight: this.deliveryByWeight,
                            chargesPerKm: this.chargesPerKm,
                            maxDeliveryOfKm: this.maxDeliveryOfKm ? this.maxDeliveryOfKm : '',
                            isDeliverySchedule: this.isDeliverySchedule,
                            isDeliveryScheduleMandatory: this.isDeliveryScheduleMandatory,
                            deliveryDays: this.deliveryDays,
                            timeSchedules: this.timeSchedules,
                            deliveryType: this.deliveryType,
                            isAllowAllPincodes: this.isAllowAllPincodes,
                            deliveryPincodes: this.deliveryPincodes,
                            deliveryAreas: this.deliveryAreas,
                            maxDaysOfDelivery: this.maxDaysOfDelivery ? this.maxDaysOfDelivery : 14,
                            minHrs: this.minHrs ? this.minHrs : null,
                            allowSameDayDelivery: this.allowSameDayDelivery,
                            lastDeliveryTime: moment__WEBPACK_IMPORTED_MODULE_3__(this.lastDeliveryTime).format('hh:mm A'),
                            instantDelivery: this.instantDelivery,
                            isStoreDelivery: this.isStoreDelivery,
                            kmSlabs: this.kmSlabs,
                            weightSlabs: this.weightSlabs,
                            allowFreeDelivery: this.allowFreeDelivery,
                            gstPerc: this.gstPerc
                        };
                        console.log('details:', details);
                        return [4 /*yield*/, this.presentLoading()];
                    case 3:
                        _a.sent();
                        currentIndex = this.newDeliveryType.findIndex(function (n) { return n.id === _this.currentSelection.id; });
                        this.newDeliveryType[currentIndex].settings = details;
                        this.events.publish('delivery-settings:saveDeliverySettings', details, this.currentSelection.id);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.allowSameDayDeliveryToggle = function () {
        this.allowSameDayDelivery = !this.allowSameDayDelivery;
    };
    DeliverySettingsPage.prototype.presentAlert = function (msg) {
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
    DeliverySettingsPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...',
                                duration: 10000,
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
    DeliverySettingsPage.prototype.deliveryWeightBasedToggle = function () {
        this.deliveryByWeight.active = !this.deliveryByWeight.active;
    };
    DeliverySettingsPage.prototype.enterEstimatedTime = function (i, deliveryPinObj, pinOrArea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var arr, days, hours, mins, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        if (pinOrArea === 'isStoreDelivery') {
                            if (this.isStoreDelivery.estimatedTime.length > 0) {
                                arr = this.isStoreDelivery.estimatedTime.split(':');
                            }
                        }
                        else {
                            if (deliveryPinObj.estimatedDeliveryTime.length > 0) {
                                arr = deliveryPinObj.estimatedDeliveryTime.split(':');
                            }
                        }
                        days = arr.length > 0 ? arr[0] : '00';
                        hours = arr.length > 0 ? arr[1] : '00';
                        mins = arr.length > 0 ? arr[2] : '00';
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Estimated Delivery Time',
                                inputs: [{
                                        label: 'Days',
                                        name: 'days',
                                        type: 'number',
                                        placeholder: 'Days',
                                        value: parseInt(days) == 0 ? null : days
                                    },
                                    {
                                        name: 'hours',
                                        type: 'number',
                                        placeholder: 'Hours',
                                        value: parseInt(hours) == 0 ? null : hours
                                    },
                                    {
                                        name: 'mins',
                                        type: 'number',
                                        placeholder: 'Mins',
                                        value: parseInt(mins) == 0 ? null : mins
                                    }
                                ],
                                buttons: [{
                                        text: 'cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Add',
                                        handler: function (plan) {
                                            if (pinOrArea == 'pincode') {
                                                _this.deliveryPincodes[i].estimatedDeliveryTime = (plan.days ? plan.days : '00') + ":" + (plan.hours ? plan.hours : '00') + ":" + (plan.mins ? plan.mins : '00');
                                            }
                                            else if (pinOrArea == 'area') {
                                                _this.deliveryAreas[i].estimatedDeliveryTime = (plan.days ? plan.days : '00') + ":" + (plan.hours ? plan.hours : '00') + ":" + (plan.mins ? plan.mins : '00');
                                            }
                                            else if (pinOrArea == 'isStoreDelivery') {
                                                _this.isStoreDelivery.estimatedTime = (plan.days ? plan.days : '00') + ":" + (plan.hours ? plan.hours : '00') + ":" + (plan.mins ? plan.mins : '00');
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
    DeliverySettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('delivery-settings:saveDeliverySettingsSuccess');
        this.events.unsubscribe('delivery-settings:publishDeliverySettingsData');
        this.events.unsubscribe('delivery-settings:slotsWithDate');
        this.events.unsubscribe('delivery-settings:slotUpdated');
    };
    DeliverySettingsPage.prototype.openDeliveryPartner = function (deliveryPartnerChoice) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _delivery_partner_settings_delivery_partner_settings_page__WEBPACK_IMPORTED_MODULE_5__["DeliveryPartnerSettingsPage"],
                            backdropDismiss: false,
                            componentProps: {
                                deliveryPartnerChoice: deliveryPartnerChoice,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.openAreaModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_9__["AreaModalPage"],
                            cssClass: 'custom-modal big-modal',
                            backdropDismiss: false,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            if (res.data && res.data.lat != 0 && res.data.lng != 0) {
                                _this.deliveryAreas.push({
                                    lat: res.data.lat,
                                    lng: res.data.lng,
                                    active: true,
                                    cost: 0,
                                    radius: 0,
                                    minAmnt: null,
                                    freeDeliveryAmnt: null,
                                    estimatedDeliveryTime: ''
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
    DeliverySettingsPage.prototype.openPincodeModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_pincodes_modal_pincodes_modal_page__WEBPACK_IMPORTED_MODULE_6__["PincodesModalPage"],
                            backdropDismiss: false,
                            componentProps: {
                                alreadyAddedPincodes: this.deliveryPincodes
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            _this.deliveryPincodes = res.data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.exportPincodes = function () {
        var data = [];
        this.deliveryPincodes.forEach(function (element) {
            var obj = {
                pincode: element.pincode,
                cost: element.cost ? element.cost : '0',
                minAmnt: element.minAmnt ? element.minAmnt : '',
                freeDeliveryAmnt: element.freeDeliveryAmnt ? element.freeDeliveryAmnt : '',
                estimatedDeliveryTime: element.estimatedDeliveryTime,
                active: element.active ? 'YES' : 'NO',
            };
            data.push(obj);
        });
        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Pincodes',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        var csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_7__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    };
    DeliverySettingsPage.prototype.checkValidCsv = function (data) {
        var isValid = true;
        if (data[0].indexOf('pincode') < 0) {
            isValid = false;
        }
        return isValid;
    };
    DeliverySettingsPage.prototype.presentImportInstructions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Import Instructions',
                            message: '1. Please provide Estimated Delivery Time in <b>Days:Hours:Mins</b> format. </br>' +
                                '2. Do not leave any pincode empty. </br>' +
                                '3. All the pincode data will be replaced by the imported file.',
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
    DeliverySettingsPage.prototype.importPincodes = function (csv) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var csvFile, options;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('csv:', csv);
                        if (!csv) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        csvFile = csv.target.files[0];
                        options = {
                            complete: function (results, file) {
                                if (_this.checkValidCsv(results.data)) {
                                    _this.deliveryPincodes = [];
                                    for (var i = 1; i < results.data.length; i++) {
                                        var item = {
                                            pincode: results.data[i][0],
                                            cost: results.data[i][1] ? results.data[i][1].toString() : '',
                                            minAmnt: results.data[i][2] ? results.data[i][2] : null,
                                            freeDeliveryAmnt: results.data[i][3] ? results.data[i][3] : null,
                                            estimatedDeliveryTime: results.data[i][4] ? results.data[i][4] : '',
                                            active: results.data[i][5] ? (results.data[i][5].toLowerCase() == 'yes' ? true : false) : false
                                        };
                                        _this.deliveryPincodes.push(item);
                                    }
                                    _this.loading.dismiss();
                                    _this.presentAlert('File imported Successfully');
                                }
                                else {
                                    _this.loading.dismiss();
                                    _this.presentAlert('Inavlid CSV !, Please check that CSV upload is correct');
                                }
                            }
                            // Add your options here
                        };
                        this.papa.parse(csvFile, options);
                        _a.label = 2;
                    case 2:
                        this.myInputVariable.nativeElement.value = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.changeComponent = function (index) {
        var prevMsgDiv = document.getElementById(this.selectedId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById(index.toString());
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.selectedId = index.toString();
    };
    DeliverySettingsPage.prototype.activeKmSlab = function () {
        this.kmSlabs.active = !this.kmSlabs.active;
    };
    DeliverySettingsPage.prototype.enterSlabData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: "Enter Slab Details",
                            inputs: [
                                {
                                    name: 'distance',
                                    type: 'number',
                                    placeholder: "Add distance for slab in Kms"
                                },
                                {
                                    name: 'cost',
                                    type: 'number',
                                    placeholder: "Add cost for slab"
                                },
                                {
                                    name: 'freeDeliveryAmount',
                                    type: 'number',
                                    placeholder: "Add free delivery amount"
                                }
                            ],
                            buttons: [
                                {
                                    text: "cancel",
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: "done",
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        var lastIndex;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            if (!data.distance || !data.cost || !data.freeDeliveryAmount) {
                                                this.presentAlert("Please enter all details!");
                                            }
                                            else {
                                                if (this.kmSlabs.slabs.length == 0) {
                                                    this.kmSlabs.slabs.push({
                                                        range: [0, parseInt(data.distance)],
                                                        cost: parseInt(data.cost),
                                                        freeDeliveryAmount: parseInt(data.freeDeliveryAmount)
                                                    });
                                                }
                                                else {
                                                    lastIndex = this.kmSlabs.slabs.length;
                                                    this.kmSlabs.slabs.push({
                                                        range: [this.kmSlabs.slabs[lastIndex - 1].range[1],
                                                            this.kmSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.distance)],
                                                        cost: parseInt(data.cost),
                                                        freeDeliveryAmount: parseInt(data.freeDeliveryAmount)
                                                    });
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }
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
    DeliverySettingsPage.prototype.removeSlabs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: "Are you sure you want to remove all slabs?",
                            buttons: [
                                {
                                    text: "No",
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: "Yes",
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            this.kmSlabs.slabs = [];
                                            return [2 /*return*/];
                                        });
                                    }); }
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
    DeliverySettingsPage.prototype.activeWeightSlab = function () {
        this.weightSlabs.active = !this.weightSlabs.active;
    };
    DeliverySettingsPage.prototype.enterWeightSlabData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var adminInput, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.weightSlabs.slabs.length != 0) {
                            adminInput = [
                                {
                                    name: 'weight',
                                    type: 'number',
                                    placeholder: "Add weight for slab in Kgs"
                                },
                                {
                                    name: 'cost',
                                    type: 'number',
                                    placeholder: "Add cost for slab"
                                }
                            ];
                        }
                        else {
                            adminInput = [
                                {
                                    name: 'minWeight',
                                    type: 'number',
                                    placeholder: "Add min weight for delivery"
                                },
                                {
                                    name: 'weight',
                                    type: 'number',
                                    placeholder: "Add weight for slab in Kgs"
                                },
                                {
                                    name: 'cost',
                                    type: 'number',
                                    placeholder: "Add cost for slab"
                                }
                            ];
                        }
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: "Enter Slab Details",
                                inputs: adminInput,
                                buttons: [
                                    {
                                        text: "cancel",
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: "done",
                                        handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                            var lastIndex;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                if (!data.weight || !data.cost) {
                                                    this.presentAlert("Please enter all details!");
                                                }
                                                else {
                                                    if (this.weightSlabs.slabs.length == 0) {
                                                        if (!data.minWeight) {
                                                            this.presentAlert("Please enter all details!");
                                                        }
                                                        else {
                                                            this.weightSlabs.slabs.push({
                                                                range: [parseInt(data.minWeight), parseInt(data.minWeight) + parseInt(data.weight)],
                                                                cost: parseInt(data.cost)
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        lastIndex = this.weightSlabs.slabs.length;
                                                        this.weightSlabs.slabs.push({
                                                            range: [this.weightSlabs.slabs[lastIndex - 1].range[1],
                                                                this.weightSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.weight)],
                                                            cost: parseInt(data.cost)
                                                        });
                                                    }
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); }
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
    DeliverySettingsPage.prototype.removeWeightSlabs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: "Are you sure you want to remove all slabs?",
                            buttons: [
                                {
                                    text: "No",
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: "Yes",
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            this.weightSlabs.slabs = [];
                                            return [2 /*return*/];
                                        });
                                    }); }
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
    DeliverySettingsPage.prototype.freeDeliveryToggle = function () {
        this.allowFreeDelivery = !this.allowFreeDelivery;
    };
    DeliverySettingsPage.prototype.createNewDeliveryType = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Enter delivery type name',
                            inputs: [
                                {
                                    name: 'deliveryTypeInput',
                                    type: 'text',
                                    placeholder: 'Delivery type name'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Done',
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        var settings;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!data.deliveryTypeInput) return [3 /*break*/, 3];
                                                    console.log('data handler :', data.deliveryTypeInput);
                                                    if (!this.newDeliveryType.some(function (n) { return n.id === data.deliveryTypeInput.toLowerCase(); })) return [3 /*break*/, 1];
                                                    this.presentAlert('Type already exists!');
                                                    return [3 /*break*/, 3];
                                                case 1: return [4 /*yield*/, this.presentLoading()];
                                                case 2:
                                                    _a.sent();
                                                    settings = this.getDefaultDeliverySettings();
                                                    this.newDeliveryType.push({ id: data.deliveryTypeInput.toLowerCase(), settings: settings });
                                                    this.events.publish('delivery-settings:saveDeliverySettings', settings, data.deliveryTypeInput);
                                                    console.log(' del type :', this.newDeliveryType);
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }
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
    DeliverySettingsPage.prototype.newSelection = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('new selection data :', index);
                this.triggeredSelection = index;
                this.currentSelection = this.newDeliveryType[index];
                // let data = await this.deliverySettingsService.getDeliveryTypeData(this.currentSelection);
                // console.log(data);
                this.setDeliverySettings(this.newDeliveryType[index]['settings']);
                console.log('current selection :', this.currentSelection);
                prevMsgDiv = document.getElementById(this.selectedIdType);
                prevMsgDiv.style.background = 'white';
                msgDiv = document.getElementById("field" + index);
                msgDiv.style.background = 'var(--ion-color-categories-background)';
                this.selectedIdType = "field" + index;
                return [2 /*return*/];
            });
        });
    };
    DeliverySettingsPage.prototype.giveBgColor = function (index) {
        // selection color 
        var prevMsgDiv = document.getElementById(this.selectedIdType);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById("field" + index);
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.selectedIdType = "field" + index;
    };
    DeliverySettingsPage.prototype.getDefaultDeliverySettings = function () {
        var data = {
            defaultDeliveryAmt: '',
            freeDeliveryAmt: '',
            isStorePickup: false,
            storePickupCharges: '',
            isKmBasedDelivery: false,
            deliveryByWeight: {
                active: false,
                cost: 0,
                baseWeight: 0,
                baseCost: 0
            },
            chargesPerKm: '',
            maxDeliveryOfKm: '',
            isDeliverySchedule: false,
            isDeliveryScheduleMandatory: false,
            deliveryDays: [],
            timeSchedules: [],
            deliveryType: 'pincodes',
            isAllowAllPincodes: true,
            deliveryPincodes: [],
            deliveryAreas: [
                {
                    lat: 0,
                    lng: 0,
                    cost: 0,
                    radius: 0,
                    active: true,
                    minAmnt: null,
                    freeDeliveryAmnt: null,
                    estimatedDeliveryTime: ''
                }
            ],
            maxDaysOfDelivery: null,
            minHrs: null,
            allowSameDayDelivery: false,
            lastDeliveryTime: moment__WEBPACK_IMPORTED_MODULE_3__(new Date().toISOString()).format('hh:mm A'),
            instantDelivery: {
                isActive: false,
                time: null
            },
            isStoreDelivery: { isActive: false, estimatedTime: '' },
            kmSlabs: {
                active: false,
                slabs: []
            },
            weightSlabs: {
                active: false,
                slabs: []
            },
            allowFreeDelivery: true,
            gstPerc: null
        };
        return data;
    };
    DeliverySettingsPage.prototype.setDeliverySettings = function (data) {
        if (!this.isEmptyObj(data)) {
            this.defaultDeliveryAmt = data.defaultDeliveryAmt;
            this.freeDeliveryAmt = data.freeDeliveryAmt;
            this.isStorePickup = data.isStorePickup;
            this.storePickupCharges = data.storePickupCharges;
            this.isKmBasedDelivery = data.isKmBasedDelivery;
            this.deliveryByWeight = data.deliveryByWeight || this.deliveryByWeight;
            this.chargesPerKm = data.chargesPerKm;
            this.maxDeliveryOfKm = data.maxDeliveryOfKm ? data.maxDeliveryOfKm : '';
            this.isDeliverySchedule = data.isDeliverySchedule;
            this.isDeliveryScheduleMandatory = typeof data.isDeliveryScheduleMandatory !== 'undefined' ? data.isDeliveryScheduleMandatory : false;
            this.deliveryDays = data.deliveryDays;
            this.timeSchedules = data.timeSchedules;
            this.deliveryType = data.deliveryType ? data.deliveryType : this.deliveryType;
            this.isAllowAllPincodes = data.isAllowAllPincodes;
            for (var index = 0; index < data.deliveryPincodes.length; index++) {
                if (!data.deliveryPincodes[index].hasOwnProperty('estimatedDeliveryTime')) {
                    data.deliveryPincodes[index]['estimatedDeliveryTime'] = '';
                }
            }
            this.deliveryPincodes = data.deliveryPincodes;
            this.deliveryAreas = data.deliveryAreas ? data.deliveryAreas : this.deliveryAreas;
            this.maxDaysOfDelivery = data.maxDaysOfDelivery;
            this.allowSameDayDelivery = data.allowSameDayDelivery ? data.allowSameDayDelivery : false;
            this.instantDelivery = data.instantDelivery ? data.instantDelivery : { isActive: false, time: null };
            this.isStoreDelivery = data.isStoreDelivery ? data.isStoreDelivery : { isActive: false, estimatedTime: '' };
            this.minHrs = data.minHrs ? data.minHrs : null;
            this.kmSlabs = data.kmSlabs ? data.kmSlabs : this.kmSlabs;
            this.weightSlabs = data.weightSlabs ? data.weightSlabs : this.weightSlabs;
            if (data.hasOwnProperty('allowFreeDelivery')) {
                this.allowFreeDelivery = data.allowFreeDelivery;
            }
            if (data.lastDeliveryTime) {
                this.lastDeliveryTime = new Date('October 15, 1996' + ' ' + data.lastDeliveryTime).toISOString();
            }
            else {
                this.lastDeliveryTime = new Date().toISOString();
            }
            for (var index = 0; index < this.days.length; index++) {
                if (this.deliveryDays.indexOf(this.days[index].day) !== -1) {
                    this.days[index].active = true;
                }
            }
            if (this.timeSchedules.length > 0) {
                this.getDeliveryDates();
            }
            this.gstPerc = 'gstPerc' in data ? data.gstPerc : null;
        }
    };
    DeliverySettingsPage.prototype.allowInstantDelivery = function () {
        this.instantDelivery.isActive = !this.instantDelivery.isActive;
    };
    DeliverySettingsPage.prototype.allowDeliverybyStore = function () {
        this.isStoreDelivery.isActive = !this.isStoreDelivery.isActive;
    };
    DeliverySettingsPage.prototype.removeProfile = function (id, idx) {
        console.log('called :', id);
        this.removeAlert(id, idx);
    };
    DeliverySettingsPage.prototype.removeAlert = function (id, idx) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var removeProfile;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Delete Delivery Settings Profile !',
                            message: 'Do you want to <Strong>Delete</Strong> this delivery settings profile ?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.deliverySettingsService.deleteDeliverySettings(id);
                                        _this.newDeliveryType.splice(idx, 1);
                                        console.log('new data :', _this.newDeliveryType);
                                        document.getElementById('field0').click();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        removeProfile = _a.sent();
                        return [4 /*yield*/, removeProfile.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.openStateModal = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_12__["StatesModalPage"],
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('data from modal', res);
                            if (res.data) {
                                console.log(res.data);
                                _this.availableLocations.states[i].state = res.data.state,
                                    _this.availableLocations.states[i].stateCode = res.data.code;
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
    DeliverySettingsPage.prototype.removeLocation = function (choice, i) {
        if (choice == 'states') {
            this.availableLocations.states.splice(i, 1);
        }
        else if (choice == 'pincodes') {
            this.availableLocations.pincodes.splice(i, 1);
        }
    };
    DeliverySettingsPage.prototype.addMoreLocation = function (choice) {
        if (choice == 'states') {
            this.availableLocations.states.push({ state: '', stateCode: '', types: [] });
        }
        else if (choice == 'pincodes') {
            this.availableLocations.pincodes.push({ pincode: '', types: [] });
        }
    };
    DeliverySettingsPage.prototype.getLocations = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.deliverySettingsService.getLocations()];
                    case 1:
                        _a.availableLocations = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.prototype.setStateTypes = function (ev, index) {
        console.log('ev.target.value', ev.target.value);
        this.availableLocations.states[index].types = ev.target.value;
    };
    DeliverySettingsPage.prototype.saveLocations = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('this.availableLocations:', this.availableLocations);
                        return [4 /*yield*/, this.deliverySettingsService.setLocations(this.availableLocations)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            this.presentAlert('States & Pincodes data saved successfully');
                        }
                        else {
                            this.presentAlert('Please try again after sometime');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliverySettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"] },
        { type: src_app_services_delivery_settings_delivery_settings_service__WEBPACK_IMPORTED_MODULE_11__["DeliverySettingsService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], DeliverySettingsPage.prototype, "content", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('inputFile', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], DeliverySettingsPage.prototype, "myInputVariable", void 0);
    DeliverySettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delivery-settings',
            template: __webpack_require__(/*! raw-loader!./delivery-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/delivery-settings/delivery-settings.page.html"),
            styles: [__webpack_require__(/*! ./delivery-settings.page.scss */ "./src/app/admin/delivery-settings/delivery-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"],
            src_app_services_delivery_settings_delivery_settings_service__WEBPACK_IMPORTED_MODULE_11__["DeliverySettingsService"]])
    ], DeliverySettingsPage);
    return DeliverySettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-delivery-settings-delivery-settings-module-es5.js.map