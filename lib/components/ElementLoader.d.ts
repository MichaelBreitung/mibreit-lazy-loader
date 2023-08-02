/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
export default class ElementLoader implements IElementLoader, IElementLoaderInfo {
    protected _element: HTMLElement;
    private _state;
    private _wasLoadedCallbacks;
    private _dataSrc;
    constructor(element: HTMLElement);
    load(): Promise<boolean>;
    wasLoaded(): boolean;
    addWasLoadedCallback(callback: () => void): void;
    private _triggerLoad;
    private _finishLoad;
    private _setBaseStyle;
    private _setLoadingStyle;
    private _setLoadedStyle;
}
