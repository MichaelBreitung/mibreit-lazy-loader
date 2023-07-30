/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
import styles from './ElementLoader.module.css';
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
        this._dataSrc = DomTools.getAttribute(element, DATA_SRC_ATTRIBUTE);
        var classes = (_a = DomTools.getCssClasses(element)) === null || _a === void 0 ? void 0 : _a.split(',');
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
                    DomTools.removeAttribute(_this._element, DATA_SRC_ATTRIBUTE);
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
                _this._triggerLoad();
                _this._state = EImageState.LOADING;
                _this._setLoadingStyle();
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
            DomTools.setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
        }
        DomTools.removeCssClass(this._element, LAZY_LOADING_CLASS);
    };
    ElementLoader.prototype._setBaseStyle = function () {
        DomTools.addCssStyle(this._element, 'opacity', '0');
    };
    ElementLoader.prototype._setLoadingStyle = function () {
        DomTools.addCssClass(this._element, styles.element_animate);
    };
    ElementLoader.prototype._setLoadedStyle = function () {
        var _this = this;
        DomTools.removeCssStyle(this._element, 'opacity');
        setTimeout(function () {
            DomTools.removeCssClass(_this._element, styles.element_animate);
        }, 1000);
    };
    return ElementLoader;
}());
export default ElementLoader;
