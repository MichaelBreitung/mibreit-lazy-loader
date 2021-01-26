/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import ElementLoader from './ElementLoader';
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';

export default class Element extends ElementLoader implements IElementLocationInfo, IElementInfo {
  private width: number;
  private height: number;
  private originalElementStyle: string;

  constructor(element: HTMLElement) {
    const originalStyle = DomTools.getAttribute(element, 'class');    
    super(element);
    this.originalElementStyle = originalStyle ? originalStyle : '';    
    this.width = parseInt(DomTools.getAttribute(element, 'width'));
    this.height = parseInt(DomTools.getAttribute(element, 'height'));
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getStyle(): string {
    return this.originalElementStyle;
  }

  isElementWithinScrollArea(): boolean {
    return DomTools.isElementWithinWindow(this.element);
  }
}
