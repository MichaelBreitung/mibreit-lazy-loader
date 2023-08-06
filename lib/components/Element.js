/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ElementLoader from './ElementLoader';
import ElementInfo from './ElementInfo';
export default class Element extends ElementLoader {
    constructor(element) {
        super(element);
        this._elementInfo = new ElementInfo(this._element);
    }
    getHtmlElement() {
        return this._element;
    }
    getWidth() {
        return this._elementInfo.getWidth();
    }
    getHeight() {
        return this._elementInfo.getHeight();
    }
    getStyle() {
        return this._elementInfo.getStyle();
    }
    isElementWithinScrollArea() {
        return this._elementInfo.isElementWithinScrollArea();
    }
}
