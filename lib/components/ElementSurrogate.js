/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import DomTools from '../tools/domTools';
var ElementSurrogate = /** @class */ (function () {
    function ElementSurrogate(elementInfo) {
        this.elementInfo = elementInfo;
        this.surrogate = this.createSurrogate();
    }
    ElementSurrogate.prototype.wrap = function (elementHandle) {
        DomTools.wrapElements([elementHandle], this.surrogate);
    };
    ElementSurrogate.prototype.unwrap = function () {
        DomTools.unwrapElements(this.surrogate);
        DomTools.removeElement(this.surrogate);
    };
    ElementSurrogate.prototype.getWidth = function () {
        return this.elementInfo.getWidth();
    };
    ElementSurrogate.prototype.getHeight = function () {
        return this.elementInfo.getHeight();
    };
    ElementSurrogate.prototype.getStyle = function () {
        return this.elementInfo.getStyle();
    };
    ElementSurrogate.prototype.isElementWithinScrollArea = function () {
        return DomTools.isElementWithinWindow(this.surrogate);
    };
    ElementSurrogate.prototype.createSurrogate = function () {
        var surrogate = DomTools.createElement('div');
        DomTools.applyCssClass(surrogate, "mibreit_lazyLoader_surrogate");
        DomTools.applyCssStyles(surrogate, "overflow: hidden; width: 100%; height: 0; padding-bottom: " + (this.elementInfo.getHeight() * 100) / this.elementInfo.getWidth() + "%;");
        return surrogate;
    };
    return ElementSurrogate;
}());
export default ElementSurrogate;
