/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLoader from '../interfaces/IElementLoader';

const PRELOADER_WINDOW_SIZE = 5;

export default class LazyLoader {
  private currentIndex: number;
  private preloaderBeforeSize: number;
  private preloaderAfterSize: number;  
  private unloadedElementIndices: Array<number> = [];
  private elementLoaders: Array<IElementLoader>;

  constructor(
    elementLoaders: Array<IElementLoader>,
    preloaderBeforeSize = 0,
    preloaderAfterSize = PRELOADER_WINDOW_SIZE
  ) {
    this.currentIndex = -1;
    this.elementLoaders = elementLoaders;
    this.preloaderBeforeSize = preloaderBeforeSize;
    this.preloaderAfterSize = preloaderAfterSize;
    this.updateUnloadedElementIndices();
  }

  loadAll() {
    this.loadElements(0, this.elementLoaders.length);
  }

  setCurrentIndex(newIndex: number) {
    if (this.currentIndex != newIndex) {
      this.currentIndex = newIndex;
      this.moveWindow();
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
    console.log("LazyLoader#loadElement - index: ", index);
    if (index >= 0 && index < this.elementLoaders.length) {
      let loaded = false;
      if (!this.unloadedElementIndices.includes(index))
      {
        loaded = true;
      }
      else{        
        try {
          loaded = await this.elementLoaders[index].load();
          if (loaded) {
            const location = this.unloadedElementIndices.indexOf(index);
            if (location > -1) {
              this.unloadedElementIndices.splice(location, 1);
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

  getUnloadedElementIndices(): Array<number> {
    return this.unloadedElementIndices;
  }

  private moveWindow() {
    if (this.unloadedElementIndices.length) {
      let start = this.currentIndex - this.preloaderBeforeSize;
      let end = this.currentIndex + this.preloaderAfterSize;

      // 1) load from current Element forward
      this.loadElements(this.currentIndex, end < this.elementLoaders.length ? end : this.elementLoaders.length);
      // 2) load from back towards current Element
      this.loadElements(start >= 0 ? start : 0, this.currentIndex);
      // 3) handle overflow
      if (start < 0) {
        start = this.elementLoaders.length + start;
        this.loadElements(start, this.elementLoaders.length);
      }
      if (end >= this.elementLoaders.length) {
        end = end - this.elementLoaders.length;
        this.loadElements(0, end);
      }
    }
  }

  private loadElements(start: number, end: number) {
    for (let i = start < 0 ? 0 : start; i < end && i < this.elementLoaders.length; i++) {
      this.loadElement(i);
    }
  }

  private updateUnloadedElementIndices() {
    for (let i = 0; i < this.elementLoaders.length; i++) {
      if (!this.elementLoaders[i].wasLoaded()) {
        this.unloadedElementIndices.push(i);
      }
    }
  }
}
