/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
    protected surrogate: HTMLElement;
    protected elementInfo: IElementInfo;
    constructor(elementInfo: IElementInfo);
    wrap(elementHandle: HTMLElement): void;
    unwrap(): void;
    getWidth(): number;
    getHeight(): number;
    getStyle(): string;
    isElementWithinScrollArea(): boolean;
    private createSurrogate;
}
