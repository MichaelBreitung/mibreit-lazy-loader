/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
import styles from './ElementLoader.module.css';
export var DATA_SRC_ATTRIBUTE = 'data-src';
export var SRC_ATTRIBUTE = 'src';
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
        if (!DomTools.hasAttribute(element, DATA_SRC_ATTRIBUTE)) {
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
                _this._state = EImageState.LOADING;
                _this._setLoadingStyle();
                var dataSrc = DomTools.getAttribute(_this._element, DATA_SRC_ATTRIBUTE);
                // @ts-ignore - if state is inactive we know that an element has a data source
                DomTools.setAttribute(_this._element, SRC_ATTRIBUTE, dataSrc);
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
