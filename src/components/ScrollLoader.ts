/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addScrollEventListener } from 'mibreit-dom-tools';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
import debounce from '../tools/debounce';

// avoid overloading of scroll event
const SCROLL_EVENT_TIMEOUT = 400;

export default class ScrollLoader {
  private _lazyLoader: ILazyLoader;
  private _elementLocations: Array<IElementLocationInfo> = [];

  constructor(lazyLoader: ILazyLoader, elementLocations: Array<IElementLocationInfo>) {
    this._lazyLoader = lazyLoader;
    this._elementLocations = elementLocations;
  }

  startLoader() {
    this._loadElementsWithinWindowRect();
    const debouncedLoadEvent = debounce(() => {
      this._loadElementsWithinWindowRect();
    }, SCROLL_EVENT_TIMEOUT);
    addScrollEventListener((_event: Event) => {
      debouncedLoadEvent();
    });
  }

  private _loadElementsWithinWindowRect() {
    const unloadedElementIndices: Array<number> = this._lazyLoader.getUnloadedElementIndices();
    console.log('ScrollLoader#loadElementsWithinWindowRect - unloadedElements: ', unloadedElementIndices);
    for (let i = 0; i < unloadedElementIndices.length; i++) {
      if (this._elementLocations[unloadedElementIndices[i]].isElementWithinScrollArea()) {
        this._lazyLoader.loadElement(unloadedElementIndices[i]);
      }
    }
    // TODO: Further optimization -> stop once we leave the window area
  }
}
