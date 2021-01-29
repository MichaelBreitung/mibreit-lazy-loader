/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
import debounce from '../tools/debounce'

// avoid overloading of scroll event
const SCROLL_EVENT_TIMEOUT = 400;

export default class ScrollLoader {
  private lazyLoader: ILazyLoader;  
  private elementLocations: Array<IElementLocationInfo> = [];

  constructor(lazyLoader: ILazyLoader, elementLocations: Array<IElementLocationInfo>) {
    this.lazyLoader = lazyLoader;
    this.elementLocations = elementLocations;
  }

  startLoader() {
    this.loadElementsWithinWindowRect();
    const debouncedLoadEvent = debounce(() => {this.loadElementsWithinWindowRect();}, SCROLL_EVENT_TIMEOUT);
    DomTools.addScrollEventListener((_event: Event) => {
      debouncedLoadEvent();
    });
  }

  private loadElementsWithinWindowRect() {
    const unloadedElementIndices: Array<number> = this.lazyLoader.getUnloadedElementIndices();
    console.log('ScrollLoader#loadElementsWithinWindowRect - unloadedElements: ', unloadedElementIndices);
    for (let i = 0; i < unloadedElementIndices.length; i++) {
      if (this.elementLocations[unloadedElementIndices[i]].isElementWithinScrollArea()) {
        this.lazyLoader.loadElement(unloadedElementIndices[i]);
      }
    }
    // TODO: Further optimization -> stop once we leave the window area
  }
}
