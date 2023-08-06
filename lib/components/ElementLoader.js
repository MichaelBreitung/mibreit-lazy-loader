/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
const LAZY_LOADING_CLASS = 'mibreit-LazyLoader_lazy';
const LAZY_LOADING_ANIMATE_CLASS = 'mibreit-LazyLoader_ElementLoader_animate';
const DATA_SRC_ATTRIBUTE = 'data-src';
const SRC_ATTRIBUTE = 'src';
var EImageState;
(function (EImageState) {
    EImageState[EImageState["INACTIVE"] = 0] = "INACTIVE";
    EImageState[EImageState["LOADING"] = 1] = "LOADING";
    EImageState[EImageState["LOADED"] = 2] = "LOADED";
})(EImageState || (EImageState = {}));
export default class ElementLoader {
    constructor(element) {
        var _a;
        this._state = EImageState.INACTIVE;
        this._wasLoadedCallbacks = new Array();
        this._dataSrc = null;
        this._element = element;
        this._dataSrc = DomTools.getAttribute(element, DATA_SRC_ATTRIBUTE);
        const classes = (_a = DomTools.getCssClasses(element)) === null || _a === void 0 ? void 0 : _a.split(',');
        if (this._dataSrc || (classes && classes.includes(LAZY_LOADING_CLASS))) {
            this._state = EImageState.INACTIVE;
            this._setBaseStyle();
        }
        else {
            this._state = EImageState.LOADED;
        }
        console.log('ElementLoader#constructor -> state', this._state);
    }
    load() {
        console.log('ElementLoader#load');
        return new Promise((resolve, reject) => {
            if (this._state == EImageState.INACTIVE) {
                this._element.onload = () => {
                    this._finishLoad();
                    resolve(true);
                };
                this._triggerLoad();
                this._state = EImageState.LOADING;
                this._setLoadingStyle();
                if (this._element instanceof HTMLImageElement && this._element.complete) {
                    // images that have been cached don't trigger the onload event, so we manually trigger it
                    this._element.onload = null;
                    this._finishLoad();
                    resolve(true);
                }
            }
            else if (this._state === EImageState.LOADING) {
                reject(false);
            }
            else {
                reject(true);
            }
        });
    }
    wasLoaded() {
        return this._state === EImageState.LOADED;
    }
    addWasLoadedCallback(callback) {
        if (!this._wasLoadedCallbacks.includes(callback)) {
            this._wasLoadedCallbacks.push(callback);
        }
    }
    _triggerLoad() {
        if (this._dataSrc) {
            DomTools.setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
        }
        DomTools.removeCssClass(this._element, LAZY_LOADING_CLASS);
    }
    _finishLoad() {
        console.log('ElementLoader#_finishLoad');
        DomTools.removeAttribute(this._element, DATA_SRC_ATTRIBUTE);
        this._state = EImageState.LOADED;
        this._wasLoadedCallbacks.forEach((callback) => {
            callback();
        });
        // A little explanation for the timeout: we need to decouple the
        // change of the load style and the fade it will trigger from the
        // change to the dom that might be triggered by the callbacks
        // -> this needs to happen separately and a timeout helps to provide
        // this separation
        setTimeout(() => {
            this._setLoadedStyle();
        }, 50);
    }
    _setBaseStyle() {
        DomTools.addCssStyle(this._element, 'opacity', '0');
    }
    _setLoadingStyle() {
        DomTools.addCssClass(this._element, LAZY_LOADING_ANIMATE_CLASS);
    }
    _setLoadedStyle() {
        DomTools.removeCssStyle(this._element, 'opacity');
        setTimeout(() => {
            DomTools.removeCssClass(this._element, LAZY_LOADING_ANIMATE_CLASS);
        }, 1000);
    }
}
