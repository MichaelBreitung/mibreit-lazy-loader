/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 311:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".element_animate_T8r {    \r\n  -webkit-transition: opacity 800ms ease-out;\r\n  -moz-transition: opacity 800ms ease-out;\r\n  -o-transition: opacity 800ms ease-out;\r\n  transition: opacity 800ms ease-out;  \r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"element_animate": "element_animate_T8r"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
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
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 37:
/***/ ((module) => {



/* istanbul ignore next  */
var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join("\n");
  };
}();
/* istanbul ignore next  */


function apply(styleElement, index, remove, obj) {
  var css;

  if (remove) {
    css = "";
  } else {
    css = "";

    if (obj.supports) {
      css += "@supports (".concat(obj.supports, ") {");
    }

    if (obj.media) {
      css += "@media ".concat(obj.media, " {");
    }

    var needLayer = typeof obj.layer !== "undefined";

    if (needLayer) {
      css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
    }

    css += obj.css;

    if (needLayer) {
      css += "}";
    }

    if (obj.media) {
      css += "}";
    }

    if (obj.supports) {
      css += "}";
    }
  } // For old IE

  /* istanbul ignore if  */


  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = styleElement.childNodes;

    if (childNodes[index]) {
      styleElement.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index]);
    } else {
      styleElement.appendChild(cssNode);
    }
  }
}

var singletonData = {
  singleton: null,
  singletonCounter: 0
};
/* istanbul ignore next  */

function domAPI(options) {
  // eslint-disable-next-line no-undef,no-use-before-define
  var styleIndex = singletonData.singletonCounter++;
  var styleElement = // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton || ( // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton = options.insertStyleElement(options));
  return {
    update: function update(obj) {
      apply(styleElement, styleIndex, false, obj);
    },
    remove: function remove(obj) {
      apply(styleElement, styleIndex, true, obj);
    }
  };
}

module.exports = domAPI;

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
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ELazyMode: () => (/* reexport */ ELazyMode),
  Element: () => (/* reexport */ components_Element),
  createLazyLoader: () => (/* reexport */ createLazyLoaderFromElements)
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
var lib_DomTools = {
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

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js
var singletonStyleDomAPI = __webpack_require__(37);
var singletonStyleDomAPI_default = /*#__PURE__*/__webpack_require__.n(singletonStyleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./src/components/ElementLoader.module.css
var ElementLoader_module = __webpack_require__(311);
;// CONCATENATED MODULE: ./src/components/ElementLoader.module.css

      
      
      
      
      
      
      
      
      

var options = {};

;
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (singletonStyleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(ElementLoader_module/* default */.Z, options);




       /* harmony default export */ const components_ElementLoader_module = (ElementLoader_module/* default */.Z && ElementLoader_module/* default */.Z.locals ? ElementLoader_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/components/ElementLoader.ts
/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */


var LAZY_LOADING_CLASS = 'lazy-loading';
var DATA_SRC_ATTRIBUTE = "data-src";
var SRC_ATTRIBUTE = "src";
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
        this._dataSrc = lib_DomTools.getAttribute(element, DATA_SRC_ATTRIBUTE);
        var classes = (_a = lib_DomTools.getCssClasses(element)) === null || _a === void 0 ? void 0 : _a.split(',');
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
            lib_DomTools.setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
        }
        lib_DomTools.removeCssClass(this._element, LAZY_LOADING_CLASS);
    };
    ElementLoader.prototype._finishLoad = function () {
        var _this = this;
        console.log('ElementLoader#_finishLoad');
        lib_DomTools.removeAttribute(this._element, DATA_SRC_ATTRIBUTE);
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
        var width = lib_DomTools.getAttribute(element, 'width');
        var height = lib_DomTools.getAttribute(element, 'height');
        if (width == null || height == null) {
            throw new Error('ElementInfo#constructor - supported elements need a width and height property');
        }
        var originalStyle = lib_DomTools.getAttribute(element, 'class');
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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    function ElementSurrogate(element, horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        var _this = this;
        this._element = element;
        this._surrogate = this._createSurrogate(horizontal);
        lib_DomTools.wrapElements([element.getHtmlElement()], this._surrogate);
        element.addWasLoadedCallback(function () {
            lib_DomTools.unwrapElements(_this._surrogate);
            lib_DomTools.removeElement(_this._surrogate);
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
        return lib_DomTools.isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype._resize = function (horizontal) {
        console.log("ElementSurrogate#resize", lib_DomTools.getElementDimension(this._surrogate).height, this._element.getWidth(), this._element.getHeight());
        if (horizontal) {
            lib_DomTools.addCssStyle(this._surrogate, "width", "".concat(lib_DomTools.getElementDimension(this._surrogate).height *
                (this._element.getWidth()) / this._element.getHeight(), "px"));
        }
        // else nothing to do for now
    };
    ElementSurrogate.prototype._createSurrogate = function (horizontal) {
        var _this = this;
        if (horizontal === void 0) { horizontal = false; }
        console.log("ElementSurrogate#_createSurrogate", horizontal);
        var surrogate = lib_DomTools.createElement('div');
        lib_DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        if (horizontal) {
            lib_DomTools.overwriteCssStyles(surrogate, "overflow: hidden; height: 100%; width: ".concat(lib_DomTools.getElementDimension(this._element.getHtmlElement()).height *
                (this._element.getWidth()) / this._element.getHeight(), "px; flex-shrink:0;"));
            setTimeout(function () {
                _this._resize(true);
            }, 0);
        }
        else {
            lib_DomTools.overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: ".concat((this._element.getHeight() * 100) / this._element.getWidth(), "%;"));
        }
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
        var debouncedLoadEvent = debounce(function () {
            _this._loadElementsWithinWindowRect();
        }, SCROLL_EVENT_TIMEOUT);
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
    ELazyMode[ELazyMode["WINDOWED_SCROLL_HORIZONTAL"] = 3] = "WINDOWED_SCROLL_HORIZONTAL";
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
                var scrollLoader = new components_ScrollLoader(loader, elementLocations);
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
    var surrogates = [];
    if (config.mode === ELazyMode.WINDOWED_SCROLL || config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL) {
        for (var i = 0; i < elements.length; i++) {
            var surrogate = new components_ElementSurrogate(elements[i], config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL ? true : false);
            surrogates.push(surrogate);
        }
    }
    var lazyLoader = new components_LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    // enqueing execution of startLoader -> to ensure that resize events from Surrogates are executed before
    setTimeout(function () {
        startLoader(lazyLoader, config.mode, surrogates);
    }, 0);
    return lazyLoader;
}
function createLazyLoader(elementSelector, config) {
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




})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;