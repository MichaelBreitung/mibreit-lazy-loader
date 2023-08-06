/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
export default class ElementInfo {
    constructor(element) {
        const width = DomTools.getAttribute(element, 'width');
        const height = DomTools.getAttribute(element, 'height');
        if (width == null || height == null) {
            throw new Error('ElementInfo#constructor - supported elements need a width and height property');
        }
        const originalStyle = DomTools.getAttribute(element, 'class');
        this._element = element;
        this._originalElementStyle = originalStyle ? originalStyle : '';
        this._width = parseInt(width);
        this._height = parseInt(height);
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
    getStyle() {
        return this._originalElementStyle;
    }
    isElementWithinScrollArea() {
        return DomTools.isElementWithinWindow(this._element);
    }
}
