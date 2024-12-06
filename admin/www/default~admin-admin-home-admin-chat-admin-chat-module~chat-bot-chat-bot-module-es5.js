(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-admin-home-admin-chat-admin-chat-module~chat-bot-chat-bot-module"],{

/***/ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngx-autosize/fesm5/ngx-autosize.js ***!
  \*********************************************************/
/*! exports provided: AutosizeDirective, AutosizeModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutosizeDirective", function() { return AutosizeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutosizeModule", function() { return AutosizeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return WindowRef; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: /**
         * @return {?}
         */
        function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    WindowRef.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return WindowRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAX_LOOKUP_RETRIES = 3;
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element, _window, _zone) {
        this.element = element;
        this._window = _window;
        this._zone = _zone;
        this.onlyGrow = false;
        this.useImportant = false;
        this.resized = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.autosize = true;
        this.retries = 0;
        this._destroyed = false;
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        }
        else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style['overflow-y'] = 'hidden';
            this._onTextAreaFound();
        }
    }
    Object.defineProperty(AutosizeDirective.prototype, "minRows", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minRows = value;
            if (this.textAreaEl) {
                this.textAreaEl.rows = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AutosizeDirective.prototype, "_autosize", {
        set: /**
         * @param {?} autosize
         * @return {?}
         */
        function (autosize) {
            this.autosize = typeof autosize === 'boolean'
                ? autosize
                : true;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @param {?} textArea
     * @return {?}
     */
    AutosizeDirective.prototype.onInput = /**
     * @param {?} textArea
     * @return {?}
     */
    function (textArea) {
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed = true;
        if (this._windowResizeHandler) {
            this._window.nativeWindow.removeEventListener('resize', this._windowResizeHandler, false);
        }
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.adjust();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AutosizeDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.adjust(true);
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._findNestedTextArea = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');
        if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
            this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
        }
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('ngx-autosize: textarea not found');
            }
            else {
                this.retries++;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._findNestedTextArea();
                }), 100);
            }
            return;
        }
        this.textAreaEl.style['overflow-y'] = 'hidden';
        this._onTextAreaFound();
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._onTextAreaFound = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._addWindowResizeHandler();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.adjust();
        }));
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._addWindowResizeHandler = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._windowResizeHandler = Debounce((/**
         * @return {?}
         */
        function () {
            _this._zone.run((/**
             * @return {?}
             */
            function () {
                _this.adjust();
            }));
        }), 200);
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this._window.nativeWindow.addEventListener('resize', _this._windowResizeHandler, false);
        }));
    };
    /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    AutosizeDirective.prototype.adjust = /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    function (inputsChanged) {
        if (inputsChanged === void 0) { inputsChanged = false; }
        if (this.autosize && !this._destroyed && this.textAreaEl && this.textAreaEl.parentNode) {
            /** @type {?} */
            var currentText = this.textAreaEl.value;
            if (inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth) {
                return;
            }
            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;
            /** @type {?} */
            var clone = this.textAreaEl.cloneNode(true);
            /** @type {?} */
            var parent_1 = this.textAreaEl.parentNode;
            clone.style.width = this.textAreaEl.offsetWidth + 'px';
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.textContent = currentText;
            parent_1.appendChild(clone);
            clone.style['overflow-y'] = 'hidden';
            clone.style.height = 'auto';
            /** @type {?} */
            var height = clone.scrollHeight;
            // add into height top and bottom borders' width
            /** @type {?} */
            var computedStyle = this._window.nativeWindow.getComputedStyle(clone, null);
            height += parseInt(computedStyle.getPropertyValue('border-top-width'));
            height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));
            // add into height top and bottom paddings width
            height += parseInt(computedStyle.getPropertyValue('padding-top'));
            height += parseInt(computedStyle.getPropertyValue('padding-bottom'));
            /** @type {?} */
            var oldHeight = this.textAreaEl.offsetHeight;
            /** @type {?} */
            var willGrow = height > oldHeight;
            if (this.onlyGrow === false || willGrow) {
                /** @type {?} */
                var lineHeight = this._getLineHeight();
                /** @type {?} */
                var rowsCount = height / lineHeight;
                if (this._minRows && this._minRows >= rowsCount) {
                    height = this._minRows * lineHeight;
                }
                else if (this.maxRows && this.maxRows <= rowsCount) {
                    // never shrink the textarea if onlyGrow is true
                    /** @type {?} */
                    var maxHeight = this.maxRows * lineHeight;
                    height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
                    this.textAreaEl.style['overflow-y'] = 'auto';
                }
                else {
                    this.textAreaEl.style['overflow-y'] = 'hidden';
                }
                /** @type {?} */
                var heightStyle = height + 'px';
                /** @type {?} */
                var important = this.useImportant ? 'important' : '';
                this.textAreaEl.style.setProperty('height', heightStyle, important);
                this.resized.emit(height);
            }
            parent_1.removeChild(clone);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AutosizeDirective.prototype._getLineHeight = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && this._window.nativeWindow.getComputedStyle) {
            /** @type {?} */
            var styles = this._window.nativeWindow.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }
        if (isNaN(lineHeight)) {
            /** @type {?} */
            var fontSize = this._window.nativeWindow.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }
        return lineHeight;
    };
    AutosizeDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[autosize]'
                },] }
    ];
    /** @nocollapse */
    AutosizeDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: WindowRef },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    AutosizeDirective.propDecorators = {
        minRows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        _autosize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['autosize',] }],
        maxRows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onlyGrow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        useImportant: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        resized: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['input', ['$event.target'],] }]
    };
    return AutosizeDirective;
}());
if (false) {}
/**
 * @param {?} func
 * @param {?} wait
 * @param {?=} immediate
 * @return {?}
 */
function Debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    /** @type {?} */
    var timeout;
    return (/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var context = this;
        /** @type {?} */
        var args = arguments;
        /** @type {?} */
        var later = (/**
         * @return {?}
         */
        function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        });
        /** @type {?} */
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutosizeModule = /** @class */ (function () {
    function AutosizeModule() {
    }
    AutosizeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [AutosizeDirective],
                    imports: [],
                    providers: [
                        WindowRef
                    ],
                    exports: [AutosizeDirective]
                },] }
    ];
    return AutosizeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-autosize.js.map


/***/ }),

/***/ "./src/app/pipes/application-pipes.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pipes/application-pipes.module.ts ***!
  \***************************************************/
/*! exports provided: ApplicationPipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationPipesModule", function() { return ApplicationPipesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-ago.pipe */ "./src/app/pipes/date-ago.pipe.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe-item.pipe */ "./src/app/pipes/safe-item.pipe.ts");




var ApplicationPipesModule = /** @class */ (function () {
    function ApplicationPipesModule() {
    }
    ApplicationPipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [],
            declarations: [
                _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
                _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
            ],
            exports: [
                _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
                _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
            ]
        })
    ], ApplicationPipesModule);
    return ApplicationPipesModule;
}());



/***/ }),

/***/ "./src/app/pipes/date-ago.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/date-ago.pipe.ts ***!
  \****************************************/
/*! exports provided: DateAgoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateAgoPipe", function() { return DateAgoPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DateAgoPipe = /** @class */ (function () {
    function DateAgoPipe() {
    }
    DateAgoPipe.prototype.transform = function (value, args) {
        if (value) {
            var seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            var intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            var counter = void 0;
            for (var i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    };
    DateAgoPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'dateAgo',
            pure: true
        })
    ], DateAgoPipe);
    return DateAgoPipe;
}());



/***/ }),

/***/ "./src/app/pipes/safe-item.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/safe-item.pipe.ts ***!
  \*****************************************/
/*! exports provided: SafeItemPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeItemPipe", function() { return SafeItemPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SafeItemPipe = /** @class */ (function () {
    function SafeItemPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeItemPipe.prototype.transform = function (value, type) {
        if (!value)
            return value;
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error("Invalid safe type specified: " + type);
        }
    };
    SafeItemPipe.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
    ]; };
    SafeItemPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'safeItem'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SafeItemPipe);
    return SafeItemPipe;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-admin-home-admin-chat-admin-chat-module~chat-bot-chat-bot-module-es5.js.map