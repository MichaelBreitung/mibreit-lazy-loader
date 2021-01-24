/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DomTools from '../tools/domTools';
import ElementLoader from './ElementLoader';
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(element) {
        var _this = _super.call(this, element) || this;
        _this.width = parseInt(DomTools.getAttribute(element, 'width'));
        _this.height = parseInt(DomTools.getAttribute(element, 'height'));
        return _this;
    }
    Element.prototype.getWidth = function () {
        return this.width;
    };
    Element.prototype.getHeight = function () {
        return this.height;
    };
    Element.prototype.getStyle = function () {
        return this.originalElementStyle;
    };
    Element.prototype.isElementWithinScrollArea = function () {
        return DomTools.isElementWithinWindow(this.element);
    };
    return Element;
}(ElementLoader));
export default Element;
