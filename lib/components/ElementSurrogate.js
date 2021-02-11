/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
var ElementSurrogate = /** @class */ (function () {
    function ElementSurrogate(elementInfo) {
        this._elementInfo = elementInfo;
        this._surrogate = this._createSurrogate();
    }
    ElementSurrogate.prototype.wrap = function (elementHandle) {
        DomTools.wrapElements([elementHandle], this._surrogate);
    };
    ElementSurrogate.prototype.unwrap = function () {
        DomTools.unwrapElements(this._surrogate);
        DomTools.removeElement(this._surrogate);
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
        return DomTools.isElementWithinWindow(this._surrogate);
    };
    ElementSurrogate.prototype._createSurrogate = function () {
        var surrogate = DomTools.createElement('div');
        DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
        DomTools.overwriteCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: " + (this._elementInfo.getHeight() * 100) / this._elementInfo.getWidth() + "%;");
        return surrogate;
    };
    return ElementSurrogate;
}());
export default ElementSurrogate;
