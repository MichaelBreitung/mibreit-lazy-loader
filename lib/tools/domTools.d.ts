/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export declare type TElementDimention = {
    width: number;
    height: number;
};
declare function documentReady(callback: () => void): void;
declare function createElement(tagName: string): HTMLElement;
declare function removeElement(element: HTMLElement): void;
declare function wrapElements(elements: Array<Node>, wrapper: HTMLElement): void;
declare function unwrapElements(wrapper: HTMLElement): void;
declare function getElementDimension(element: HTMLElement): TElementDimention;
declare function isElementWithinWindow(element: HTMLElement): boolean;
declare function getCssClass(element: HTMLElement): string;
declare function applyCssClass(element: HTMLElement, cssClass: string | null): void;
declare function getCssStyle(element: HTMLElement, styleName: string): string;
declare function applyCssStyle(element: HTMLElement, styleName: string, styleProperty: string | null): void;
declare function applyCssStyles(element: HTMLElement, styles: string | null): void;
declare function getAttribute(element: HTMLElement, attribute: string): string;
declare function setAttribute(element: HTMLElement, attribute: string, value: string): void;
declare function removeAttribute(element: HTMLElement, attribute: string): void;
declare function addScrollEventListener(callback: (event: UIEvent) => void): void;
declare function addResizeEventListener(callback: (event: UIEvent) => void): void;
declare function addEventListener(element: HTMLElement, event: string, callback: () => void): void;
declare function getElements(selector: string): NodeListOf<HTMLElement>;
declare const _default: {
    documentReady: typeof documentReady;
    createElement: typeof createElement;
    removeElement: typeof removeElement;
    wrapElements: typeof wrapElements;
    unwrapElements: typeof unwrapElements;
    getElementDimension: typeof getElementDimension;
    isElementWithinWindow: typeof isElementWithinWindow;
    getCssClass: typeof getCssClass;
    applyCssClass: typeof applyCssClass;
    applyCssStyles: typeof applyCssStyles;
    getCssStyle: typeof getCssStyle;
    applyCssStyle: typeof applyCssStyle;
    getAttribute: typeof getAttribute;
    setAttribute: typeof setAttribute;
    removeAttribute: typeof removeAttribute;
    addScrollEventListener: typeof addScrollEventListener;
    addResizeEventListener: typeof addResizeEventListener;
    addEventListener: typeof addEventListener;
    getElements: typeof getElements;
};
export default _default;
