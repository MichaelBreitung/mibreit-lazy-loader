/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomTools: () => (/* binding */ DomTools),
/* harmony export */   addClickEventListener: () => (/* binding */ addClickEventListener),
/* harmony export */   addCssClass: () => (/* binding */ addCssClass),
/* harmony export */   addCssStyle: () => (/* binding */ addCssStyle),
/* harmony export */   addEventListener: () => (/* binding */ addEventListener),
/* harmony export */   addKeyEventListener: () => (/* binding */ addKeyEventListener),
/* harmony export */   addResizeEventListener: () => (/* binding */ addResizeEventListener),
/* harmony export */   addScrollEventListener: () => (/* binding */ addScrollEventListener),
/* harmony export */   appendAfterChild: () => (/* binding */ appendAfterChild),
/* harmony export */   appendChildElement: () => (/* binding */ appendChildElement),
/* harmony export */   cloneElement: () => (/* binding */ cloneElement),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createInputElement: () => (/* binding */ createInputElement),
/* harmony export */   disableContextMenu: () => (/* binding */ disableContextMenu),
/* harmony export */   disableDragging: () => (/* binding */ disableDragging),
/* harmony export */   documentReady: () => (/* binding */ documentReady),
/* harmony export */   getAttribute: () => (/* binding */ getAttribute),
/* harmony export */   getChildNodes: () => (/* binding */ getChildNodes),
/* harmony export */   getComputedCssStyle: () => (/* binding */ getComputedCssStyle),
/* harmony export */   getCssClasses: () => (/* binding */ getCssClasses),
/* harmony export */   getCssStyle: () => (/* binding */ getCssStyle),
/* harmony export */   getCssStyles: () => (/* binding */ getCssStyles),
/* harmony export */   getElement: () => (/* binding */ getElement),
/* harmony export */   getElementDimension: () => (/* binding */ getElementDimension),
/* harmony export */   getElementPosition: () => (/* binding */ getElementPosition),
/* harmony export */   getElements: () => (/* binding */ getElements),
/* harmony export */   getKeyFromEvent: () => (/* binding */ getKeyFromEvent),
/* harmony export */   getParentElement: () => (/* binding */ getParentElement),
/* harmony export */   getRootFontSize: () => (/* binding */ getRootFontSize),
/* harmony export */   hasAttribute: () => (/* binding */ hasAttribute),
/* harmony export */   isElementWithinWindow: () => (/* binding */ isElementWithinWindow),
/* harmony export */   overwriteCssClasses: () => (/* binding */ overwriteCssClasses),
/* harmony export */   overwriteCssStyles: () => (/* binding */ overwriteCssStyles),
/* harmony export */   prependBeforeChild: () => (/* binding */ prependBeforeChild),
/* harmony export */   prependChildElement: () => (/* binding */ prependChildElement),
/* harmony export */   removeAllCssClasses: () => (/* binding */ removeAllCssClasses),
/* harmony export */   removeAllCssStyles: () => (/* binding */ removeAllCssStyles),
/* harmony export */   removeAttribute: () => (/* binding */ removeAttribute),
/* harmony export */   removeCssClass: () => (/* binding */ removeCssClass),
/* harmony export */   removeCssStyle: () => (/* binding */ removeCssStyle),
/* harmony export */   removeElement: () => (/* binding */ removeElement),
/* harmony export */   setAttribute: () => (/* binding */ setAttribute),
/* harmony export */   setInnerHtml: () => (/* binding */ setInnerHtml),
/* harmony export */   unwrapElements: () => (/* binding */ unwrapElements),
/* harmony export */   wrapElements: () => (/* binding */ wrapElements)
/* harmony export */ });
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
function documentReady(callback) {
    window.addEventListener('load', callback);
}
function getRootFontSize() {
    return parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
}
function createElement(tagName) {
    return document.createElement(tagName);
}
function createInputElement(type) {
    var input = document.createElement('input');
    input.type = type;
    return input;
}
function cloneElement(element) {
    return element.cloneNode();
}
function removeElement(element) {
    element.remove();
}
function prependChildElement(element, parent) {
    parent.prepend(element);
}
function appendChildElement(element, parent) {
    parent.appendChild(element);
}
function prependBeforeChild(element, child) {
    child.parentElement.insertBefore(element, child);
}
function appendAfterChild(element, child) {
    child.parentElement.insertBefore(element, child.nextSibling);
}
function getChildNodes(element) {
    var nodes = element.childNodes;
    var nodesArray = new Array();
    for (var i = 0; i < nodes.length; ++i) {
        nodesArray.push(nodes[i]);
    }
    return nodesArray;
}
function setInnerHtml(parent, inner) {
    parent.innerHTML = inner;
}
function wrapElements(elements, wrapper) {
    elements[0].parentNode.insertBefore(wrapper, elements[0]);
    elements.forEach(function (element) {
        wrapper.appendChild(element);
    });
}
function unwrapElements(wrapper) {
    var elements = wrapper.childNodes;
    elements.forEach(function (element) {
        wrapper.parentNode.insertBefore(element, wrapper);
    });
}
function getParentElement(element) {
    return element.parentElement;
}
function getElementDimension(element) {
    var elementRect = element.getBoundingClientRect();
    return {
        width: elementRect.width,
        height: elementRect.height,
    };
}
function isElementWithinWindow(element) {
    var elementRect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    return (elementRect.top + elementRect.height > 0 &&
        elementRect.top < windowHeight &&
        elementRect.left + elementRect.width > 0 &&
        elementRect.left < windowWidth);
}
function getElementPosition(element) {
    var rect = element.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { y: rect.top + scrollTop, x: rect.left + scrollLeft };
}
function getCssClasses(element) {
    return getAttribute(element, 'class');
}
function addCssClass(element, cssClass) {
    if (!element.classList.contains(cssClass)) {
        element.classList.add(cssClass);
    }
}
function removeCssClass(element, cssClass) {
    if (element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
    }
}
function removeAllCssClasses(element) {
    if (element.hasAttribute('class')) {
        element.removeAttribute('class');
    }
}
function overwriteCssClasses(element, cssClasses) {
    if (cssClasses == null) {
        removeAllCssClasses(element);
    }
    else {
        element.setAttribute('class', cssClasses);
    }
}
function getCssStyle(element, styleName) {
    return element.style.getPropertyValue(styleName);
}
function getCssStyles(element) {
    return element.style.cssText;
}
function getComputedCssStyle(element, styleName) {
    return window.getComputedStyle(element).getPropertyValue(styleName);
}
function addCssStyle(element, styleName, styleProperty) {
    element.style.setProperty(styleName, styleProperty);
}
function removeCssStyle(element, styleName) {
    element.style.removeProperty(styleName);
    if (element.style.length === 0) {
        element.removeAttribute('style');
    }
}
function removeAllCssStyles(element) {
    if (element.hasAttribute('style')) {
        element.removeAttribute('style');
    }
}
function overwriteCssStyles(element, styles) {
    if (styles == null) {
        removeAllCssStyles(element);
    }
    else {
        element.style.cssText = styles;
    }
}
function hasAttribute(element, attribute) {
    return element.hasAttribute(attribute);
}
function getAttribute(element, attribute) {
    if (!element.hasAttribute(attribute)) {
        return null;
    }
    else {
        return element.getAttribute(attribute);
    }
}
function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}
function removeAttribute(element, attribute) {
    element.removeAttribute(attribute);
}
function addClickEventListener(element, callback) {
    element.addEventListener('click', callback);
}
function addKeyEventListener(callback) {
    document.addEventListener('keydown', callback);
}
function addScrollEventListener(callback) {
    document.addEventListener('scroll', callback);
}
function addResizeEventListener(callback) {
    window.addEventListener('resize', callback);
}
function addEventListener(element, event, callback) {
    element.addEventListener(event, callback);
}
function disableContextMenu(element) {
    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
}
function disableDragging(element) {
    element.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
}
function getElement(selector) {
    return document.querySelector(selector);
}
function getElements(selector) {
    return document.querySelectorAll(selector);
}
function getKeyFromEvent(event) {
    return event.key;
}
var DomTools = {
    documentReady: documentReady,
    getRootFontSize: getRootFontSize,
    createElement: createElement,
    createInputElement: createInputElement,
    cloneElement: cloneElement,
    removeElement: removeElement,
    prependChildElement: prependChildElement,
    appendChildElement: appendChildElement,
    prependBeforeChild: prependBeforeChild,
    appendAfterChild: appendAfterChild,
    getChildNodes: getChildNodes,
    setInnerHtml: setInnerHtml,
    wrapElements: wrapElements,
    unwrapElements: unwrapElements,
    getParentElement: getParentElement,
    getElementDimension: getElementDimension,
    getElementPosition: getElementPosition,
    isElementWithinWindow: isElementWithinWindow,
    getCssClasses: getCssClasses,
    addCssClass: addCssClass,
    removeCssClass: removeCssClass,
    removeAllCssClasses: removeAllCssClasses,
    overwriteCssClasses: overwriteCssClasses,
    getCssStyle: getCssStyle,
    getCssStyles: getCssStyles,
    getComputedCssStyle: getComputedCssStyle,
    addCssStyle: addCssStyle,
    removeCssStyle: removeCssStyle,
    removeAllCssStyles: removeAllCssStyles,
    overwriteCssStyles: overwriteCssStyles,
    hasAttribute: hasAttribute,
    getAttribute: getAttribute,
    setAttribute: setAttribute,
    removeAttribute: removeAttribute,
    addClickEventListener: addClickEventListener,
    addKeyEventListener: addKeyEventListener,
    addScrollEventListener: addScrollEventListener,
    addResizeEventListener: addResizeEventListener,
    addEventListener: addEventListener,
    disableContextMenu: disableContextMenu,
    disableDragging: disableDragging,
    getElement: getElement,
    getElements: getElements,
    getKeyFromEvent: getKeyFromEvent,
};


/***/ }),

/***/ 726:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ElementLoader_1 = __webpack_require__(301);
var ElementInfo_1 = __webpack_require__(672);
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(element) {
        var _this = _super.call(this, element) || this;
        _this._elementInfo = new ElementInfo_1.default(_this._element);
        return _this;
    }
    Element.prototype.getHtmlElement = function () {
        return this._element;
    };
    Element.prototype.getWidth = function () {
        return this._elementInfo.getWidth();
    };
    Element.prototype.getHeight = function () {
        return this._elementInfo.getHeight();
    };
    Element.prototype.getStyle = function () {
        return this._elementInfo.getStyle();
    };
    Element.prototype.isElementWithinScrollArea = function () {
        return this._elementInfo.isElementWithinScrollArea();
    };
    return Element;
}(ElementLoader_1.default));
exports["default"] = Element;


/***/ }),

/***/ 672:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mibreit_dom_tools_1 = __webpack_require__(942);
var ElementInfo = /** @class */ (function () {
    function ElementInfo(element) {
        var width = mibreit_dom_tools_1.DomTools.getAttribute(element, 'width');
        var height = mibreit_dom_tools_1.DomTools.getAttribute(element, 'height');
        if (width == null || height == null) {
            throw new Error('ElementInfo#constructor - supported elements need a width and height property');
        }
        var originalStyle = mibreit_dom_tools_1.DomTools.getAttribute(element, 'class');
        this._element = element;
        this._originalElementStyle = originalStyle ? originalStyle : '';
        this._width = parseInt(width);
        this._height = parseInt(height);
    }
    ElementInfo.prototype.getWidth = function () {
        return this._width;
    };
    ElementInfo.prototype.getHeight = function () {
        return this._height;
    };
    ElementInfo.prototype.getStyle = function () {
        return this._originalElementStyle;
    };
    ElementInfo.prototype.isElementWithinScrollArea = function () {
        return mibreit_dom_tools_1.DomTools.isElementWithinWindow(this._element);
    };
    return ElementInfo;
}());
exports["default"] = ElementInfo;


/***/ }),

/***/ 301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mibreit_dom_tools_1 = __webpack_require__(942);
var LAZY_LOADING_CLASS = 'mibreit-LazyLoader_lazy';
var LAZY_LOADING_ANIMATE_CLASS = 'mibreit-LazyLoader_ElementLoader_animate';
var DATA_SRC_ATTRIBUTE = 'data-src';
var SRC_ATTRIBUTE = 'src';
var EImageState;
(function (EImageState) {
    EImageState[EImageState["INACTIVE"] = 0] = "INACTIVE";
    EImageState[EImageState["LOADING"] = 1] = "LOADING";
    EImageState[EImageState["LOADED"] = 2] = "LOADED";
})(EImageState || (EImageState = {}));
var ElementLoader = /** @class */ (function () {
    function ElementLoader(element) {
        var _a;
        this._state = EImageState.INACTIVE;
        this._wasLoadedCallbacks = new Array();
        this._dataSrc = null;
        this._element = element;
        this._dataSrc = mibreit_dom_tools_1.DomTools.getAttribute(element, DATA_SRC_ATTRIBUTE);
        var classes = (_a = mibreit_dom_tools_1.DomTools.getCssClasses(element)) === null || _a === void 0 ? void 0 : _a.split(',');
        if (this._dataSrc || (classes && classes.includes(LAZY_LOADING_CLASS))) {
            this._state = EImageState.INACTIVE;
            this._setBaseStyle();
        }
        else {
            this._state = EImageState.LOADED;
        }
        console.log('ElementLoader#constructor -> state', this._state);
    }
    ElementLoader.prototype.load = function () {
        var _this = this;
        console.log('ElementLoader#load');
        return new Promise(function (resolve, reject) {
            if (_this._state == EImageState.INACTIVE) {
                _this._element.onload = function () {
                    _this._finishLoad();
                    resolve(true);
                };
                _this._triggerLoad();
                _this._state = EImageState.LOADING;
                _this._setLoadingStyle();
                if (_this._element instanceof HTMLImageElement && _this._element.complete) {
                    // images that have been cached don't trigger the onload event, so we manually trigger it
                    _this._element.onload = null;
                    _this._finishLoad();
                    resolve(true);
                }
            }
            else if (_this._state === EImageState.LOADING) {
                reject(false);
            }
            else {
                reject(true);
            }
        });
    };
    ElementLoader.prototype.wasLoaded = function () {
        return this._state === EImageState.LOADED;
    };
    ElementLoader.prototype.addWasLoadedCallback = function (callback) {
        if (!this._wasLoadedCallbacks.includes(callback)) {
            this._wasLoadedCallbacks.push(callback);
        }
    };
    ElementLoader.prototype._triggerLoad = function () {
        if (this._dataSrc) {
            mibreit_dom_tools_1.DomTools.setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
        }
        mibreit_dom_tools_1.DomTools.removeCssClass(this._element, LAZY_LOADING_CLASS);
    };
    ElementLoader.prototype._finishLoad = function () {
        var _this = this;
        console.log('ElementLoader#_finishLoad');
        mibreit_dom_tools_1.DomTools.removeAttribute(this._element, DATA_SRC_ATTRIBUTE);
        this._state = EImageState.LOADED;
        this._wasLoadedCallbacks.forEach(function (callback) {
            callback();
        });
        // A little explanation for the timeout: we need to decouple the
        // change of the load style and the fade it will trigger from the
        // change to the dom that might be triggered by the callbacks
        // -> this needs to happen separately and a timeout helps to provide
        // this separation
        setTimeout(function () {
            _this._setLoadedStyle();
        }, 50);
    };
    ElementLoader.prototype._setBaseStyle = function () {
        mibreit_dom_tools_1.DomTools.addCssStyle(this._element, 'opacity', '0');
    };
    ElementLoader.prototype._setLoadingStyle = function () {
        mibreit_dom_tools_1.DomTools.addCssClass(this._element, LAZY_LOADING_ANIMATE_CLASS);
    };
    ElementLoader.prototype._setLoadedStyle = function () {
        var _this = this;
        mibreit_dom_tools_1.DomTools.removeCssStyle(this._element, 'opacity');
        setTimeout(function () {
            mibreit_dom_tools_1.DomTools.removeCssClass(_this._element, LAZY_LOADING_ANIMATE_CLASS);
        }, 1000);
    };
    return ElementLoader;
}());
exports["default"] = ElementLoader;


/***/ }),

/***/ 754:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mibreit_dom_tools_1 = __webpack_require__(942);
var ElementSurrogate = /** @class */ (function () {
    function ElementSurrogate(element, horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        var _this = this;
        this._element = element;
        this._surrogate = this._createSurrogate(horizontal);
        mibreit_dom_tools_1.DomTools.wrapElements([element.getHtmlElement()], this._surrogate);
        element.addWasLoadedCallback(function () {
            mibreit_dom_tools_1.DomTools.unwrapElements(_this._surrogate);
            mibreit_dom_tools_1.DomTools.removeElement(_this._surrogate);
        });
    }
    ElementSurrogate.prototype.getWidth = function () {
        return this._element.getWidth();
    };
    ElementSurrogate.prototype.getHeight = function () {
        return this._element.getHeight();
    };
    ElementSurrogate.prototype.getStyle = function () {
        return this._element.getStyle();
    };
    ElementSurrogate.prototype.isElementWithinScrollArea = function () {
        return mibreit_dom_tools_1.DomTools.isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype._resize = function (horizontal) {
        console.log("ElementSurrogate#resize", mibreit_dom_tools_1.DomTools.getElementDimension(this._surrogate).height, this._element.getWidth(), this._element.getHeight());
        if (horizontal) {
            mibreit_dom_tools_1.DomTools.addCssStyle(this._surrogate, "width", "".concat(mibreit_dom_tools_1.DomTools.getElementDimension(this._surrogate).height *
                (this._element.getWidth()) / this._element.getHeight(), "px"));
        }
        // else nothing to do for now
    };
    ElementSurrogate.prototype._createSurrogate = function (horizontal) {
        var _this = this;
        if (horizontal === void 0) { horizontal = false; }
        console.log("ElementSurrogate#_createSurrogate", horizontal);
        var surrogate = mibreit_dom_tools_1.DomTools.createElement('div');
        mibreit_dom_tools_1.DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        if (horizontal) {
            mibreit_dom_tools_1.DomTools.overwriteCssStyles(surrogate, "overflow: hidden; height: 100%; width: ".concat(mibreit_dom_tools_1.DomTools.getElementDimension(this._element.getHtmlElement()).height *
                (this._element.getWidth()) / this._element.getHeight(), "px; flex-shrink:0;"));
            setTimeout(function () {
                _this._resize(true);
            }, 0);
        }
        else {
            mibreit_dom_tools_1.DomTools.overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: ".concat((this._element.getHeight() * 100) / this._element.getWidth(), "%;"));
        }
        return surrogate;
    };
    return ElementSurrogate;
}());
exports["default"] = ElementSurrogate;


/***/ }),

/***/ 549:
/***/ (function(__unused_webpack_module, exports) {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PRELOADER_WINDOW_SIZE = 5;
var LazyLoader = /** @class */ (function () {
    function LazyLoader(elementLoaders, preloaderBeforeSize, preloaderAfterSize) {
        if (preloaderBeforeSize === void 0) { preloaderBeforeSize = 0; }
        if (preloaderAfterSize === void 0) { preloaderAfterSize = PRELOADER_WINDOW_SIZE; }
        this._unloadedElementIndices = [];
        this._currentIndex = -1;
        this._elementLoaders = elementLoaders;
        this._preloaderBeforeSize = preloaderBeforeSize;
        this._preloaderAfterSize = preloaderAfterSize;
        this._updateUnloadedElementIndices();
    }
    LazyLoader.prototype.loadAll = function () {
        this._loadElements(0, this._elementLoaders.length);
    };
    LazyLoader.prototype.setCurrentIndex = function (newIndex) {
        if (this._currentIndex != newIndex) {
            this._currentIndex = newIndex;
            this._moveWindow();
        }
    };
    /**
     * Will directly load an Element without changing the window of loaded Elements. This
     * has to be handled separately by setCurrentIndex
     *
     * @return {Promise} Promise that will resolve with true once the Element is loaded
     *         or will resolve right away with false, if the Element is in loading state;
     *         It will reject an invalid index with a error message
     */
    LazyLoader.prototype.loadElement = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var loaded, location_1, wasLoaded_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(index >= 0 && index < this._elementLoaders.length)) return [3 /*break*/, 6];
                        loaded = false;
                        if (!!this._unloadedElementIndices.includes(index)) return [3 /*break*/, 1];
                        loaded = true;
                        return [3 /*break*/, 5];
                    case 1:
                        console.log("LazyLoader#loadElement - index: ", index);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._elementLoaders[index].load()];
                    case 3:
                        loaded = _a.sent();
                        if (loaded) {
                            location_1 = this._unloadedElementIndices.indexOf(index);
                            if (location_1 > -1) {
                                this._unloadedElementIndices.splice(location_1, 1);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        wasLoaded_1 = _a.sent();
                        loaded = wasLoaded_1;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, loaded];
                    case 6: throw new Error("Preloader#loadElement -> invalid Index ".concat(index));
                }
            });
        });
    };
    LazyLoader.prototype.getElementLoaderInfos = function () {
        return this._elementLoaders;
    };
    LazyLoader.prototype.getUnloadedElementIndices = function () {
        return this._unloadedElementIndices;
    };
    LazyLoader.prototype._moveWindow = function () {
        if (this._unloadedElementIndices.length) {
            var start = this._currentIndex - this._preloaderBeforeSize;
            var end = this._currentIndex + this._preloaderAfterSize;
            // 1) load from current Element forward
            this._loadElements(this._currentIndex, end < this._elementLoaders.length ? end : this._elementLoaders.length);
            // 2) load from back towards current Element
            this._loadElements(start >= 0 ? start : 0, this._currentIndex);
            // 3) handle overflow
            if (start < 0) {
                start = this._elementLoaders.length + start;
                this._loadElements(start, this._elementLoaders.length);
            }
            if (end >= this._elementLoaders.length) {
                end = end - this._elementLoaders.length;
                this._loadElements(0, end);
            }
        }
    };
    LazyLoader.prototype._loadElements = function (start, end) {
        for (var i = start < 0 ? 0 : start; i < end && i < this._elementLoaders.length; i++) {
            this.loadElement(i);
        }
    };
    LazyLoader.prototype._updateUnloadedElementIndices = function () {
        for (var i = 0; i < this._elementLoaders.length; i++) {
            if (!this._elementLoaders[i].wasLoaded()) {
                this._unloadedElementIndices.push(i);
            }
        }
    };
    return LazyLoader;
}());
exports["default"] = LazyLoader;


/***/ }),

/***/ 175:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mibreit_dom_tools_1 = __webpack_require__(942);
var debounce_1 = __webpack_require__(862);
// avoid overloading of scroll event
var SCROLL_EVENT_TIMEOUT = 400;
var ScrollLoader = /** @class */ (function () {
    function ScrollLoader(lazyLoader, elementLocations) {
        this._elementLocations = [];
        this._lazyLoader = lazyLoader;
        this._elementLocations = elementLocations;
    }
    ScrollLoader.prototype.startLoader = function () {
        var _this = this;
        this._loadElementsWithinWindowRect();
        var debouncedLoadEvent = (0, debounce_1.default)(function () {
            _this._loadElementsWithinWindowRect();
        }, SCROLL_EVENT_TIMEOUT);
        mibreit_dom_tools_1.DomTools.addScrollEventListener(function (_event) {
            debouncedLoadEvent();
        });
    };
    ScrollLoader.prototype._loadElementsWithinWindowRect = function () {
        var unloadedElementIndices = this._lazyLoader.getUnloadedElementIndices();
        console.log('ScrollLoader#loadElementsWithinWindowRect - unloadedElements: ', unloadedElementIndices);
        for (var i = 0; i < unloadedElementIndices.length; i++) {
            if (this._elementLocations[unloadedElementIndices[i]].isElementWithinScrollArea()) {
                this._lazyLoader.loadElement(unloadedElementIndices[i]);
            }
        }
        // TODO: Further optimization -> stop once we leave the window area
    };
    return ScrollLoader;
}());
exports["default"] = ScrollLoader;


/***/ }),

/***/ 465:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Element = exports.ScrollLoader = exports.LazyLoader = exports.ELazyMode = void 0;
__exportStar(__webpack_require__(8), exports);
var createLazyLoader_1 = __webpack_require__(8);
Object.defineProperty(exports, "ELazyMode", ({ enumerable: true, get: function () { return createLazyLoader_1.ELazyMode; } }));
var LazyLoader_1 = __webpack_require__(549);
Object.defineProperty(exports, "LazyLoader", ({ enumerable: true, get: function () { return LazyLoader_1.default; } }));
var ScrollLoader_1 = __webpack_require__(175);
Object.defineProperty(exports, "ScrollLoader", ({ enumerable: true, get: function () { return ScrollLoader_1.default; } }));
var Element_1 = __webpack_require__(726);
Object.defineProperty(exports, "Element", ({ enumerable: true, get: function () { return Element_1.default; } }));


/***/ }),

/***/ 8:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLazyLoader = exports.createLazyLoaderFromElements = exports.ELazyMode = void 0;
var LazyLoader_1 = __webpack_require__(549);
var Element_1 = __webpack_require__(726);
var ElementSurrogate_1 = __webpack_require__(754);
var ScrollLoader_1 = __webpack_require__(175);
var mibreit_dom_tools_1 = __webpack_require__(942);
var ELazyMode;
(function (ELazyMode) {
    ELazyMode[ELazyMode["SIMPLE_DEFER"] = 0] = "SIMPLE_DEFER";
    ELazyMode[ELazyMode["WINDOWED_EXTERNAL"] = 1] = "WINDOWED_EXTERNAL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL"] = 2] = "WINDOWED_SCROLL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL_HORIZONTAL"] = 3] = "WINDOWED_SCROLL_HORIZONTAL";
})(ELazyMode = exports.ELazyMode || (exports.ELazyMode = {}));
function checkElementSelectorInput(elementSelector) {
    if (typeof elementSelector !== 'string') {
        throw new Error('createLazyLoader - first parameter needs to be a css selector string');
    }
}
function checkConfig(config) {
    if (typeof config.preloaderAfterSize !== 'undefined' && typeof config.preloaderAfterSize !== 'number') {
        throw new Error('createLazyLoader - preloaderAfterSize of config must be a number');
    }
    if (typeof config.preloaderBeforeSize !== 'undefined' && typeof config.preloaderBeforeSize !== 'number') {
        throw new Error('createLazyLoader - preloaderBeforeSize of config must be a number');
    }
    if (typeof config.mode !== 'undefined' && typeof config.mode !== 'number') {
        throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2, 3) - use type ELazyMode');
    }
}
function startLoader(loader, mode, elementLocations) {
    if (mode === void 0) { mode = ELazyMode.SIMPLE_DEFER; }
    console.log('startLoader');
    if (mode != null) {
        switch (mode) {
            case ELazyMode.WINDOWED_EXTERNAL:
                loader.loadElement(0);
                loader.setCurrentIndex(0);
                break;
            case ELazyMode.WINDOWED_SCROLL:
            case ELazyMode.WINDOWED_SCROLL_HORIZONTAL:
                var scrollLoader = new ScrollLoader_1.default(loader, elementLocations);
                scrollLoader.startLoader();
                break;
            case ELazyMode.SIMPLE_DEFER:
            default:
                loader.loadAll();
                break;
        }
    }
    else {
        loader.loadAll();
    }
}
function createLazyLoaderFromElements(elements, config) {
    checkConfig(config);
    console.log('createLazyLoaderFromElements', JSON.stringify(config));
    var elementLocations = elements;
    if (config === null || config === void 0 ? void 0 : config.useSurrogate) {
        var surrogates = [];
        if (config.mode === ELazyMode.WINDOWED_SCROLL || config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL) {
            for (var i = 0; i < elements.length; i++) {
                var surrogate = new ElementSurrogate_1.default(elements[i], config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL ? true : false);
                surrogates.push(surrogate);
            }
        }
        elementLocations = surrogates;
    }
    var lazyLoader = new LazyLoader_1.default(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    // enqueing execution of startLoader -> to ensure that resize events from Surrogates are executed before
    setTimeout(function () {
        startLoader(lazyLoader, config.mode, elementLocations);
    }, 0);
    return lazyLoader;
}
exports.createLazyLoaderFromElements = createLazyLoaderFromElements;
function createLazyLoader(elementSelector, config) {
    checkElementSelectorInput(elementSelector);
    console.log('createLazyLoader', elementSelector, JSON.stringify(config));
    var htmlElements = mibreit_dom_tools_1.DomTools.getElements(elementSelector);
    var elements = [];
    for (var i = 0; i < htmlElements.length; i++) {
        var element = new Element_1.default(htmlElements[i]);
        elements.push(element);
    }
    return createLazyLoaderFromElements(elements, config);
}
exports.createLazyLoader = createLazyLoader;


/***/ }),

/***/ 862:
/***/ ((__unused_webpack_module, exports) => {


/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
function default_1(callback, wait) {
    var timeout;
    return function debouncedCallback() {
        var later = function () {
            clearTimeout(timeout);
            callback();
        };
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}
exports["default"] = default_1;
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(465);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;