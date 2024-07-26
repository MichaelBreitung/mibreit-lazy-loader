/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
export default class LazyLoader implements ILazyLoader {
    private _currentIndex;
    private _loaderWindowLeft;
    private _loaderWindowRight;
    private _unloadedElementIndices;
    private _elementLoaders;
    constructor(elementLoaders: Array<IElementLoader & IElementLoaderInfo>, loaderWindowLeft?: number, loaderWindowRight?: number);
    loadAll(): void;
    setCurrentIndex(newIndex: number): void;
    /**
     * Will directly load an Element without changing the window of loaded Elements. This
     * has to be handled separately by setCurrentIndex
     *
     * @return {Promise} Promise that will resolve with true once the Element is loaded
     *         or will resolve right away with false, if the Element is in loading state;
     *         It will reject an invalid index with a error message
     */
    loadElement(index: number): Promise<boolean>;
    getElementLoaderInfos(): Array<IElementLoaderInfo>;
    getUnloadedElementIndices(): Array<number>;
    private _moveWindow;
    private _loadElements;
    private _updateUnloadedElementIndices;
}
