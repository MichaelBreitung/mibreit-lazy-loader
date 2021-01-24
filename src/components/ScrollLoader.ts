/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import LazyLoader from './LazyLoader';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';

// avoid overloading of scroll event
const SCROLL_EVENT_TIMEOUT = 400;

export default class ScrollLoader {
  private lazyLoader: LazyLoader;
  private waitingForTimeout: boolean = false;
  private elementLocations: Array<IElementLocationInfo> = [];

  constructor(lazyLoader: LazyLoader, elementLocations: Array<IElementLocationInfo>) {
    this.lazyLoader = lazyLoader;
    this.elementLocations = elementLocations;
  }

  startLoader() {
    this.loadElementsWithinWindowRect();
    DomTools.addScrollEventListener((_event: Event) => {
      this.gatedLoadElementsWithinWindowRect();
    });
  }

  private async gatedLoadElementsWithinWindowRect() {
    if (!this.waitingForTimeout) {
      this.waitingForTimeout = true;
      setTimeout(() => {
        this.loadElementsWithinWindowRect();
        this.waitingForTimeout = false;
      }, SCROLL_EVENT_TIMEOUT);
    }
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
