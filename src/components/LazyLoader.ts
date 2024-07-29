/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
import ILazyLoader from '../interfaces/ILazyLoader';

const PRELOADER_WINDOW_RIGHT = 1;

export default class LazyLoader implements ILazyLoader {
  private _currentIndex: number;
  private _loaderWindowLeft: number;
  private _loaderWindowRight: number;
  private _unloadedElementIndices: Array<number> = [];
  private _elementLoaders: Array<IElementLoader & IElementLoaderInfo>;

  constructor(
    elementLoaders: Array<IElementLoader & IElementLoaderInfo>,
    loaderWindowLeft: number = 0,
    loaderWindowRight: number = PRELOADER_WINDOW_RIGHT
  ) {
    this._currentIndex = -1;
    this._elementLoaders = elementLoaders;
    this._loaderWindowLeft = loaderWindowLeft;
    this._loaderWindowRight = loaderWindowRight;
    this._updateUnloadedElementIndices();
  }

  async loadAll() {
    await this._loadElements(0, this._elementLoaders.length);
  }

  async setCurrentIndex(newIndex: number) {
    if (this._currentIndex != newIndex) {
      this._currentIndex = newIndex;
      await this._moveWindow();
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
      if (!this._unloadedElementIndices.includes(index)) {
        loaded = true;
      } else {
        console.log('LazyLoader#loadElement - index: ', index);
        try {
          loaded = await this._elementLoaders[index].load();
          if (loaded) {
            const location = this._unloadedElementIndices.indexOf(index);
            if (location > -1) {
              this._unloadedElementIndices.splice(location, 1);
            }
          }
        } catch (wasLoaded: any) {
          loaded = wasLoaded;
        }
      }
      return loaded;
    } else {
      throw new Error(`Preloader#loadElement -> invalid Index ${index}`);
    }
  }

  getElementLoaderInfos(): Array<IElementLoaderInfo> {
    return this._elementLoaders;
  }

  getUnloadedElementIndices(): Array<number> {
    return this._unloadedElementIndices;
  }

  private async _moveWindow() {
    if (this._unloadedElementIndices.length) {
      let start = this._currentIndex - this._loaderWindowLeft;
      // we add + 1 in the middle to encompass the current element. The window settings surround that element
      let end = this._currentIndex + 1 + this._loaderWindowRight;

      // 1) load from current Element forward
      await this._loadElements(
        this._currentIndex,
        end < this._elementLoaders.length ? end : this._elementLoaders.length
      );
      // 2) load from back towards current Element
      await this._loadElements(start >= 0 ? start : 0, this._currentIndex);
      // 3) handle overflow
      if (start < 0) {
        start = this._elementLoaders.length + start;
        await this._loadElements(start, this._elementLoaders.length);
      }
      if (end >= this._elementLoaders.length) {
        end = end - this._elementLoaders.length;
        await this._loadElements(0, end);
      }
    }
  }

  private async _loadElements(start: number, end: number) {
    for (let i = start < 0 ? 0 : start; i < end && i < this._elementLoaders.length; i++) {
      await this.loadElement(i);
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
