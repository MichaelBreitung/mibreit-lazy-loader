/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, getElementDimension, isElementWithinWindow, overwriteCssStyles, removeElement, unwrapElements, wrapElements, } from 'mibreit-dom-tools';
var ElementSurrogate = /*@__PURE__*/ (function () {
    function ElementSurrogate(element, horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        var _this = this;
        this._element = element;
        this._surrogate = this._createSurrogate(horizontal);
        wrapElements([element.getHtmlElement()], this._surrogate);
        element.addWasLoadedCallback(function () {
            unwrapElements(_this._surrogate);
            removeElement(_this._surrogate);
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
        return isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype._resize = function (horizontal) {
        console.log('ElementSurrogate#resize', getElementDimension(this._surrogate).height, this._element.getWidth(), this._element.getHeight());
        if (horizontal) {
            addCssStyle(this._surrogate, 'width', "".concat((getElementDimension(this._surrogate).height * this._element.getWidth()) / this._element.getHeight(), "px"));
        }
        // else nothing to do for now
    };
    ElementSurrogate.prototype._createSurrogate = function (horizontal) {
        var _this = this;
        if (horizontal === void 0) { horizontal = false; }
        console.log('ElementSurrogate#_createSurrogate', horizontal);
        var surrogate = createElement('div');
        addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        if (horizontal) {
            overwriteCssStyles(surrogate, "overflow: hidden; height: 100%; width: ".concat((getElementDimension(this._element.getHtmlElement()).height * this._element.getWidth()) /
                this._element.getHeight(), "px; flex-shrink:0;"));
            setTimeout(function () {
                _this._resize(true);
            }, 0);
        }
        else {
            overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: ".concat((this._element.getHeight() * 100) / this._element.getWidth(), "%;"));
        }
        return surrogate;
    };
    return ElementSurrogate;
}());
export default ElementSurrogate;
