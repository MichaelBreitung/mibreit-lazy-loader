(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 311:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".element_animate_3pV {    \r\n  -webkit-transition: opacity 800ms ease-out;\r\n  -moz-transition: opacity 800ms ease-out;\r\n  -o-transition: opacity 800ms ease-out;\r\n  transition: opacity 800ms ease-out;  \r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"element_animate": "element_animate_3pV"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ELazyMode": () => /* reexport */ ELazyMode,
  "Element": () => /* reexport */ components_Element,
  "createLazyLoader": () => /* reexport */ createLazyLoaderFromElements
});

;// CONCATENATED MODULE: ./src/components/LazyLoader.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
                    case 6: throw new Error("Preloader#loadElement -> invalid Index " + index);
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
/* harmony default export */ const components_LazyLoader = (LazyLoader);

;// CONCATENATED MODULE: ./node_modules/mibreit-dom-tools/lib/index.js
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
function removeElement(element) {
    element.remove();
}
function prependChildElement(element, parent) {
    parent.prepend(element);
}
function appendChildElement(element, parent) {
    parent.append(element);
}
function prependBeforeChild(element, child) {
    child.parentElement.insertBefore(element, child);
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
    return {
        width: element.clientWidth,
        height: element.clientHeight,
    };
}
function isElementWithinWindow(element) {
    var elementRect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    return elementRect.top + elementRect.height > 0 && elementRect.top < windowHeight;
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
function overwriteCssClasses(element, cssClasses) {
    element.setAttribute('class', cssClasses);
}
function removeAllCssClasses(element) {
    if (element.hasAttribute('class')) {
        element.removeAttribute('class');
    }
}
function getCssStyle(element, styleName) {
    return element.style.getPropertyValue(styleName);
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
function overwriteCssStyles(element, styles) {
    if (styles !== null) {
        element.style.cssText = styles;
    }
    else {
        element.removeAttribute('style');
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
var lib_DomTools = {
    documentReady: documentReady,
    getRootFontSize: getRootFontSize,
    createElement: createElement,
    removeElement: removeElement,
    prependChildElement: prependChildElement,
    appendChildElement: appendChildElement,
    prependBeforeChild: prependBeforeChild,
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
    getComputedCssStyle: getComputedCssStyle,
    addCssStyle: addCssStyle,
    removeCssStyle: removeCssStyle,
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

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./src/components/ElementLoader.module.css
var ElementLoader_module = __webpack_require__(311);
;// CONCATENATED MODULE: ./src/components/ElementLoader.module.css

            

var options = {"injectType":"singletonStyleTag"};

options.insert = "head";
options.singleton = true;

var update = injectStylesIntoStyleTag_default()(ElementLoader_module/* default */.Z, options);



/* harmony default export */ const components_ElementLoader_module = (ElementLoader_module/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/components/ElementLoader.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */


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
        this._state = EImageState.INACTIVE;
        this._wasLoadedCallbacks = new Array();
        this._element = element;
        if (!lib_DomTools.hasAttribute(element, DATA_SRC_ATTRIBUTE)) {
            this._state = EImageState.LOADED;
        }
        else {
            this._state = EImageState.INACTIVE;
            this._setBaseStyle();
        }
    }
    ElementLoader.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._state === EImageState.INACTIVE) {
                _this._element.onload = function () {
                    lib_DomTools.removeAttribute(_this._element, DATA_SRC_ATTRIBUTE);
                    _this._state = EImageState.LOADED;
                    _this._wasLoadedCallbacks.forEach(function (callback) {
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
                    resolve(true);
                };
                _this._state = EImageState.LOADING;
                _this._setLoadingStyle();
                var dataSrc = lib_DomTools.getAttribute(_this._element, DATA_SRC_ATTRIBUTE);
                lib_DomTools.setAttribute(_this._element, SRC_ATTRIBUTE, dataSrc);
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
    ElementLoader.prototype._setBaseStyle = function () {
        lib_DomTools.addCssStyle(this._element, 'opacity', '0');
    };
    ElementLoader.prototype._setLoadingStyle = function () {
        lib_DomTools.addCssClass(this._element, components_ElementLoader_module.element_animate);
    };
    ElementLoader.prototype._setLoadedStyle = function () {
        var _this = this;
        lib_DomTools.removeCssStyle(this._element, 'opacity');
        setTimeout(function () {
            lib_DomTools.removeCssClass(_this._element, components_ElementLoader_module.element_animate);
        }, 1000);
    };
    return ElementLoader;
}());
/* harmony default export */ const components_ElementLoader = (ElementLoader);

;// CONCATENATED MODULE: ./src/components/ElementInfo.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

var ElementInfo = /** @class */ (function () {
    function ElementInfo(element) {
        this._element = element;
        var originalStyle = lib_DomTools.getAttribute(element, 'class');
        this._originalElementStyle = originalStyle ? originalStyle : '';
        this._width = parseInt(lib_DomTools.getAttribute(element, 'width'));
        this._height = parseInt(lib_DomTools.getAttribute(element, 'height'));
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
        return lib_DomTools.isElementWithinWindow(this._element);
    };
    return ElementInfo;
}());
/* harmony default export */ const components_ElementInfo = (ElementInfo);

;// CONCATENATED MODULE: ./src/components/Element.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Element_Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(element) {
        var _this = _super.call(this, element) || this;
        _this._elementInfo = new components_ElementInfo(_this._element);
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
}(components_ElementLoader));
/* harmony default export */ const components_Element = (Element_Element);

;// CONCATENATED MODULE: ./src/components/ElementSurrogate.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

var ElementSurrogate = /** @class */ (function () {
    function ElementSurrogate(elementInfo) {
        this._elementInfo = elementInfo;
        this._surrogate = this._createSurrogate();
    }
    ElementSurrogate.prototype.wrap = function (elementHandle) {
        lib_DomTools.wrapElements([elementHandle], this._surrogate);
    };
    ElementSurrogate.prototype.unwrap = function () {
        lib_DomTools.unwrapElements(this._surrogate);
        lib_DomTools.removeElement(this._surrogate);
    };
    ElementSurrogate.prototype.getWidth = function () {
        return this._elementInfo.getWidth();
    };
    ElementSurrogate.prototype.getHeight = function () {
        return this._elementInfo.getHeight();
    };
    ElementSurrogate.prototype.getStyle = function () {
        return this._elementInfo.getStyle();
    };
    ElementSurrogate.prototype.isElementWithinScrollArea = function () {
        return lib_DomTools.isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype._createSurrogate = function () {
        var surrogate = lib_DomTools.createElement('div');
        lib_DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        lib_DomTools.overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: " + (this._elementInfo.getHeight() * 100) / this._elementInfo.getWidth() + "%;");
        return surrogate;
    };
    return ElementSurrogate;
}());
/* harmony default export */ const components_ElementSurrogate = (ElementSurrogate);

;// CONCATENATED MODULE: ./src/tools/debounce.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
/* harmony default export */ function debounce(callback, wait) {
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
;

;// CONCATENATED MODULE: ./src/components/ScrollLoader.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */


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
        var debouncedLoadEvent = debounce(function () { _this._loadElementsWithinWindowRect(); }, SCROLL_EVENT_TIMEOUT);
        lib_DomTools.addScrollEventListener(function (_event) {
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
/* harmony default export */ const components_ScrollLoader = (ScrollLoader);

;// CONCATENATED MODULE: ./src/tools/createLazyLoader.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */





var ELazyMode;
(function (ELazyMode) {
    ELazyMode[ELazyMode["SIMPLE_DEFER"] = 0] = "SIMPLE_DEFER";
    ELazyMode[ELazyMode["WINDOWED_EXTERNAL"] = 1] = "WINDOWED_EXTERNAL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL"] = 2] = "WINDOWED_SCROLL";
})(ELazyMode || (ELazyMode = {}));
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
        throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2) - use type ELazyMode');
    }
    if (typeof config.useSurrogate !== 'undefined' && typeof config.useSurrogate !== 'boolean') {
        throw new Error('createLazyLoader - useSurrogate of config must be a boolean');
    }
}
function startLoader(loader, elements, mode) {
    if (mode === void 0) { mode = ELazyMode.SIMPLE_DEFER; }
    if (mode != null) {
        switch (mode) {
            case ELazyMode.WINDOWED_EXTERNAL:
                loader.loadElement(0);
                loader.setCurrentIndex(0);
                break;
            case ELazyMode.WINDOWED_SCROLL:
                var scrollLoader = new components_ScrollLoader(loader, elements);
                scrollLoader.startLoader();
                break;
            case ELazyMode.SIMPLE_DEFER:
            default:
                loader.loadAll();
                break;
        }
    }
}
function createLazyLoaderFromElements(elements, config) {
    checkConfig(config);
    if (config.useSurrogate) {
        var _loop_1 = function (i) {
            var surrogate = new components_ElementSurrogate(elements[i]);
            surrogate.wrap(elements[i].getHtmlElement());
            elements[i].addWasLoadedCallback(function () {
                surrogate.unwrap();
            });
        };
        for (var i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    }
    var lazyLoader = new components_LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    startLoader(lazyLoader, elements, config.mode);
    return lazyLoader;
}
/* harmony default export */ function createLazyLoader(elementSelector, config) {
    checkElementSelectorInput(elementSelector);
    var htmlElements = DomTools.getElements(elementSelector);
    var elements = [];
    for (var i = 0; i < htmlElements.length; i++) {
        var element = new Element(htmlElements[i]);
        elements.push(element);
    }
    return createLazyLoaderFromElements(elements, config);
}

;// CONCATENATED MODULE: ./src/indexNpm.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(210);
/******/ })()

));