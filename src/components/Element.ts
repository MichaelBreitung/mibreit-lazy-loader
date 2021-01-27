/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ElementLoader from './ElementLoader';
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ElementInfo from './ElementInfo';

export default class Element extends ElementLoader implements IElementLocationInfo, IElementInfo {
  private elementInfo: ElementInfo;
 
  constructor(element: HTMLElement) {
    super(element);
    this.elementInfo = new ElementInfo(this.element);
  }

  getWidth(): number {
    return this.elementInfo.getWidth();
  }

  getHeight(): number {
    return this.elementInfo.getWidth();
  }

  getStyle(): string {
    return this.elementInfo.getStyle();
  }

  isElementWithinScrollArea(): boolean {
    return this.elementInfo.isElementWithinScrollArea();
  }
}
