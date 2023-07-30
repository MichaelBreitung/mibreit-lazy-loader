/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
export declare const LAZY_LOADING_CLASS = "lazy-loading";
export default class ElementLoader implements IElementLoader, IElementLoaderInfo {
    protected _element: HTMLElement;
    private _state;
    private _wasLoadedCallbacks;
    constructor(element: HTMLElement);
    load(): Promise<boolean>;
    wasLoaded(): boolean;
    addWasLoadedCallback(callback: () => void): void;
    private _setBaseStyle;
    private _setLoadingStyle;
    private _setLoadedStyle;
}
