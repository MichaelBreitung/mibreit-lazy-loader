/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './LazyLoader';
import Element from './Element';

// avoid overloading of scroll event
const SCROLL_EVENT_TIMEOUT = 400;

export default class ScrollLoader {
  private lazyLoader: LazyLoader;
  private waitingForTimeout: boolean = false;
  private elements: Array<{index: number, element: Element}> = [];

  constructor(lazyLoader: LazyLoader, elements: Array<Element>) {
    this.lazyLoader = lazyLoader;
    for (let i = 0; i < elements.length; i++)
    {
      if (!elements[i].wasLoaded())
      {
        this.elements.push({index: i, element: elements[i]});
      }
    } 
  }

  startLoader() {
    this.loadElementsWithinWindowRect();
    document.addEventListener('scroll', (_event: Event) => {
      if (!this.waitingForTimeout) {
        this.waitingForTimeout = true;
        setTimeout(() => {
          this.loadElementsWithinWindowRect();
          this.waitingForTimeout = false;
        }, SCROLL_EVENT_TIMEOUT);
      }
    });
  }

  async loadElementsWithinWindowRect() {   
    const unloadedElements: Array<{index: number, element: Element}> = [];
    for (let i = 0; i < this.elements.length; i++) { 
      if (this.elements[i].element.isElementWithinScrollArea()) {
        // it is important to wait for loading to complete -> otherwise the bounding 
        // rect of follow-up elements will be wrong
        await this.lazyLoader.loadElement(this.elements[i].index);        
      }
      else{
        unloadedElements.push(this.elements[i]);
      }
    }
    this.elements = unloadedElements;
    // TODO stop once we get out of bounds
  }
}
