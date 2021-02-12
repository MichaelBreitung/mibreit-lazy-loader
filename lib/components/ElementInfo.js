/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
var ElementInfo = /** @class */ (function () {
    function ElementInfo(element) {
        this._element = element;
        var originalStyle = DomTools.getAttribute(element, 'class');
        this._originalElementStyle = originalStyle ? originalStyle : '';
        this._width = parseInt(DomTools.getAttribute(element, 'width'));
        this._height = parseInt(DomTools.getAttribute(element, 'height'));
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
