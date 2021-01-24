/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLoader from '../interfaces/IElementLoader';
export default class LazyLoader {
    private currentIndex;
    private preloaderBeforeSize;
    private preloaderAfterSize;
    private unloadedElementIndices;
    private elementLoaders;
    constructor(elementLoaders: Array<IElementLoader>, preloaderBeforeSize?: number, preloaderAfterSize?: number);
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
    getUnloadedElementIndices(): Array<number>;
    private moveWindow;
    private loadElements;
    private updateUnloadedElementIndices;
}
