/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
var ElementInfo = /** @class */ (function () {
    function ElementInfo(element) {
        var width = DomTools.getAttribute(element, 'width');
        var height = DomTools.getAttribute(element, 'height');
        if (width == null || height == null) {
            throw new Error('ElementInfo#constructor - supported elements need a width and height property');
        }
        var originalStyle = DomTools.getAttribute(element, 'class');
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
        return DomTools.isElementWithinWindow(this._element);
    };
    return ElementInfo;
}());
export default ElementInfo;
