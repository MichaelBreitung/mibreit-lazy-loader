/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
export default class ElementInfo implements IElementLocationInfo, IElementInfo {
    private element;
    private width;
    private height;
    private originalElementStyle;
    constructor(element: HTMLElement);
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;
    isElementWithinScrollArea(): boolean;
}
