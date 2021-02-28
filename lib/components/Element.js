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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ElementLoader from './ElementLoader';
import ElementInfo from './ElementInfo';
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(element) {
        var _this = _super.call(this, element) || this;
        _this._elementInfo = new ElementInfo(_this._element);
        return _this;
    }
    Element.prototype.getHtmlElement = function () {
        return this._element;
    };
    Element.prototype.getWidth = function () {
        return this._elementInfo.getWidth();
    };
    Element.prototype.getHeight = function () {
        return this._elementInfo.getHeight();
    };
    Element.prototype.getStyle = function () {
        return this._elementInfo.getStyle();
    };
    Element.prototype.isElementWithinScrollArea = function () {
        return this._elementInfo.isElementWithinScrollArea();
    };
    return Element;
}(ElementLoader));
export default Element;
