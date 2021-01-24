/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import DomTools from '../tools/domTools';
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
        this.state = EImageState.INACTIVE;
        this.wasLoadedCallbacks = new Array();
        this.element = element;
        if (element.hasAttribute('class')) {
            this.originalElementStyle = this.element.getAttribute('class');
        }
        else {
            this.originalElementStyle = '';
        }
        if (!this.element.hasAttribute(DATA_SRC_ATTRIBUTE)) {
            this.state = EImageState.LOADED;
        }
        else {
            this.state = EImageState.INACTIVE;
            this.setBaseStyle();
        }
    }
    ElementLoader.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.state === EImageState.INACTIVE) {
                _this.element.onload = function () {
                    _this.element.removeAttribute(DATA_SRC_ATTRIBUTE);
                    _this.state = EImageState.LOADED;
                    _this.wasLoadedCallbacks.forEach(function (callback) {
                        callback();
                    });
                    _this.setLoadedStyle();
                    resolve(true);
                };
                _this.state = EImageState.LOADING;
                _this.setLoadingStyle();
                var dataSrc = DomTools.getAttribute(_this.element, DATA_SRC_ATTRIBUTE);
                DomTools.setAttribute(_this.element, SRC_ATTRIBUTE, dataSrc);
            }
            else if (_this.state === EImageState.LOADING) {
                reject(false);
            }
            else {
                reject(true);
            }
        });
    };
    ElementLoader.prototype.wasLoaded = function () {
        return this.state === EImageState.LOADED;
    };
    ElementLoader.prototype.addWasLoadedCallback = function (callback) {
        if (!this.wasLoadedCallbacks.includes(callback)) {
            this.wasLoadedCallbacks.push(callback);
        }
    };
    ElementLoader.prototype.setBaseStyle = function () {
        DomTools.applyCssClass(this.element, this.originalElementStyle + " " + styles.element_invisible);
    };
    ElementLoader.prototype.setLoadingStyle = function () {
        DomTools.applyCssClass(this.element, this.originalElementStyle + " " + styles.element_animate + " " + styles.element_invisible);
    };
    ElementLoader.prototype.setLoadedStyle = function () {
        var _this = this;
        if (this.originalElementStyle.length > 0) {
            DomTools.applyCssClass(this.element, this.originalElementStyle + " " + styles.element_animate);
            setTimeout(function () {
                DomTools.applyCssClass(_this.element, _this.originalElementStyle);
            }, 1000);
        }
        else {
            DomTools.applyCssClass(this.element, "" + styles.element_animate);
            setTimeout(function () {
                DomTools.applyCssClass(_this.element, null);
            }, 1000);
        }
    };
    return ElementLoader;
}());
export default ElementLoader;
