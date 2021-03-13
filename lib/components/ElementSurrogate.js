/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
var ElementSurrogate = /** @class */ (function () {
    function ElementSurrogate(element, horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        this._element = element;
        this._surrogate = this._createSurrogate(horizontal);
    }
    ElementSurrogate.prototype.wrap = function (elementHandle) {
        DomTools.wrapElements([elementHandle], this._surrogate);
    };
    ElementSurrogate.prototype.unwrap = function () {
        DomTools.unwrapElements(this._surrogate);
        DomTools.removeElement(this._surrogate);
    };
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
        return DomTools.isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype.resize = function (horizontal) {
        if (horizontal) {
            DomTools.addCssStyle(this._surrogate, "width", DomTools.getElementDimension(this._surrogate).height *
                (this._element.getWidth()) / this._element.getHeight() + "px");
        }
        // else nothing to do for now
    };
    ElementSurrogate.prototype._createSurrogate = function (horizontal) {
        if (horizontal === void 0) { horizontal = false; }
        var surrogate = DomTools.createElement('div');
        DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        if (horizontal) {
            DomTools.overwriteCssStyles(surrogate, "overflow: hidden; height: 100%; width: " + DomTools.getElementDimension(this._element.getHtmlElement()).height *
                (this._element.getWidth()) / this._element.getHeight() + "px; flex-shrink:0;");
        }
        else {
            DomTools.overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: " + (this._element.getHeight() * 100) / this._element.getWidth() + "%;");
        }
        return surrogate;
    };
    return ElementSurrogate;
}());
export default ElementSurrogate;
