/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLoader from '../interfaces/IElementLoader';
export declare const DATA_SRC_ATTRIBUTE = "data-src";
export declare const SRC_ATTRIBUTE = "src";
export default class ElementLoader implements IElementLoader {
    protected element: HTMLElement;
    private state;
    private wasLoadedCallbacks;
    constructor(element: HTMLElement);
    load(): Promise<boolean>;
    wasLoaded(): boolean;
    addWasLoadedCallback(callback: () => void): void;
    private setBaseStyle;
    private setLoadingStyle;
    private setLoadedStyle;
}
