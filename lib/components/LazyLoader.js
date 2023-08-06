/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PRELOADER_WINDOW_SIZE = 5;
export default class LazyLoader {
    constructor(elementLoaders, preloaderBeforeSize = 0, preloaderAfterSize = PRELOADER_WINDOW_SIZE) {
        this._unloadedElementIndices = [];
        this._currentIndex = -1;
        this._elementLoaders = elementLoaders;
        this._preloaderBeforeSize = preloaderBeforeSize;
        this._preloaderAfterSize = preloaderAfterSize;
        this._updateUnloadedElementIndices();
    }
    loadAll() {
        this._loadElements(0, this._elementLoaders.length);
    }
    setCurrentIndex(newIndex) {
        if (this._currentIndex != newIndex) {
            this._currentIndex = newIndex;
            this._moveWindow();
        }
    }
    /**
     * Will directly load an Element without changing the window of loaded Elements. This
     * has to be handled separately by setCurrentIndex
     *
     * @return {Promise} Promise that will resolve with true once the Element is loaded
     *         or will resolve right away with false, if the Element is in loading state;
     *         It will reject an invalid index with a error message
     */
    loadElement(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (index >= 0 && index < this._elementLoaders.length) {
                let loaded = false;
                if (!this._unloadedElementIndices.includes(index)) {
                    loaded = true;
                }
                else {
                    console.log("LazyLoader#loadElement - index: ", index);
                    try {
                        loaded = yield this._elementLoaders[index].load();
                        if (loaded) {
                            const location = this._unloadedElementIndices.indexOf(index);
                            if (location > -1) {
                                this._unloadedElementIndices.splice(location, 1);
                            }
                        }
                    }
                    catch (wasLoaded) {
                        loaded = wasLoaded;
                    }
                }
                return loaded;
            }
            else {
                throw new Error(`Preloader#loadElement -> invalid Index ${index}`);
            }
        });
    }
    getElementLoaderInfos() {
        return this._elementLoaders;
    }
    getUnloadedElementIndices() {
        return this._unloadedElementIndices;
    }
    _moveWindow() {
        if (this._unloadedElementIndices.length) {
            let start = this._currentIndex - this._preloaderBeforeSize;
            let end = this._currentIndex + this._preloaderAfterSize;
            // 1) load from current Element forward
            this._loadElements(this._currentIndex, end < this._elementLoaders.length ? end : this._elementLoaders.length);
            // 2) load from back towards current Element
            this._loadElements(start >= 0 ? start : 0, this._currentIndex);
            // 3) handle overflow
            if (start < 0) {
                start = this._elementLoaders.length + start;
                this._loadElements(start, this._elementLoaders.length);
            }
            if (end >= this._elementLoaders.length) {
                end = end - this._elementLoaders.length;
                this._loadElements(0, end);
            }
        }
    }
    _loadElements(start, end) {
        for (let i = start < 0 ? 0 : start; i < end && i < this._elementLoaders.length; i++) {
            this.loadElement(i);
        }
    }
    _updateUnloadedElementIndices() {
        for (let i = 0; i < this._elementLoaders.length; i++) {
            if (!this._elementLoaders[i].wasLoaded()) {
                this._unloadedElementIndices.push(i);
            }
        }
    }
}
