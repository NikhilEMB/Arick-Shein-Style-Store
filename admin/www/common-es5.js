(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic-super-tabs/core/dist/esm-es5/utils-5174e079.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ionic-super-tabs/core/dist/esm-es5/utils-5174e079.js ***!
  \****************************************************************************/
/*! exports provided: D, a, b, c, d, g, p, s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return DEFAULT_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNormalizedScrollX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getTs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkGesture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return debugLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getScrollX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return pointerCoord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return scrollEl; });
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var DEFAULT_CONFIG = {
    dragThreshold: 10,
    allowElementScroll: false,
    maxDragAngle: 40,
    sideMenuThreshold: 50,
    transitionDuration: 300,
    shortSwipeDuration: 300,
    debug: false,
    avoidElements: false,
};
function pointerCoord(ev) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            var touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
}
var getTs = function () { return window.performance && window.performance.now ? window.performance.now() : Date.now(); };
var easeInOutCubic = function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; };
function getScrollCoord(start, dest, startTime, currentTime, duration) {
    var time = Math.min(1, (currentTime - startTime) / duration);
    var timeFn = easeInOutCubic(time);
    return Math.ceil((timeFn * (dest - start)) + start);
}
function scroll(el, startX, startY, x, y, startTime, duration) {
    var currentTime = getTs();
    var scrollX = startX === x ? x : getScrollCoord(startX, x, startTime, currentTime, duration);
    var scrollY = startY === y ? y : getScrollCoord(startY, y, startTime, currentTime, duration);
    el.scrollTo(scrollX, scrollY);
    if (currentTime - startTime >= duration) {
        return;
    }
    requestAnimationFrame(function () {
        scroll(el, startX, startY, x, y, startTime, duration);
    });
}
var scrollEl = function (el, x, y, duration) {
    if (duration === void 0) { duration = 300; }
    if (duration <= 0) {
        requestAnimationFrame(function () {
            el.scrollTo(x, y);
        });
        return;
    }
    requestAnimationFrame(function () {
        var startX = el.scrollLeft;
        var startY = el.scrollTop;
        var now = getTs();
        scroll(el, startX, startY, x, y, now, duration);
    });
};
function checkGesture(newCoords, initialCoords, config) {
    if (!initialCoords) {
        return false;
    }
    var radians = config.maxDragAngle * (Math.PI / 180);
    var maxCosine = Math.cos(radians);
    var deltaX = newCoords.x - initialCoords.x;
    var deltaY = newCoords.y - initialCoords.y;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance >= config.dragThreshold) {
        // swipe is long enough
        // lets check the angle
        var angle = Math.atan2(deltaY, deltaX);
        var cosine = Math.cos(angle);
        return Math.abs(cosine) > maxCosine;
    }
    return false;
}
function getScrollX(el, delta) {
    return el.scrollLeft + (typeof delta === 'number' ? delta : 0);
}
function getNormalizedScrollX(el, delta) {
    var minX = 0;
    var maxX = el.scrollWidth - el.clientWidth;
    var scrollX = getScrollX(el, delta);
    scrollX = Math.max(minX, Math.min(maxX, scrollX));
    return scrollX;
}
var debugStyle1 = 'background: linear-gradient(135deg,#4150b2,#f71947); border: 1px solid #9a9a9a; color: #ffffff; border-bottom-left-radius: 2px; border-top-left-radius: 2px; padding: 2px 0 2px 4px;';
var debugStyle2 = 'background: #252b3e; border: 1px solid #9a9a9a; border-top-right-radius: 2px; border-bottom-right-radius: 2px; margin-left: -2px; padding: 2px 4px; color: white;';
function debugLog(config, tag, vals) {
    if (!config || !config.debug) {
        return;
    }
    // Some gorgeous logging, because apparently I have lots of free time to style console logs and write this comment
    console.log.apply(console, __spreadArrays(["%csuper-tabs %c%s", debugStyle1, debugStyle2, ' '.repeat(10 - tag.length) + tag], vals));
}



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js ***!
  \************************************************************************/
/*! exports provided: P, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getTimeGivenProgression; });
/**
 * Based on:
 * https://stackoverflow.com/questions/7348009/y-coordinate-for-a-given-x-cubic-bezier
 * https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
 * TODO: Reduce rounding error
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
/**
 * Given a cubic-bezier curve, get the x value (time) given
 * the y value (progression).
 * Ex: cubic-bezier(0.32, 0.72, 0, 1);
 * P0: (0, 0)
 * P1: (0.32, 0.72)
 * P2: (0, 1)
 * P3: (1, 1)
 *
 * If you give a cubic bezier curve that never reaches the
 * provided progression, this function will return NaN.
 */
var getTimeGivenProgression = function (p0, p1, p2, p3, progression) {
    var tValues = solveCubicBezier(p0.y, p1.y, p2.y, p3.y, progression);
    return solveCubicParametricEquation(p0.x, p1.x, p2.x, p3.x, tValues[0]); // TODO: Add better strategy for dealing with multiple solutions
};
/**
 * Solve a cubic equation in one dimension (time)
 */
var solveCubicParametricEquation = function (p0, p1, p2, p3, t) {
    var partA = (3 * p1) * Math.pow(t - 1, 2);
    var partB = (-3 * p2 * t) + (3 * p2) + (p3 * t);
    var partC = p0 * Math.pow(t - 1, 3);
    return t * (partA + (t * partB)) - partC;
};
/**
 * Find the `t` value for a cubic bezier using Cardano's formula
 */
var solveCubicBezier = function (p0, p1, p2, p3, refPoint) {
    p0 -= refPoint;
    p1 -= refPoint;
    p2 -= refPoint;
    p3 -= refPoint;
    var roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
    return roots.filter(function (root) { return root >= 0 && root <= 1; });
};
var solveQuadraticEquation = function (a, b, c) {
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    else {
        return [
            (-b + Math.sqrt(discriminant)) / (2 * a),
            (-b - Math.sqrt(discriminant)) / (2 * a)
        ];
    }
};
var solveCubicEquation = function (a, b, c, d) {
    if (a === 0) {
        return solveQuadraticEquation(b, c, d);
    }
    b /= a;
    c /= a;
    d /= a;
    var p = (3 * c - b * b) / 3;
    var q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
    }
    else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
    }
    var discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 2) - b / 3];
    }
    else if (discriminant > 0) {
        return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow((q / 2) + Math.sqrt(discriminant), 1 / 3) - b / 3];
    }
    var r = Math.sqrt(Math.pow(-(p / 3), 3));
    var phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
    var s = 2 * Math.pow(r, 1 / 3);
    return [
        s * Math.cos(phi / 3) - b / 3,
        s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
        s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
    ];
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js ***!
  \******************************************************************/
/*! exports provided: a, b, c, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelection; });
/**
 * Check to see if the Haptic Plugin is available
 * @return Returns `true` or false if the plugin is available
 */
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
var hapticSelection = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
var hapticSelectionStart = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
var hapticSelectionChanged = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
var hapticSelectionEnd = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js ***!
  \*****************************************************************/
/*! exports provided: s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeDOMString; });
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
var sanitizeDOMString = function (untrustedString) {
    try {
        if (typeof untrustedString !== 'string' || untrustedString === '') {
            return untrustedString;
        }
        /**
         * Create a document fragment
         * separate from the main DOM,
         * create a div to do our work in
         */
        var documentFragment_1 = document.createDocumentFragment();
        var workingDiv = document.createElement('div');
        documentFragment_1.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        /**
         * Remove any elements
         * that are blocked
         */
        blockedTags.forEach(function (blockedTag) {
            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);
            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
                var element = getElementsToRemove[elementIndex];
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                else {
                    documentFragment_1.removeChild(element);
                }
                /**
                 * We still need to sanitize
                 * the children of this element
                 * as they are left behind
                 */
                var childElements = getElementChildren(element);
                /* tslint:disable-next-line */
                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {
                    sanitizeElement(childElements[childIndex]);
                }
            }
        });
        /**
         * Go through remaining elements and remove
         * non-allowed attribs
         */
        // IE does not support .children on document fragments, only .childNodes
        var dfChildren = getElementChildren(documentFragment_1);
        /* tslint:disable-next-line */
        for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {
            sanitizeElement(dfChildren[childIndex]);
        }
        // Append document fragment to div
        var fragmentDiv = document.createElement('div');
        fragmentDiv.appendChild(documentFragment_1);
        // First child is always the div we did our work in
        var getInnerDiv = fragmentDiv.querySelector('div');
        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
    }
    catch (err) {
        console.error(err);
        return '';
    }
};
/**
 * Clean up current element based on allowed attributes
 * and then recursively dig down into any child elements to
 * clean those up as well
 */
var sanitizeElement = function (element) {
    // IE uses childNodes, so ignore nodes that are not elements
    if (element.nodeType && element.nodeType !== 1) {
        return;
    }
    for (var i = element.attributes.length - 1; i >= 0; i--) {
        var attribute = element.attributes.item(i);
        var attributeName = attribute.name;
        // remove non-allowed attribs
        if (!allowedAttributes.includes(attributeName.toLowerCase())) {
            element.removeAttribute(attributeName);
            continue;
        }
        // clean up any allowed attribs
        // that attempt to do any JS funny-business
        var attributeValue = attribute.value;
        /* tslint:disable-next-line */
        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
            element.removeAttribute(attributeName);
        }
    }
    /**
     * Sanitize any nested children
     */
    var childElements = getElementChildren(element);
    /* tslint:disable-next-line */
    for (var i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i]);
    }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */
var getElementChildren = function (el) {
    return (el.children != null) ? el.children : el.childNodes;
};
var allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
var blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js ***!
  \*****************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var hostContext = function (selector, el) {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
var createColorClasses = function (color) {
    var _a;
    return (typeof color === 'string' && color.length > 0) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : undefined;
};
var getClassList = function (classes) {
    if (classes !== undefined) {
        var array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(function (c) { return c != null; })
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c !== ''; });
    }
    return [];
};
var getClassMap = function (classes) {
    var map = {};
    getClassList(classes).forEach(function (c) { return map[c] = true; });
    return map;
};
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL = function (url, ev, direction) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var router;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
            router = document.querySelector('ion-router');
            if (router) {
                if (ev != null) {
                    ev.preventDefault();
                }
                return [2 /*return*/, router.push(url, direction)];
            }
        }
        return [2 /*return*/, false];
    });
}); };



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js ***!
  \*************************************************************************/
/*! exports provided: f, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findCheckedOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return watchForOptions; });
var watchForOptions = function (containerEl, tagName, onChange) {
    var mutation = new MutationObserver(function (mutationList) {
        onChange(getSelectedOption(mutationList, tagName));
    });
    mutation.observe(containerEl, {
        childList: true,
        subtree: true
    });
    return mutation;
};
var getSelectedOption = function (mutationList, tagName) {
    var newOption;
    mutationList.forEach(function (mut) {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < mut.addedNodes.length; i++) {
            newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
        }
    });
    return newOption;
};
var findCheckedOption = function (el, tagName) {
    if (el.nodeType !== 1) {
        return undefined;
    }
    var options = (el.tagName === tagName.toUpperCase())
        ? [el]
        : Array.from(el.querySelectorAll(tagName));
    return options.find(function (o) { return o.checked === true; });
};



/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/feedback-details/feedback-details.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/feedback-details/feedback-details.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"all-feedbacks\" class=\"custom-back-button\" (click)=\"dismissModal()\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Feedback</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <h6><strong>Description:</strong></h6>\r\n  <div class=\"fd-desc\">\r\n    {{this.desc}}\r\n  </div>\r\n\r\n  <div *ngIf=\"images.length;\">\r\n    <h6><strong>Images:</strong></h6>\r\n    <ion-slides pager=\"true\" [options]=\"feedSlideOpts\" loop=\"true\" class=\"fd-images-wrapper\">\r\n      <ion-slide *ngFor=\"let img of images; let i = index;\" (click)=\"imageZoom(images, i)\">\r\n        <div *ngIf=\"img.mob\" class=\"fd-images\"\r\n          [ngStyle]=\"{'background': 'url(' + img.mob + ') no-repeat center', 'background-size': 'contain'}\"></div>\r\n        <div *ngIf=\"!img.mob && img.url\" class=\"offer-images\"\r\n          [ngStyle]=\"{'background': 'url(' + img.url + ') no-repeat center', 'background-size': 'contain'}\"></div>\r\n      </ion-slide>\r\n    </ion-slides>\r\n  </div>\r\n\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/feedback-details/feedback-details.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/feedback-details/feedback-details.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fd-images {\n  background: transparent url('img-preloader.png') center no-repeat;\n  min-height: 25vh;\n  width: 100%;\n}\n\n.fd-desc {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  margin-top: 15px;\n  margin-bottom: 10%;\n  padding: 12px;\n  text-align: justify;\n  font-size: 14px;\n}\n\n.fd-images-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZmVlZGJhY2stZGV0YWlscy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGZlZWRiYWNrLWRldGFpbHNcXGZlZWRiYWNrLWRldGFpbHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9mZWVkYmFjay1kZXRhaWxzL2ZlZWRiYWNrLWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUVBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vZmVlZGJhY2stZGV0YWlscy9mZWVkYmFjay1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mZC1pbWFnZXMge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIG1pbi1oZWlnaHQ6IDI1dmg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmZkLWRlc2Mge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmZkLWltYWdlcy13cmFwcGVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn0iLCIuZmQtaW1hZ2VzIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICBtaW4taGVpZ2h0OiAyNXZoO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmZkLWRlc2Mge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDEwJTtcbiAgcGFkZGluZzogMTJweDtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uZmQtaW1hZ2VzLXdyYXBwZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/feedback-details/feedback-details.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/feedback-details/feedback-details.page.ts ***!
  \*****************************************************************/
/*! exports provided: FeedbackDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackDetailsPage", function() { return FeedbackDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");




var FeedbackDetailsPage = /** @class */ (function () {
    function FeedbackDetailsPage(modalController) {
        this.modalController = modalController;
        this.desc = '';
        this.images = [];
        this.feedSlideOpts = {
            initialSlide: 0,
            speed: 400,
        };
    }
    FeedbackDetailsPage.prototype.ngOnInit = function () {
        console.log(this.desc);
        console.log(this.images);
    };
    FeedbackDetailsPage.prototype.imageZoom = function (images, index) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_2__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: images,
                index: index
            }
        }).then(function (modal) { return modal.present(); });
    };
    FeedbackDetailsPage.prototype.dismissModal = function () {
        this.modalController.dismiss();
    };
    FeedbackDetailsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
    ]; };
    FeedbackDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-feedback-details',
            template: __webpack_require__(/*! raw-loader!./feedback-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/feedback-details/feedback-details.page.html"),
            styles: [__webpack_require__(/*! ./feedback-details.page.scss */ "./src/app/admin/feedback-details/feedback-details.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
    ], FeedbackDetailsPage);
    return FeedbackDetailsPage;
}());



/***/ }),

/***/ "./src/app/directives/application-directives.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/directives/application-directives.module.ts ***!
  \*************************************************************/
/*! exports provided: ApplicationDirectivesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationDirectivesModule", function() { return ApplicationDirectivesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _img_placeholder_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img-placeholder.directive */ "./src/app/directives/img-placeholder.directive.ts");
/* harmony import */ var _dropzone_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropzone.directive */ "./src/app/directives/dropzone.directive.ts");




var ApplicationDirectivesModule = /** @class */ (function () {
    function ApplicationDirectivesModule() {
    }
    ApplicationDirectivesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [],
            declarations: [
                _img_placeholder_directive__WEBPACK_IMPORTED_MODULE_2__["ImagePreloader"],
                _dropzone_directive__WEBPACK_IMPORTED_MODULE_3__["DropzoneDirective"]
            ],
            exports: [
                _img_placeholder_directive__WEBPACK_IMPORTED_MODULE_2__["ImagePreloader"],
                _dropzone_directive__WEBPACK_IMPORTED_MODULE_3__["DropzoneDirective"]
            ]
        })
    ], ApplicationDirectivesModule);
    return ApplicationDirectivesModule;
}());



/***/ }),

/***/ "./src/app/directives/dropzone.directive.ts":
/*!**************************************************!*\
  !*** ./src/app/directives/dropzone.directive.ts ***!
  \**************************************************/
/*! exports provided: DropzoneDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropzoneDirective", function() { return DropzoneDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DropzoneDirective = /** @class */ (function () {
    function DropzoneDirective() {
        this.dropped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.hovered = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    DropzoneDirective.prototype.onDrop = function ($event) {
        $event.preventDefault();
        this.dropped.emit($event.dataTransfer.files);
        this.hovered.emit(false);
    };
    DropzoneDirective.prototype.onDragOver = function ($event) {
        $event.preventDefault();
        this.hovered.emit(true);
    };
    DropzoneDirective.prototype.onDragLeave = function ($event) {
        $event.preventDefault();
        this.hovered.emit(false);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DropzoneDirective.prototype, "dropped", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DropzoneDirective.prototype, "hovered", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('drop', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], DropzoneDirective.prototype, "onDrop", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('dragover', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], DropzoneDirective.prototype, "onDragOver", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('dragleave', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], DropzoneDirective.prototype, "onDragLeave", null);
    DropzoneDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appDropzone]'
        })
    ], DropzoneDirective);
    return DropzoneDirective;
}());



/***/ }),

/***/ "./src/app/directives/img-placeholder.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/img-placeholder.directive.ts ***!
  \*********************************************************/
/*! exports provided: ImagePreloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePreloader", function() { return ImagePreloader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

// An image directive based on http://blog.teamtreehouse.com/learn-asynchronous-image-loading-javascript

// Define the Directive meta data
var ImagePreloader = /** @class */ (function () {
    function ImagePreloader() {
        // Set an input so the directive can set a default image.
        this.defaultImage = 'assets/img/img-preloader.png';
    }
    //ngOnInit is needed to access the @inputs() variables. these aren't available on constructor()
    ImagePreloader.prototype.ngOnInit = function () {
        var _this = this;
        //First set the final image to some default image while we prepare our preloader:
        this.finalImage = this.defaultImage;
        this.downloadingImage = new Image(); // create image object
        this.downloadingImage.onload = function () {
            _this.finalImage = _this.targetSource; //do the switch 😀
        };
        // Assign the src to that of some_remote_image_url. Since its an Image Object the
        // on assignment from this.targetSource download would start immediately in the background
        // and trigger the onload()
        this.downloadingImage.src = this.targetSource;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('img-preloader'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ImagePreloader.prototype, "targetSource", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ImagePreloader.prototype, "defaultImage", void 0);
    ImagePreloader = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[img-preloader]',
            host: {
                '[attr.src]': 'finalImage' //the attribute of the host element we want to update. in this case, <img 'src' />
            }
        })
        //Class must implement OnInit for @Input()
    ], ImagePreloader);
    return ImagePreloader;
}());



/***/ }),

/***/ "./src/app/services/attributes/attributes.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/services/attributes/attributes.service.ts ***!
  \***********************************************************/
/*! exports provided: AttributesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributesService", function() { return AttributesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var AttributesService = /** @class */ (function () {
    function AttributesService(afs) {
        this.afs = afs;
    }
    AttributesService.prototype.setProductAttributes = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.warn(data);
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var docRef;
                        var _this = this;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            docRef = this.afs.collection('attributes').doc('product');
                            docRef.get().toPromise().then(function (doc) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    if (doc.exists) {
                                        console.log('exists');
                                        docRef.update(data);
                                        resolve(data);
                                    }
                                    else {
                                        console.log('not exists');
                                        docRef.set(data);
                                        resolve(data);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }).catch(function (error) {
                                console.error('your error', error);
                                reject(data);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    AttributesService.prototype.getProductAttributes = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var data, getDocRef;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getDocRef = this.afs.collection('attributes').doc('product');
                                    return [4 /*yield*/, getDocRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    data = _a.sent();
                                    resolve(data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AttributesService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
    ]; };
    AttributesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], AttributesService);
    return AttributesService;
}());



/***/ }),

/***/ "./src/app/services/data/data.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/data/data.service.ts ***!
  \***********************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DataService = /** @class */ (function () {
    function DataService() {
        // tslint:disable-next-line: max-line-length
        this.colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#e63946', '#457b9d', '#283618', '#1d3557', '#cb997e', '#e56b6f', '#fca311', '#e56b6f', '#f72585', '#f6bd60', '#e56b6f', '#f6bd60', '#f5cac3', '#7400b8', '#5390d9', '#ffe4c4', '#ff69b4', '#7fffd4', '#ee82ee', '#afeeee', '#90ee90', '#dda0dd', '#6495ed', '#ffff54', '#ff00ff', '#d8bfd8', '#ff6347', '#adff2f', '#f08080', '#a020f0', '#0000ff', '#f4a460', '#00bfff', '#00ffff', '#dc143c', '#4169e1', '#00fa9a', '#00ff00', '#0000cd', '#c71585', '#ffd700', '#ffa500', '#ff0000', '#9932cc', '#b03060', '#8fbc8f', '#7f007f', '#32cd32', '#00008b', '#9acd32', '#d2691e', '#4682b4', '#008b8b'];
    }
    DataService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DataService);
    return DataService;
}());



/***/ })

}]);
//# sourceMappingURL=common-es5.js.map