/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';

export default class ElementInfo implements IElementLocationInfo, IElementInfo {
  private _element: HTMLElement;
  private _width: number;
  private _height: number;
  private _originalElementStyle: string;

  constructor(element: HTMLElement) {
    this._element = element;
    const originalStyle = DomTools.getAttribute(element, 'class');       
    this._originalElementStyle = originalStyle ? originalStyle : '';    
    this._width = parseInt(DomTools.getAttribute(element, 'width'));
    this._height = parseInt(DomTools.getAttribute(element, 'height'));
  }

  getWidth(): number {
    return this._width;
  }

  getHeight(): number {
    return this._height;
  }

  getStyle(): string {
    return this._originalElementStyle;
  }

  isElementWithinScrollArea(): boolean {
    return DomTools.isElementWithinWindow(this._element);
  }
}
