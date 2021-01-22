/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import LazyLoader from './LazyLoader';

// avoid overloading of scroll event
const SCROLL_EVENT_TIMEOUT = 400;

export default class ScrollLoader {
  private lazyLoader: LazyLoader;
  private waitingForTimeout: boolean = false;
  private elements: NodeListOf<HTMLElement>;

  constructor(lazyLoader: LazyLoader, elements: NodeListOf<HTMLElement>) {
    this.lazyLoader = lazyLoader;
    this.elements = elements;
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

  private isElementWithinScrollArea(element: HTMLElement): boolean {
    const elementRect: DOMRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return elementRect.top + elementRect.height > 0 && elementRect.top < windowHeight;
  }

  async loadElementsWithinWindowRect() {
    console.log('laodelements');
    for (let i = 0; i < this.elements.length; i++) {
      if (this.isElementWithinScrollArea(this.elements[i])) {
        // it is important to wait for loading to complete -> otherwise the bounding 
        // rect of follow-up elements will be wrong
        await this.lazyLoader.loadElement(i);
      }
    }

    // TODO remove loaded elements
    // TODO stop once we get out of bounds
  }
}
