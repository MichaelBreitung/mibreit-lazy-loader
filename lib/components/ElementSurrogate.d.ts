/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import Element from './Element';
export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
    protected _surrogate: HTMLElement;
    protected _element: Element;
    constructor(element: Element, horizontal?: boolean);
    wrap(elementHandle: HTMLElement): void;
    unwrap(): void;
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;
    isElementWithinScrollArea(): boolean;
    resize(horizontal: boolean): void;
    private _createSurrogate;
}
