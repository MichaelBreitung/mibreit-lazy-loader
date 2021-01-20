/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ElementLoader from './ElementLoader';

const PRELOADER_WINDOW_SIZE = 5;

export default class LazyLoader {
  private currentIndex: number;
  private preloaderBeforeSize: number;
  private preloaderAfterSize: number;
  private nrElementsLoaded: number;
  private elementLoaders: Array<ElementLoader>;

  constructor(
    elementLoaders: Array<ElementLoader>,
    preloaderBeforeSize = 0,
    preloaderAfterSize = PRELOADER_WINDOW_SIZE
  ) {
    this.currentIndex = -1;
    this.elementLoaders = elementLoaders;
    this.preloaderBeforeSize = preloaderBeforeSize;
    this.preloaderAfterSize = preloaderAfterSize;
    this.nrElementsLoaded = this.getLoadedCount();  
  }

  loadAll()
  {
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
    if (index >= 0 && index < this.elementLoaders.length) {
      let loaded = false;
      try {
        loaded = await this.elementLoaders[index].load();
        if (loaded) {
          this.nrElementsLoaded++;
        }
      } catch (wasLoaded) {
        loaded = wasLoaded;
      }
      return loaded;
    } else {
      throw new Error(`Preloader#loadElement -> invalid Index ${index}`);
    }
  }

  private moveWindow() {
    if (this.nrElementsLoaded < this.elementLoaders.length) {
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

  private getLoadedCount() {
    let loadedCount = 0;
    this.elementLoaders.forEach((loader: ElementLoader) => {
      if (loader.wasLoaded()) {
        loadedCount++;
      }
    });
    return loadedCount;
  }
}
