(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-manage-shipment-manage-shipment-module"],{

/***/ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js ***!
  \**************************************************************/
/*! exports provided: ClipboardDirective, ClipboardIfSupportedDirective, ClipboardModule, ClipboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardDirective", function() { return ClipboardDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardIfSupportedDirective", function() { return ClipboardIfSupportedDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardModule", function() { return ClipboardModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-window-token */ "./node_modules/ngx-window-token/fesm2015/ngx-window-token.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
class ClipboardService {
    constructor(ngZone, document, window) {
        this.ngZone = ngZone;
        this.document = document;
        this.window = window;
        this.copySubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.copyResponse$ = this.copySubject.asObservable();
        this.config = {};
    }
    configure(config) {
        this.config = config;
    }
    copy(content) {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content });
        }
        const copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content });
    }
    get isSupported() {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
    }
    isTargetValid(element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    }
    /**
     * Attempts to copy from an input `targetElm`
     */
    copyFromInputElement(targetElm, isFocus = true) {
        try {
            this.selectTarget(targetElm);
            const re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    }
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    isCopySuccessInIE11() {
        const clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    }
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    copyFromContent(content, container = this.document.body) {
        // check if the temp textarea still belongs to the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement || undefined);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        const toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement || undefined);
        }
        return toReturn;
    }
    /**
     * Remove temporary textarea if any exists.
     */
    destroy(container = this.document.body) {
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    }
    /**
     * Select the target html input element.
     */
    selectTarget(inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    }
    copyText() {
        return this.document.execCommand('copy');
    }
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    clearSelection(inputElement, window) {
        var _a;
        inputElement && inputElement.focus();
        (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
    }
    /**
     * Creates a fake textarea for copy command.
     */
    createTempTextArea(doc, window) {
        const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        let ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    pushCopyResponse(response) {
        if (this.copySubject.observers.length > 0) {
            this.ngZone.run(() => {
                this.copySubject.next(response);
            });
        }
    }
    /**
     * @deprecated use pushCopyResponse instead.
     */
    pushCopyReponse(response) {
        this.pushCopyResponse(response);
    }
}
ClipboardService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ClipboardService_Factory() { return new ClipboardService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"], 8)); }, token: ClipboardService, providedIn: "root" });
ClipboardService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
];
ClipboardService.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"],] }] }
];

class ClipboardDirective {
    constructor(ngZone, host, renderer, clipboardSrv) {
        this.ngZone = ngZone;
        this.host = host;
        this.renderer = renderer;
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onClick = (event) => {
            if (!this.clipboardSrv.isSupported) {
                this.handleResult(false, undefined, event);
            }
            else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
                this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
            }
            else if (this.cbContent) {
                this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
            }
        };
    }
    // tslint:disable-next-line:no-empty
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            // By default each host listener schedules change detection and also wrapped
            // into additional function that calls `markForCheck()`. We're listening the `click`
            // event in the context of the root zone to avoid running unnecessary change detections,
            // since this directive doesn't do anything template-related (e.g. updates template variables).
            this.clickListener = this.renderer.listen(this.host.nativeElement, 'click', this.onClick);
        });
    }
    ngOnDestroy() {
        this.clickListener();
        this.clipboardSrv.destroy(this.container);
    }
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    handleResult(succeeded, copiedContent, event) {
        let response = {
            isSuccess: succeeded,
            event
        };
        if (succeeded) {
            if (this.cbOnSuccess.observers.length > 0) {
                response = Object.assign(response, {
                    content: copiedContent,
                    successMessage: this.cbSuccessMsg
                });
                this.ngZone.run(() => {
                    this.cbOnSuccess.emit(response);
                });
            }
        }
        else {
            if (this.cbOnError.observers.length > 0) {
                this.ngZone.run(() => {
                    this.cbOnError.emit(response);
                });
            }
        }
        this.clipboardSrv.pushCopyResponse(response);
    }
}
ClipboardDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{ selector: '[ngxClipboard]' },] }
];
ClipboardDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
    { type: ClipboardService }
];
ClipboardDirective.propDecorators = {
    targetElm: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['ngxClipboard',] }],
    container: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    cbContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    cbSuccessMsg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    cbOnSuccess: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
    cbOnError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
};

class ClipboardIfSupportedDirective {
    constructor(_clipboardService, _viewContainerRef, _templateRef) {
        this._clipboardService = _clipboardService;
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    ngOnInit() {
        if (this._clipboardService.isSupported) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    }
}
ClipboardIfSupportedDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                selector: '[ngxClipboardIfSupported]'
            },] }
];
ClipboardIfSupportedDirective.ctorParameters = () => [
    { type: ClipboardService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"] }
];

class ClipboardModule {
}
ClipboardModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
                exports: [ClipboardDirective, ClipboardIfSupportedDirective]
            },] }
];

/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ngx-clipboard.js.map


/***/ }),

/***/ "./node_modules/ngx-window-token/fesm2015/ngx-window-token.js":
/*!********************************************************************!*\
  !*** ./node_modules/ngx-window-token/fesm2015/ngx-window-token.js ***!
  \********************************************************************/
/*! exports provided: WINDOW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


const WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('WindowToken', typeof window !== 'undefined' && window.document
    ? { providedIn: 'root', factory: () => window }
    : { providedIn: 'root', factory: () => undefined });

/*
 * Public API Surface of ngx-window-token
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ngx-window-token.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/manage-shipment/manage-shipment.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/manage-shipment/manage-shipment.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"admin-orders\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Order id: ORD{{orderId}}</ion-title>\r\n  </ion-toolbar>\r\n  </ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 1; else step1Completed;\">1</ion-label>\r\n      <ng-template #step1Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>create order</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 2; else step2Completed;\">2</ion-label>\r\n      <ng-template #step2Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>select courier</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label class=\"step-count\" *ngIf=\"statusIndex <= 3; else step3Completed;\">3</ion-label>\r\n      <ng-template #step3Completed>\r\n        <ion-label>\r\n          <ion-icon class=\"check-icon\" name=\"checkmark-circle\"></ion-icon>\r\n        </ion-label>\r\n      </ng-template>\r\n      <ion-label>download manifest, label and invoice {{manageShipmentService.integrationCode}}</ion-label>\r\n    </super-tab-button>\r\n\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container swipeEnabled=\"false\" *ngIf=\"orderDetails\">\r\n\r\n    <!-- create order -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n\r\n              <ion-col class=\"ion-text-center m-b-20\" size=\"12\">\r\n                <ng-container *ngIf=\"isIntegrationCodeSaved(); else integrationNotSelected;\">\r\n                  <p class=\"integration-txt\">\r\n                    Delivery Integration through <span class=\"value\">{{manageShipmentService.integrationCode}}</span>\r\n                  </p>\r\n                </ng-container>\r\n  \r\n                <ng-template #integrationNotSelected>\r\n                  <div class=\"flex-label\">\r\n                    <span class=\"heading\">Delivery Integration through</span>\r\n                    <span class=\"m-l-16\">\r\n                      <ion-select class=\"form-input\" placeholder=\"Select Delivery Integration Option\" (ionChange)=\"onChangeIntegration($event)\">\r\n                        <ion-select-option [value]=\"integration.id\" *ngFor=\"let integration of integrations\">{{integration.id}}</ion-select-option>\r\n                      </ion-select>\r\n                    </span>\r\n                  </div>\r\n                </ng-template>\r\n              </ion-col>\r\n              \r\n              <ng-container *ngIf=\"orderDetails.vendors?.length && !isVendorLogin\">\r\n                <ion-col class=\"ion-text-center m-b-20\" size=\"12\">\r\n                  <div class=\"flex-label\">\r\n                    <span class=\"heading\">Select Vendor</span>\r\n                    <span class=\"m-l-16\">\r\n                      <ion-select class=\"form-input\" placeholder=\"Select Vendor\" (ionChange)=\"onChangeVendor($event)\" [disabled]=\"!manageShipmentService.integrationCode\">\r\n                        <ion-select-option [value]=\"vendor.id\" *ngFor=\"let vendor of orderDetails.vendors\">{{vendor.vendor.name}}</ion-select-option>\r\n                      </ion-select>\r\n                    </span>\r\n                  </div>\r\n                </ion-col>\r\n              </ng-container>\r\n              \r\n\r\n              <!-- Length -->\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Length(in cm) (Must be more than 1)</ion-label>\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"customOrder.length\" [readonly]=\"statusIndex > 1\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- Length -->\r\n\r\n              <!-- Breadth -->\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Breadth(in cm) (Must be more than 1)</ion-label>\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"customOrder.breadth\" [readonly]=\"statusIndex > 1\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- Breadth -->\r\n\r\n              <!-- Height -->\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Height(in cm) (Must be more than 1)</ion-label>\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"customOrder.height\" [readonly]=\"statusIndex > 1\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- Height -->\r\n\r\n              <!-- Weight -->\r\n              <ion-col size=\"6\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Weight(in kgs)</ion-label>\r\n                  <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"customOrder.weight\" [readonly]=\"statusIndex > 1\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- Weight -->\r\n\r\n              <!-- Pickup Location -->\r\n              <ion-col size=\"6\" *ngIf=\"pickupLocations?.length\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Select pickup location / profile</ion-label>\r\n                \r\n                  <p class=\"m-t-16\" *ngIf=\"!manageShipmentService.integrationCode; else integrationSelected;\">\r\n                    Please select any available delivery integration option first. \r\n                  </p>\r\n\r\n                  <ng-template #integrationSelected>\r\n                    <p class=\"m-t-16\" *ngIf=\"!pickupLocations?.length; else locationsAvailable;\">\r\n                      No Pickup Locations are available in your delivery integration account.\r\n                    </p>\r\n                    <ng-template #locationsAvailable>\r\n                      <ion-select class=\"form-input\" [value]=\"getSelectedLocation()\" placeholder=\"Select Pickup Location\"\r\n                        (ionChange)=\"onChangePickupLocation($event);\" [disabled]=\"statusIndex > 1\">\r\n                        <div *ngIf=\"manageShipmentService.integrationCode === 'shiprocket'\">\r\n                          <ion-select-option [value]=\"location.id\" *ngFor=\"let location of pickupLocations\">\r\n                            {{location.pickup_location}}</ion-select-option>\r\n                        </div>\r\n                        <div *ngIf=\"manageShipmentService.integrationCode === 'fastbeetle'\">\r\n                          <ion-select-option [value]=\"location.profileName\" *ngFor=\"let location of pickupLocations\">\r\n                            {{location.profileName}} - {{location.merchantAddress}}</ion-select-option>\r\n                        </div>\r\n                      </ion-select>\r\n                    </ng-template>\r\n                  </ng-template>\r\n\r\n                </div>\r\n              </ion-col>\r\n              <!-- Pickup Location -->\r\n\r\n              <!-- shipping details -->\r\n              <ion-col size=\"6\" *ngIf=\"(orderDetails?.address?.address || customOrder?.billing_address) as address\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Shipping Details</ion-label>\r\n                  <ion-input class=\"form-input\" type=\"text\" [value]=\"address\" readonly></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <!-- shipping details -->\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n          <ion-footer no-border class=\"page-footer\">\r\n            <div class=\"main-container\">\r\n              <ion-button (click)=\"createOrder()\" [disabled]=\"disableCreateOrderBtn()\" shape=\"round\" class=\"btn-1 i-start\"\r\n                color=\"success\" *ngIf=\"statusIndex <= 1\">\r\n                <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                Create Order\r\n              </ion-button>\r\n              <ion-button (click)=\"presentAlertConfirm()\" shape=\"round\" class=\"btn-1 i-start\"\r\n                  color=\"danger\" *ngIf=\"statusIndex > 1\">\r\n                  <i class=\"flaticon-null-19 margin-icon\"></i>\r\n                  cancel and start new shipment \r\n                </ion-button>\r\n            </div>\r\n          </ion-footer>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <!-- create order -->\r\n\r\n\r\n\r\n    <!-- select courier -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n\r\n          <ng-container *ngIf=\"statusIndex < 2; else step2Allowed;\">\r\n            <p>Please create order at step 1 before selecting couriers.</p>\r\n          </ng-container>\r\n\r\n          <ng-template #step2Allowed>\r\n\r\n            <!-- Courier & Pickup Details will show after courier selected -->\r\n          <ng-container *ngIf=\"statusIndex >= 3; else noCourierSelected;\">\r\n            <table *ngIf=\"awbData.courier_name; else defaultCourierData;\">\r\n              <caption>Courier & Pickup Details</caption>\r\n              <tr>\r\n                <th>courier name</th>\r\n                <td>{{awbData.courier_name}}</td>\r\n              </tr>\r\n              <tr>\r\n                <th>applied weight</th>\r\n                <td>{{awbData.applied_weight}}</td>\r\n              </tr>\r\n              <tr>\r\n                <th>COD</th>\r\n                <td>{{awbData.cod === 1 ? 'Available' : 'Not Available'}}</td>\r\n              </tr>\r\n\r\n              <ng-container *ngIf=\"pickupDetails\">\r\n                <tr>\r\n                  <th>pickup confirmation</th>\r\n                  <td>{{pickupDetails.data}}</td>\r\n                </tr>\r\n                <tr>\r\n                  <th>pickup generated at</th>\r\n                  <td>{{pickupDetails.pickup_generated_date.date | date:'medium'}}</td>\r\n                </tr>\r\n                <tr>\r\n                  <th>pickup scheduled at</th>\r\n                  <td>{{pickupDetails.pickup_scheduled_date | date:'medium'}}</td>\r\n                </tr>\r\n              </ng-container>\r\n            </table>\r\n\r\n            <ng-template #defaultCourierData>\r\n              <ng-container *ngIf=\"shipmentDetails.courier_name; else callAgainCourierApi\">\r\n                <p class=\"default-courier\">{{shipmentDetails.courier_name}} will be the default courier partner for this order.</p>\r\n              </ng-container>\r\n\r\n              <ng-template #callAgainCourierApi>\r\n                <ion-button (click)=\"checkCourierServiceability()\" shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n                  Check Courier Serviceability\r\n                </ion-button>\r\n              </ng-template>\r\n              \r\n            </ng-template>\r\n            \r\n          </ng-container>\r\n          <!-- Courier & Pickup Details will show after courier selected-->\r\n          \r\n          <ng-template #noCourierSelected>\r\n            <ng-container *ngIf=\"!couriers.length; else showCouriers;\">\r\n              <p>No couriers available currently. Please wait for some time.</p>\r\n            </ng-container>\r\n  \r\n            <!-- Available Couriers -->\r\n            <ng-template #showCouriers>\r\n              <p class=\"recommended-courier-txt\" *ngIf=\"orderDetails?.deliveryGstObj?.courierId && getCourierName()\">\r\n                <span>{{getCourierName()}}</span> courier service used when placing the order. It is recommended to proceed with the same one.\r\n              </p>\r\n              <p class=\"table-heading\">Available Couriers</p>\r\n              <table>\r\n                <tr>\r\n                  <th>courier name</th>\r\n                  <th>charges</th>\r\n                  <th>rating</th>\r\n                  <th>COD</th>\r\n                  <th>estimated delivery time</th>\r\n                  <th>recommended by {{manageShipmentService.integrationCode}}</th>\r\n                  <th>select</th>\r\n                </tr>\r\n                <tr *ngFor=\"let courier of couriers\">\r\n                  <td>{{courier.courier_name}}</td>\r\n                  <td>{{courier.rate | currency:'INR'}}</td>\r\n                  <td>{{courier.rating}}</td>\r\n                  <td>{{courier.cod === 1 ? 'Available' : 'Not Available'}}</td>\r\n                  <td>{{courier.etd}}</td>\r\n                  <td>{{courier.courier_company_id === recommendedCourierId ? 'Yes' : 'No'}}</td>\r\n                  <td>\r\n                    <ion-button (click)=\"selectCourier(courier.courier_company_id)\" size=\"small\" shape=\"round\"\r\n                      color=\"success\">\r\n                      select\r\n                    </ion-button>\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </ng-template>\r\n            <!-- Available Couriers -->\r\n          </ng-template>\r\n\r\n        </ng-template>\r\n          \r\n          \r\n        </div>\r\n      </ion-content>\r\n\r\n    </super-tab>\r\n    <!-- select courier -->\r\n\r\n\r\n\r\n    <!-- download manifest, label and invoice -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n\r\n          <ng-container *ngIf=\"statusIndex < 3; else step3Allowed;\">\r\n            <p>Please select any courier at step 2 before accessing this step.</p>\r\n          </ng-container>\r\n          <ng-template #step3Allowed>\r\n            \r\n          <ion-grid>\r\n\r\n            <!-- manifets, label and invoice urls dwnld or generate-->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <h5>Download Links</h5>\r\n              </ion-col>\r\n              <ion-col size=\"3\" class=\"url-links\" *ngFor=\"let type of receiptTypes\">\r\n                <p>{{type}} url</p>\r\n                <ion-button (click)=\"downloadUrl(type)\" size=\"small\" shape=\"round\" color=\"success\" *ngIf=\"receiptsUrls[type]\">\r\n                  download {{type}}\r\n                </ion-button>\r\n                <ion-button (click)=\"generateUrl(type)\" size=\"small\" shape=\"round\" color=\"success\" *ngIf=\"!receiptsUrls[type]\">\r\n                  generate\r\n                </ion-button>\r\n              </ion-col>\r\n            </ion-row>\r\n            <!-- manifets, label and invoice urls dwnld or generate-->\r\n\r\n            <!-- Tracking Link get and send to user-->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <h5>Tracking Details</h5>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <ng-container *ngIf=\"!trackingDetails.trackUrl; else trackingUrlAvailable;\">\r\n                  <ion-button class=\"m-r-16 m-t-16\" (click)=\"getTrackingDetails('url')\" size=\"small\" color=\"success\">\r\n                    get tracking url\r\n                  </ion-button>\r\n                </ng-container>\r\n    \r\n                <ng-template #trackingUrlAvailable>\r\n                  <div class=\"tracking-link\" ngxClipboard [cbContent]=\"trackingDetails.trackUrl\">\r\n                    <p>{{trackingDetails.trackUrl}}</p>\r\n                    <div class=\"copy-link\" (click)=\"showToast()\">\r\n                      <ion-icon name=\"copy\"></ion-icon>\r\n                      <ion-text>Click to copy</ion-text>\r\n                    </div>\r\n                    <div class=\"m-l-16\">\r\n                      <ion-button (click)=\"sendTrackingLink()\" size=\"small\">\r\n                        send tracking link to user\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                </ng-template>\r\n\r\n                <ion-button class=\"m-t-16\" (click)=\"getTrackingDetails('events')\" size=\"small\" color=\"success\">\r\n                  get tracking real time events\r\n                </ion-button>\r\n                <ng-container *ngIf=\"trackingDetails.trackEvents?.length\">\r\n                  <div class=\"tracking-events\">\r\n                    <div class=\"event\" *ngFor=\"let event of trackingDetails.trackEvents\">\r\n                      <p class=\"time\">{{event.time | date:'medium'}}</p>\r\n                      <p class=\"remarks\">{{event.remarks}}</p>\r\n                      <p class=\"location\">{{event.location}}</p>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n                \r\n              </ion-col>\r\n            </ion-row>\r\n            <!-- Tracking Link get and send to user-->\r\n\r\n          </ion-grid>\r\n\r\n        </ng-template>\r\n        </div>\r\n      </ion-content>\r\n\r\n    </super-tab>\r\n    <!-- download manifest, label and invoice -->\r\n\r\n\r\n\r\n\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/manage-shipment/manage-shipment.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/manage-shipment/manage-shipment.module.ts ***!
  \*****************************************************************/
/*! exports provided: ManageShipmentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageShipmentPageModule", function() { return ManageShipmentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _manage_shipment_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manage-shipment.page */ "./src/app/admin/manage-shipment/manage-shipment.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");









const routes = [
    {
        path: '',
        component: _manage_shipment_page__WEBPACK_IMPORTED_MODULE_6__["ManageShipmentPage"]
    }
];
let ManageShipmentPageModule = class ManageShipmentPageModule {
};
ManageShipmentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__["ClipboardModule"]
        ],
        providers: [
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__["ClipboardService"]
        ],
        declarations: [_manage_shipment_page__WEBPACK_IMPORTED_MODULE_6__["ManageShipmentPage"]]
    })
], ManageShipmentPageModule);



/***/ }),

/***/ "./src/app/admin/manage-shipment/manage-shipment.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/manage-shipment/manage-shipment.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-grid {\n  background: #fff;\n}\n\n.heading, .input-wrap ion-label {\n  font-weight: 600;\n  color: #666;\n}\n\n.input-wrap ion-label {\n  text-transform: capitalize;\n}\n\n.integration-txt {\n  font-size: 18px;\n}\n\n.integration-txt .value {\n  font-size: 18px;\n  font-weight: bold;\n  text-transform: capitalize;\n}\n\nsuper-tabs-toolbar .check-icon {\n  color: var(--ion-color-success);\n  font-size: 32px;\n}\n\nsuper-tabs-toolbar .step-count {\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  background: #3F51B5;\n  color: #fff;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin-bottom: 5px;\n}\n\n.table-heading {\n  font-size: 1.5em;\n  margin: 0.5em 0 0.75em;\n  text-align: center;\n  opacity: 0.8;\n}\n\ntable {\n  border: 1px solid #ccc;\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  table-layout: fixed;\n}\n\ntable caption {\n  font-size: 1.5em;\n  margin: 0.5em 0 0.75em;\n}\n\ntable tr {\n  background-color: #f8f8f8;\n  border: 1px solid #ddd;\n  padding: 0.35em;\n}\n\ntable th,\ntable td {\n  padding: 0.625em;\n  text-align: center;\n}\n\ntable th {\n  font-size: 0.85em;\n  letter-spacing: 0.1em;\n  text-transform: capitalize;\n}\n\n.tracking-link {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.tracking-link p {\n  background-color: #f8f8f8;\n  border: 1px solid #ddd;\n  padding: 15px;\n  border-radius: 5px;\n}\n\n.tracking-link .copy-link {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-left: 15px;\n  cursor: pointer;\n}\n\n.tracking-link .copy-link ion-icon {\n  font-size: 20px;\n}\n\n.tracking-link .copy-link ion-text {\n  opacity: 0.8;\n}\n\n.url-links {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  text-align: center;\n  margin-right: 15px;\n  text-transform: capitalize;\n}\n\n.url-links ion-button {\n  margin-top: 20px;\n}\n\n.recommended-courier-txt {\n  font-size: 17px;\n  margin: 20px 0;\n}\n\n.recommended-courier-txt span {\n  font-weight: bold;\n}\n\n.tracking-events {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  max-width: 30%;\n  padding: 10px;\n  margin: 20px 0;\n}\n\n.tracking-events .event {\n  margin: 10px 0;\n}\n\n.tracking-events .event:not(:last-child) {\n  border-bottom: 1px solid #ccc;\n}\n\n.tracking-events .event p {\n  margin-bottom: 10px;\n}\n\n.tracking-events .event .time {\n  font-weight: bold;\n}\n\n.tracking-events .event .location {\n  font-style: italic;\n}\n\n.default-courier {\n  font-size: 18px;\n  text-align: center;\n}\n\n@media screen and (max-width: 600px) {\n  table {\n    border: 0;\n  }\n\n  table caption {\n    font-size: 1.3em;\n  }\n\n  table thead {\n    border: none;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n  }\n\n  table tr {\n    border-bottom: 3px solid #ddd;\n    display: block;\n    margin-bottom: 0.625em;\n  }\n\n  table td {\n    border-bottom: 1px solid #ddd;\n    display: block;\n    font-size: 0.8em;\n    text-align: right;\n  }\n\n  table td::before {\n    /*\n    * aria-label has no advantage, it won't be read inside a table\n    content: attr(aria-label);\n    */\n    content: attr(data-label);\n    float: left;\n    font-weight: bold;\n    text-transform: uppercase;\n  }\n\n  table td:last-child {\n    border-bottom: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbWFuYWdlLXNoaXBtZW50L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcbWFuYWdlLXNoaXBtZW50XFxtYW5hZ2Utc2hpcG1lbnQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tYW5hZ2Utc2hpcG1lbnQvbWFuYWdlLXNoaXBtZW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FDQ0Y7O0FERUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNDQTs7QURHQTtFQUNFLDBCQUFBO0FDQUY7O0FES0E7RUFDQSxlQUFBO0FDRkE7O0FER0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ0RGOztBRE1FO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FDSE47O0FES0U7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxrQkFBQTtBQ0hOOztBRE9BO0VBQ0UsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0pGOztBRE9BO0VBQ0Usc0JBQUE7RUFDQSx5QkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDSkY7O0FET0E7RUFDRSxnQkFBQTtFQUNBLHNCQUFBO0FDSkY7O0FET0E7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQ0pGOztBRE9BOztFQUVFLGdCQUFBO0VBQ0Esa0JBQUE7QUNKRjs7QURPQTtFQUNFLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSwwQkFBQTtBQ0pGOztBRE9BO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsdUJBQUE7VUFBQSwyQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNKRjs7QURLRTtFQUNFLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUNISjs7QURPRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUNMSjs7QURNSTtFQUNFLGVBQUE7QUNKTjs7QURNSTtFQUNFLFlBQUE7QUNKTjs7QURTQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0FDTkY7O0FET0U7RUFDRSxnQkFBQTtBQ0xKOztBRFNBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUNORjs7QURPRTtFQUNFLGlCQUFBO0FDTEo7O0FEU0E7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FDTkY7O0FET0U7RUFFRSxjQUFBO0FDTko7O0FES0k7RUFBb0IsNkJBQUE7QUNGeEI7O0FESUk7RUFDRSxtQkFBQTtBQ0ZOOztBRElJO0VBQ0UsaUJBQUE7QUNGTjs7QURJSTtFQUNFLGtCQUFBO0FDRk47O0FET0E7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUNKRjs7QURPQTtFQUNFO0lBQ0UsU0FBQTtFQ0pGOztFRE9BO0lBQ0UsZ0JBQUE7RUNKRjs7RURPQTtJQUNFLFlBQUE7SUFDQSxtQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0lBQ0EsZ0JBQUE7SUFDQSxVQUFBO0lBQ0Esa0JBQUE7SUFDQSxVQUFBO0VDSkY7O0VET0E7SUFDRSw2QkFBQTtJQUNBLGNBQUE7SUFDQSxzQkFBQTtFQ0pGOztFRE9BO0lBQ0UsNkJBQUE7SUFDQSxjQUFBO0lBQ0EsZ0JBQUE7SUFDQSxpQkFBQTtFQ0pGOztFRE9BO0lBQ0U7OztLQUFBO0lBSUEseUJBQUE7SUFDQSxXQUFBO0lBQ0EsaUJBQUE7SUFDQSx5QkFBQTtFQ0pGOztFRE9BO0lBQ0UsZ0JBQUE7RUNKRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vbWFuYWdlLXNoaXBtZW50L21hbmFnZS1zaGlwbWVudC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tZ3JpZHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcblxyXG4uaGVhZGluZyB7XHJcbmZvbnQtd2VpZ2h0OiA2MDA7XHJcbmNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4uaW5wdXQtd3JhcCB7XHJcbmlvbi1sYWJlbCB7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgQGV4dGVuZCAuaGVhZGluZztcclxufVxyXG59XHJcblxyXG4uaW50ZWdyYXRpb24tdHh0IHtcclxuZm9udC1zaXplOiAxOHB4O1xyXG4udmFsdWUge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG59XHJcblxyXG5zdXBlci10YWJzLXRvb2xiYXIge1xyXG4gIC5jaGVjay1pY29uIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgICAgZm9udC1zaXplOiAzMnB4O1xyXG4gIH1cclxuICAuc3RlcC1jb3VudCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgd2lkdGg6IDIycHg7XHJcbiAgICAgIGhlaWdodDogMjJweDtcclxuICAgICAgYmFja2dyb3VuZDogIzNGNTFCNTtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4udGFibGUtaGVhZGluZyB7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxuICBtYXJnaW46IDAuNWVtIDAgMC43NWVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBvcGFjaXR5OiAuODtcclxufVxyXG5cclxudGFibGUge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG59XHJcblxyXG50YWJsZSBjYXB0aW9uIHtcclxuICBmb250LXNpemU6IDEuNWVtO1xyXG4gIG1hcmdpbjogLjVlbSAwIC43NWVtO1xyXG59XHJcblxyXG50YWJsZSB0ciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IC4zNWVtO1xyXG59XHJcblxyXG50YWJsZSB0aCxcclxudGFibGUgdGQge1xyXG4gIHBhZGRpbmc6IC42MjVlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbnRhYmxlIHRoIHtcclxuICBmb250LXNpemU6IC44NWVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAuMWVtO1xyXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG59XHJcblxyXG4udHJhY2tpbmctbGluayB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICB9XHJcbiAgXHJcblxyXG4gIC5jb3B5LWxpbmsge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBpb24taWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgb3BhY2l0eTogLjg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4udXJsLWxpbmtzIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgaW9uLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLnJlY29tbWVuZGVkLWNvdXJpZXItdHh0IHtcclxuICBmb250LXNpemU6IDE3cHg7XHJcbiAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgc3BhbiB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcbn1cclxuXHJcbi50cmFja2luZy1ldmVudHMge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIG1heC13aWR0aDogMzAlO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgLmV2ZW50IHtcclxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7fVxyXG4gICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICBwIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxuICAgIC50aW1lIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB9XHJcbiAgICAubG9jYXRpb24ge1xyXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZGVmYXVsdC1jb3VyaWVyIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gIHRhYmxlIHtcclxuICAgIGJvcmRlcjogMDtcclxuICB9XHJcblxyXG4gIHRhYmxlIGNhcHRpb24ge1xyXG4gICAgZm9udC1zaXplOiAxLjNlbTtcclxuICB9XHJcbiAgXHJcbiAgdGFibGUgdGhlYWQge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcclxuICAgIGhlaWdodDogMXB4O1xyXG4gICAgbWFyZ2luOiAtMXB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMXB4O1xyXG4gIH1cclxuICBcclxuICB0YWJsZSB0ciB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI2RkZDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLjYyNWVtO1xyXG4gIH1cclxuICBcclxuICB0YWJsZSB0ZCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgZm9udC1zaXplOiAuOGVtO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgfVxyXG4gIFxyXG4gIHRhYmxlIHRkOjpiZWZvcmUge1xyXG4gICAgLypcclxuICAgICogYXJpYS1sYWJlbCBoYXMgbm8gYWR2YW50YWdlLCBpdCB3b24ndCBiZSByZWFkIGluc2lkZSBhIHRhYmxlXHJcbiAgICBjb250ZW50OiBhdHRyKGFyaWEtbGFiZWwpO1xyXG4gICAgKi9cclxuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICB9XHJcbiAgXHJcbiAgdGFibGUgdGQ6bGFzdC1jaGlsZCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAwO1xyXG4gIH1cclxufVxyXG4iLCJpb24tZ3JpZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG5cbi5oZWFkaW5nLCAuaW5wdXQtd3JhcCBpb24tbGFiZWwge1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzY2Njtcbn1cblxuLmlucHV0LXdyYXAgaW9uLWxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5pbnRlZ3JhdGlvbi10eHQge1xuICBmb250LXNpemU6IDE4cHg7XG59XG4uaW50ZWdyYXRpb24tdHh0IC52YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG5zdXBlci10YWJzLXRvb2xiYXIgLmNoZWNrLWljb24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBmb250LXNpemU6IDMycHg7XG59XG5zdXBlci10YWJzLXRvb2xiYXIgLnN0ZXAtY291bnQge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAyMnB4O1xuICBoZWlnaHQ6IDIycHg7XG4gIGJhY2tncm91bmQ6ICMzRjUxQjU7XG4gIGNvbG9yOiAjZmZmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4udGFibGUtaGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMS41ZW07XG4gIG1hcmdpbjogMC41ZW0gMCAwLjc1ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC44O1xufVxuXG50YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG59XG5cbnRhYmxlIGNhcHRpb24ge1xuICBmb250LXNpemU6IDEuNWVtO1xuICBtYXJnaW46IDAuNWVtIDAgMC43NWVtO1xufVxuXG50YWJsZSB0ciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDAuMzVlbTtcbn1cblxudGFibGUgdGgsXG50YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDAuNjI1ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxudGFibGUgdGgge1xuICBmb250LXNpemU6IDAuODVlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMWVtO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLnRyYWNraW5nLWxpbmsge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4udHJhY2tpbmctbGluayBwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuLnRyYWNraW5nLWxpbmsgLmNvcHktbGluayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4udHJhY2tpbmctbGluayAuY29weS1saW5rIGlvbi1pY29uIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuLnRyYWNraW5nLWxpbmsgLmNvcHktbGluayBpb24tdGV4dCB7XG4gIG9wYWNpdHk6IDAuODtcbn1cblxuLnVybC1saW5rcyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuLnVybC1saW5rcyBpb24tYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLnJlY29tbWVuZGVkLWNvdXJpZXItdHh0IHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBtYXJnaW46IDIwcHggMDtcbn1cbi5yZWNvbW1lbmRlZC1jb3VyaWVyLXR4dCBzcGFuIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50cmFja2luZy1ldmVudHMge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG1heC13aWR0aDogMzAlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDIwcHggMDtcbn1cbi50cmFja2luZy1ldmVudHMgLmV2ZW50IHtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG4udHJhY2tpbmctZXZlbnRzIC5ldmVudDpub3QoOmxhc3QtY2hpbGQpIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG59XG4udHJhY2tpbmctZXZlbnRzIC5ldmVudCBwIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi50cmFja2luZy1ldmVudHMgLmV2ZW50IC50aW1lIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udHJhY2tpbmctZXZlbnRzIC5ldmVudCAubG9jYXRpb24ge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5kZWZhdWx0LWNvdXJpZXIge1xuICBmb250LXNpemU6IDE4cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgdGFibGUge1xuICAgIGJvcmRlcjogMDtcbiAgfVxuXG4gIHRhYmxlIGNhcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMS4zZW07XG4gIH1cblxuICB0YWJsZSB0aGVhZCB7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAtMXB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZzogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFweDtcbiAgfVxuXG4gIHRhYmxlIHRyIHtcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI2RkZDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tYm90dG9tOiAwLjYyNWVtO1xuICB9XG5cbiAgdGFibGUgdGQge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIH1cblxuICB0YWJsZSB0ZDo6YmVmb3JlIHtcbiAgICAvKlxuICAgICogYXJpYS1sYWJlbCBoYXMgbm8gYWR2YW50YWdlLCBpdCB3b24ndCBiZSByZWFkIGluc2lkZSBhIHRhYmxlXG4gICAgY29udGVudDogYXR0cihhcmlhLWxhYmVsKTtcbiAgICAqL1xuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxuXG4gIHRhYmxlIHRkOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IDA7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/manage-shipment/manage-shipment.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/manage-shipment/manage-shipment.page.ts ***!
  \***************************************************************/
/*! exports provided: ManageShipmentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageShipmentPage", function() { return ManageShipmentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var src_app_services_manage_shipment_manage_shipment_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/manage-shipment/manage-shipment.service */ "./src/app/services/manage-shipment/manage-shipment.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");











let ManageShipmentPage = class ManageShipmentPage {
    constructor(events, router, loadingController, alertController, sharedService, inAppBrowser, manageShipmentService, activatedRoute, vendorService, afs) {
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.sharedService = sharedService;
        this.inAppBrowser = inAppBrowser;
        this.manageShipmentService = manageShipmentService;
        this.activatedRoute = activatedRoute;
        this.vendorService = vendorService;
        this.afs = afs;
        this.currentStatus = "process_start";
        this.statusIndex = 1;
        this.couriers = [];
        this.recommendedCourierId = null;
        this.shipmentDetails = {};
        this.pickupLocations = [];
        this.awbData = {};
        this.pickupDetails = {};
        this.receiptsUrls = {};
        this.trackingDetails = {
            trackUrl: "",
        };
        this.pickupPincode = null;
        this.receiptTypes = ["manifest", "label", "invoice"];
        this.cancelCount = 0;
        this.customOrder = {
            length: null,
            breadth: null,
            height: null,
            weight: null,
        };
        this.integrations = [];
        this.pickupIdsForVendors = {};
        this.isVendorLogin = false;
        this.vendorAddress = {};
        this.orderId = parseInt(this.activatedRoute.snapshot.paramMap.get("order_id"));
        const vendorId = this.activatedRoute.snapshot.paramMap.get("vendor_id");
        if (vendorId) {
            this.isVendorLogin = true;
            this.currentVendorId = vendorId;
        }
        this.mainOrderId = this.orderId;
    }
    ngOnInit() { }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
            this.getAvailableIntegrations();
            // await this.presentLoading("Please Wait...");
            this.events.publish("manage-shipment:getOrderDetails", this.orderId);
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe("manage-shipment:getCustomOrderSuccess", (integrationOrder) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("integrationOrder:", integrationOrder);
            if (integrationOrder) {
                this.integrationOrder = integrationOrder;
                this.customOrder = integrationOrder.customOrder || this.customOrder;
                let projectId = src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].firebase.projectId || null;
                if (projectId && (projectId === 'bwi-bistarwale') && typeof this.customOrder === 'string') {
                    this.customOrder = JSON.parse(this.customOrder.replace('format=json&data=', ''));
                }
                this.currentStatus = integrationOrder.status || "process_start";
                this.shipmentDetails = integrationOrder.shipmentDetails || {};
                this.pickupDetails = integrationOrder.pickupDetails || {};
                this.receiptsUrls = integrationOrder.receipts || {};
                this.trackingDetails =
                    integrationOrder.trackingDetails || this.trackingDetails;
                this.awbData = integrationOrder.awb || {};
                this.cancelCount = integrationOrder.cancelCount || 0;
                //setting status index
                if (this.currentStatus === "order_created") {
                    this.statusIndex = 2;
                    this.events.publish("manage-shipment:checkCourierServiceability", integrationOrder, this.orderId);
                }
                else if (this.currentStatus === "courier_selected") {
                    this.statusIndex = 3;
                }
                else if (this.currentStatus === "receipts_generated") {
                    this.statusIndex = 4;
                }
                else {
                    this.statusIndex = 1;
                }
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        }));
        this.events.subscribe("manage-shipment:getOrderDetailsSuccess", (orderDetails, storeDoc, userDetails) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("orderDetails:", orderDetails);
            console.log("userDetails:", userDetails);
            this.orderDetails = orderDetails;
            this.userDetails = userDetails;
            this.storeDoc = storeDoc;
            this.manageShipmentService.integrationCode =
                this.isIntegrationCodeSaved()
                    ? this.orderDetails.externalIntegration.delivery.integrationCode
                    : "";
            // this.checkVendors();
            if (this.manageShipmentService.integrationCode) {
                this.getCustomOrder();
            }
            else {
                if (this.loading) {
                    this.loading.dismiss();
                }
            }
            if ('vendors' in this.orderDetails && this.orderDetails.vendors.length) {
                const vendorData = yield this.vendorService.getVendorDataWithId(this.orderDetails.vendors[0].id);
                this.setVendorPickupIdAndAddress(vendorData, this.orderDetails.vendors[0].id);
            }
        }));
        this.events.subscribe("manage-shipment:getAllPickupLocationsSuccess", (locations) => {
            console.log('this.pickupLocations', this.pickupLocations);
            this.pickupLocations = locations;
        });
        this.events.subscribe("manage-shipment:createCustomOrderSuccess", (data) => {
            console.log("custom order created");
            this.shipmentDetails = data.shipmentDetails;
            this.customOrder = data.customOrder;
            let projectId = src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].firebase.projectId || null;
            if (projectId && (projectId === 'bwi-bistarwale') && typeof data.customOrder === 'string') {
                this.customOrder = JSON.parse(data.customOrder.replace('format=json&data=', ''));
            }
            this.statusIndex = 2;
            this.sharedService.presentAlert(`Custom order has been created successfully in ${this.manageShipmentService.integrationCode}. Now please select courier.`);
            this.events.publish("manage-shipment:checkCourierServiceability", {
                shipmentDetails: this.shipmentDetails,
                customOrder: this.customOrder,
            }, this.orderId);
        });
        this.events.subscribe("manage-shipment:checkCourierServiceabilitySuccess", (data) => {
            this.loading.dismiss();
            this.couriers = data.couriers;
            this.recommendedCourierId = data.recommendedCourierId;
            if (data.shipmentDetails) {
                this.shipmentDetails = data.shipmentDetails;
                this.statusIndex = 3;
            }
            else {
                this.statusIndex = 2;
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        });
        this.events.subscribe("manage-shipment:selectCourierSuccess", (data) => {
            this.awbData = data.awb;
            this.shipmentDetails = data.shipmentDetails;
            this.statusIndex = 3;
            this.events.publish("manage-shipment:requestForShipmentPickup", this.shipmentDetails, this.orderId);
        });
        this.events.subscribe("manage-shipment:requestForShipmentPickupSuccess", (pickupDetails) => {
            this.pickupDetails = pickupDetails;
            this.events.publish("manage-shipment:generateReceipts", this.shipmentDetails, this.orderId);
        });
        this.events.subscribe("manage-shipment:generateReceiptsSuccess", (urls) => {
            this.receiptsUrls = urls;
            this.statusIndex = 4;
            this.loading.dismiss();
        });
        this.events.subscribe("manage-shipment:getTrackingDetailsSuccess", (trackingDetails) => {
            this.trackingDetails["trackUrl"] = trackingDetails.trackUrl || "";
            console.log("trackingDetails.trackEvents", trackingDetails.trackEvents);
            this.trackingDetails["trackEvents"] =
                trackingDetails.trackEvents || null;
            if (this.trackDetailsType === "url" && !trackingDetails.trackUrl) {
                this.sharedService.presentAlert("No tracking url available.");
            }
            if (this.trackDetailsType === "events" &&
                !trackingDetails.trackEvents) {
                this.sharedService.presentAlert("No tracking real time events available.");
            }
            this.loading.dismiss();
        });
        this.events.subscribe("manage-shipment:getTrackingDetailsFailure", (msg) => {
            this.sharedService.presentAlert(msg);
            this.loading.dismiss();
        });
        this.events.subscribe("manage-shipment:sendTrackLinkToUserSuccess", () => {
            this.sharedService.presentAlert("Tracking Link has been send succefully to user in chat as well as in order dispatch message");
            this.loading.dismiss();
        });
        this.events.subscribe("manage-shipment:cancelAndStartNewShipmentSuccess", () => {
            this.sharedService.presentAlert("Order cancelled successfully!");
            this.events.publish("manage-shipment:getCustomOrder", this.orderId);
        });
        this.events.subscribe("manage-shipment:apiFailure", (msg) => {
            msg =
                msg === "Token has expired"
                    ? `Login Session has been expired, Please Login from ${this.manageShipmentService.integrationCode} Settings again to continue`
                    : msg;
            this.sharedService.presentAlert(msg);
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }
    checkCourierServiceability() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading("Please wait...");
            this.events.publish("manage-shipment:checkCourierServiceability", { shipmentDetails: this.shipmentDetails, customOrder: this.customOrder }, this.orderId);
        });
    }
    getAvailableIntegrations() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.integrations =
                yield this.manageShipmentService.getAvailableIntegrations();
        });
    }
    onChangeIntegration(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.manageShipmentService.integrationCode = event.target.value;
            if (!this.isVendorsAvailable() || this.isVendorLogin) {
                this.getCustomOrder();
            }
        });
    }
    getCustomOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading("Please Wait...");
            this.pickupLocations =
                yield this.manageShipmentService.getAllPickupLocations();
            console.log('pl : ', this.pickupLocations, this.manageShipmentService.integrationCode);
            this.events.publish("manage-shipment:getCustomOrder", this.orderId);
        });
    }
    isIntegrationCodeSaved() {
        if (this.orderDetails &&
            this.orderDetails.externalIntegration &&
            this.orderDetails.externalIntegration.delivery.integrationCode) {
            return true;
        }
        else {
            return false;
        }
    }
    disableCreateOrderBtn() {
        if (!this.manageShipmentService.integrationCode) {
            return true;
        }
        else {
            return false;
        }
    }
    getMerchantId() {
        const fastBeetleRef = this.afs.collection('integrations').doc('delivery').collection('list').doc('fastbeetle').get();
        fastBeetleRef.forEach((doc) => {
            console.log('fastbeetle : ', doc.data().credentials);
            return doc.data().credentials.merchantId;
        });
    }
    createOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(JSON.stringify(this.customOrder));
            console.log("storeDoc :", this.storeDoc);
            const orderData = this.orderDetails;
            if (this.manageShipmentService.integrationCode === 'shyplite' || this.manageShipmentService.integrationCode === 'delhivery') {
                if (this.currentVendorId) {
                    // console.log('cvi : ', this.currentVendorId)
                    // console.log('pifv : ', this.pickupIdsForVendors)
                    if (this.pickupIdsForVendors[this.currentVendorId]) {
                        orderData.pickupAddressId = this.pickupIdsForVendors[this.currentVendorId];
                    }
                    else {
                        if (this.manageShipmentService.integrationCode !== 'delhivery') {
                            this.sharedService.presentAlert('Please save Pickup Id for this vendor in vendor settings');
                            return;
                        }
                    }
                }
            }
            yield this.presentLoading(`Creating order in ${this.manageShipmentService.integrationCode}...`);
            orderData.cancelCount = this.cancelCount;
            orderData.length = this.customOrder.length;
            orderData.breadth = this.customOrder.breadth;
            orderData.height = this.customOrder.height;
            orderData.weight = this.customOrder.weight;
            orderData.billingEmail = this.userDetails.email || this.storeDoc.storeEmail;
            orderData.storeDoc = this.storeDoc;
            orderData.pickup_postcode = this.storeDoc.storeAddress.pincode || 0;
            orderData.orderId = this.orderId;
            orderData.vendorData = this.vendorAddress;
            if (this.manageShipmentService.integrationCode === "shiprocket") {
                orderData.pickup_location = this.customOrder.pickup_location || "";
                orderData.pickup_postcode = +(this.getPickupPostcode(orderData.pickup_location) || 0);
            }
            if (this.manageShipmentService.integrationCode === "fastbeetle") {
                orderData.pickup_location = this.customOrder.pickup_location || "";
                // orderData.merchantId = (this.customOrder.merchantId && (this.customOrder.merchantId != undefined)) ? this.customOrder.merchantId : await this.getMerchantId()
                orderData.merchantId = this.getMerchantId();
                orderData.createdAt = firebase__WEBPACK_IMPORTED_MODULE_6__["firestore"].Timestamp.fromDate(new Date());
            }
            this.events.publish("manage-shipment:createCustomOrder", orderData, this.orderId);
        });
    }
    selectCourier(courierId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading("Creating Shipment...");
            this.shipmentDetails.courier_id = courierId;
            this.events.publish("manage-shipment:selectCourier", this.shipmentDetails, this.orderId);
        });
    }
    onChangePickupLocation(e) {
        const locationId = e.target.value;
        console.log("locationId", locationId);
        console.log('pickupLocation', this.pickupLocations);
        if (this.manageShipmentService.integrationCode === 'shiprocket') {
            const index = this.pickupLocations.findIndex((l) => l.id === locationId);
            this.customOrder["pickup_location"] = this.pickupLocations[index].pickup_location;
            this.pickupPincode = parseInt(this.pickupLocations[index].pin_code);
        }
        if (this.manageShipmentService.integrationCode === 'fastbeetle') {
            const index = this.pickupLocations.findIndex((l) => l.profileName === locationId);
            this.customOrder["pickup_location"] = this.pickupLocations[index].profileName;
            this.customOrder["merchantId"] = this.pickupLocations[index].merchant;
        }
    }
    downloadUrl(type) {
        let url = "";
        url = this.receiptsUrls[type] || "";
        if (!url) {
            this.sharedService.presentAlert(`There is some problem in downloading url of ${type}.Please try again later.`);
        }
        else {
            const browser = this.inAppBrowser.create(url, "_system");
        }
    }
    showToast() {
        this.sharedService.presentAlert("Tracking Link Copied!");
    }
    presentLoading(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: 10000,
                spinner: "bubbles",
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg, btnTxt, page) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                backdropDismiss: false,
                buttons: [
                    {
                        text: btnTxt,
                        handler: () => {
                            this.router.navigate([page]);
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    getTrackingDetails(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.trackDetailsType = type;
            yield this.presentLoading("Please Wait...");
            this.events.publish("manage-shipment:getTrackingDetails", this.shipmentDetails, this.orderId);
        });
    }
    generateUrl(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading(`Generating ${type}...`);
            if (type === "manifest") {
                const manifest = yield this.manageShipmentService.generateManifest(this.shipmentDetails, this.orderId);
                this.loading.dismiss();
                if (manifest) {
                    this.receiptsUrls["manifest"] = manifest;
                }
                else {
                    this.sharedService.presentAlert("There is some problem in generating Manifest. Please try again later.");
                }
            }
            if (type === "label") {
                const label = yield this.manageShipmentService.generateLabel(this.shipmentDetails, this.orderId);
                this.loading.dismiss();
                if (label) {
                    this.receiptsUrls["label"] = label;
                }
                else {
                    this.sharedService.presentAlert("There is some problem in generating Label. Please try again later.");
                }
            }
            if (type === "invoice") {
                const invoice = yield this.manageShipmentService.generateInvoice(this.shipmentDetails, this.orderId);
                this.loading.dismiss();
                if (invoice) {
                    this.receiptsUrls["invoice"] = invoice;
                }
                else {
                    this.sharedService.presentAlert("There is some problem in generating Invoice. Please try again later.");
                }
            }
        });
    }
    cancleOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading(`Cancelling order in ${this.manageShipmentService.integrationCode}...`);
            this.events.publish("manage-shipment:cancelAndStartNewShipment", this.shipmentDetails, this.orderId);
        });
    }
    presentAlertConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: "Confirm!",
                message: `Are you sure you want to cancel and start new shipment in ${this.manageShipmentService.integrationCode}`,
                buttons: [
                    {
                        text: "No",
                        role: "cancel",
                        cssClass: "secondary",
                    },
                    {
                        text: "Yes",
                        handler: () => {
                            this.cancleOrder();
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    sendTrackingLink() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading("Sending tracking link to user...");
            this.events.publish("manage-shipment:sendTrackLinkToUser", this.trackingDetails.trackUrl, this.orderId);
        });
    }
    getSelectedLocation() {
        if (this.pickupLocations.length && this.customOrder["pickup_location"]) {
            console.log('this.pickupLocations', this.pickupLocations);
            const index = this.pickupLocations.findIndex((l) => l.pickup_location === this.customOrder["pickup_location"]);
            if (index !== -1) {
                console.log('this.pickupLocations[index].id', this.pickupLocations[index].id);
                return this.pickupLocations[index].id;
            }
        }
    }
    getCourierName() {
        console.log("this.couriers", this.couriers);
        const courier = this.couriers.find((c) => c.courier_company_id === this.orderDetails.deliveryGstObj.courierId);
        if (courier && Object.keys(courier).length) {
            return courier.courier_name;
        }
        else {
            return null;
        }
    }
    getProductPrice(product) {
        if ("pack" in product && product.pack.variantType === "pieces") {
            return product.pack.price;
        }
        else {
            return product.price;
        }
    }
    getPickupPostcode(pickupLocation) {
        const index = this.pickupLocations.findIndex((l) => l.pickup_location === pickupLocation);
        return this.pickupLocations[index].pin_code;
    }
    // checkVendors() {
    //   if('vendors' in this.orderDetails && this.orderDetails.vendors.length) {
    //     this.setOrderIdForVendor(this.orderDetails.vendors[0].id);
    //   }
    // }
    onChangeVendor(event) {
        this.setOrderIdForVendor(event.target.value);
    }
    setVendorPickupIdAndAddress(vendorData, vendorId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('vendorData pass-on : ', vendorData);
            const pickupId = 'deliveryIntegration' in vendorData ? vendorData.deliveryIntegration.pickupId : '';
            this.pickupIdsForVendors[vendorId] = pickupId;
            this.vendorAddress = vendorData;
        });
    }
    setOrderIdForVendor(vendorId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.currentVendorId = vendorId;
            if (!(vendorId in this.pickupIdsForVendors)) {
                const vendorData = yield this.vendorService.getVendorDataWithId(vendorId);
                if (vendorData) {
                    // console.log('vendorData : ', vendorData);
                    // const pickupId = 'deliveryIntegration' in vendorData ? vendorData.deliveryIntegration.pickupId : '';
                    // this.pickupIdsForVendors[vendorId] = pickupId;
                    // this.vendorAddress = vendorData;
                    this.setVendorPickupIdAndAddress(vendorData, vendorId);
                }
            }
            const vendorProducts = this.orderDetails.vendors.find(v => v.id === vendorId).products;
            this.orderId = `${this.mainOrderId}-${vendorId}`;
            this.setVendorProducts(vendorProducts);
            this.getCustomOrder();
        });
    }
    setVendorProducts(vendorProducts) {
        let products = [];
        for (const vendorProduct of vendorProducts) {
            this.orderDetails.products.map((product, index) => {
                if (product.productId === vendorProduct.id) {
                    if ('pack' in product) {
                        if (product.pack.weight === vendorProduct.pack.weight) {
                            products.push(Object.assign({ index }, product));
                        }
                    }
                    else {
                        products.push(Object.assign({ index }, product));
                    }
                }
            });
        }
        this.orderDetails.products = [...products];
    }
    isVendorsAvailable() {
        return 'vendors' in this.orderDetails && this.orderDetails.vendors.length;
    }
    removeSubscriptions() {
        this.events.unsubscribe("manage-shipment:getOrderDetailsSuccess");
        this.events.unsubscribe("manage-shipment:getCustomOrderSuccess");
        this.events.unsubscribe("manage-shipment:createCustomOrderSuccess");
        this.events.unsubscribe("manage-shipment:userNotAuthenticated");
        this.events.unsubscribe("manage-shipment:getAllPickupLocationsSuccess");
        this.events.unsubscribe("manage-shipment:checkCourierServiceabilitySuccess");
        this.events.unsubscribe("manage-shipment:selectCourierSuccess");
        this.events.unsubscribe("manage-shipment:requestForShipmentPickupSuccess");
        this.events.unsubscribe("manage-shipment:generateReceiptsSuccess");
        this.events.unsubscribe("manage-shipment:getTrackingDetailsSuccess");
        this.events.unsubscribe("manage-shipment:getTrackingDetailsFailure");
        this.events.unsubscribe("manage-shipment:userAuthenticated");
        this.events.unsubscribe("manage-shipment:sendTrackLinkToUserSuccess");
        this.events.unsubscribe("manage-shipment:apiFailure");
        this.events.unsubscribe("manage-shipment:cancelAndStartNewShipmentSuccess");
    }
};
ManageShipmentPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_7__["InAppBrowser"] },
    { type: src_app_services_manage_shipment_manage_shipment_service__WEBPACK_IMPORTED_MODULE_8__["ManageShipmentService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"] }
];
ManageShipmentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-manage-shipment",
        template: __webpack_require__(/*! raw-loader!./manage-shipment.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/manage-shipment/manage-shipment.page.html"),
        styles: [__webpack_require__(/*! ./manage-shipment.page.scss */ "./src/app/admin/manage-shipment/manage-shipment.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
        _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_7__["InAppBrowser"],
        src_app_services_manage_shipment_manage_shipment_service__WEBPACK_IMPORTED_MODULE_8__["ManageShipmentService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"]])
], ManageShipmentPage);



/***/ })

}]);
//# sourceMappingURL=admin-manage-shipment-manage-shipment-module-es2015.js.map