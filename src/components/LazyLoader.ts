/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
import ILazyLoader from '../interfaces/ILazyLoader';

const PRELOADER_WINDOW_SIZE = 5;

export default class LazyLoader implements ILazyLoader {
  private _currentIndex: number;
  private _preloaderBeforeSize: number;
  private _preloaderAfterSize: number;  
  private _unloadedElementIndices: Array<number> = [];
  private _elementLoaders: Array<IElementLoader & IElementLoaderInfo>;

  constructor(
    elementLoaders: Array<IElementLoader & IElementLoaderInfo>,
    preloaderBeforeSize: number = 0,
    preloaderAfterSize: number = PRELOADER_WINDOW_SIZE
  ) {
    this._currentIndex = -1;
    this._elementLoaders = elementLoaders;
    this._preloaderBeforeSize = preloaderBeforeSize;
    this._preloaderAfterSize = preloaderAfterSize;
    this._updateUnloadedElementIndices();
  }

  loadAll() {
    this._loadElements(0, this._elementLoaders.length);
  }

  setCurrentIndex(newIndex: number) {
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
  async loadElement(index: number): Promise<boolean> {    
    if (index >= 0 && index < this._elementLoaders.length) {
      let loaded = false;
      if (!this._unloadedElementIndices.includes(index))
      {
        loaded = true;
      }
      else{        
        console.log("LazyLoader#loadElement - index: ", index);
        try {
          loaded = await this._elementLoaders[index].load();
          if (loaded) {
            const location = this._unloadedElementIndices.indexOf(index);
            if (location > -1) {
              this._unloadedElementIndices.splice(location, 1);
            }
          }
        } catch (wasLoaded) {
          loaded = wasLoaded;
        }
      }
      return loaded;
    } else {
      throw new Error(`Preloader#loadElement -> invalid Index ${index}`);
    }
  }

  getElementLoaderInfos(): Array<IElementLoaderInfo>
  {
    return this._elementLoaders;
  }

  getUnloadedElementIndices(): Array<number> {
    return this._unloadedElementIndices;
  }

  private _moveWindow() {
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

  private _loadElements(start: number, end: number) {
    for (let i = start < 0 ? 0 : start; i < end && i < this._elementLoaders.length; i++) {
      this.loadElement(i);
    }
  }

  private _updateUnloadedElementIndices() {
    for (let i = 0; i < this._elementLoaders.length; i++) {
      if (!this._elementLoaders[i].wasLoaded()) {
        this._unloadedElementIndices.push(i);
      }
    }
  }
}
