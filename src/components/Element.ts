/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ElementLoader from './ElementLoader';
import IElementLoader from '../interfaces/IElementLoader';

export default class Element extends ElementLoader implements IElementLoader {
  constructor(element: HTMLElement) {
    super(element);
  }

  isElementWithinScrollArea(): boolean {
    const elementRect: DOMRect = this.element.getBoundingClientRect();
    const windowHeight = window.innerHeight;  
    return elementRect.top + elementRect.height > 0 && elementRect.top < windowHeight;
  }
}
