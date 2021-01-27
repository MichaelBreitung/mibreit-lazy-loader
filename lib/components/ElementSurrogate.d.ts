/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import ElementInfo from './ElementInfo';
export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
    protected surrogate: HTMLElement;
    protected elementInfo: ElementInfo;
    constructor(element: HTMLElement);
    wrap(elementHandle: HTMLElement): void;
    unwrap(): void;
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;
    isElementWithinScrollArea(): boolean;
    private createSurrogate;
}
