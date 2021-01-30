/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ElementLoader from './ElementLoader';
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
export default class Element extends ElementLoader implements IElementLocationInfo, IElementInfo {
    private _elementInfo;
    constructor(element: HTMLElement);
    getHtmlElement(): HTMLElement;
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;
    isElementWithinScrollArea(): boolean;
}
