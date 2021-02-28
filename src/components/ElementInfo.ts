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
    const width = DomTools.getAttribute(element, 'width');
    const height = DomTools.getAttribute(element, 'height');
    if (width == null || height == null) {
      throw new Error('ElementInfo#constructor - supported elements need a width and height property');
    }
    const originalStyle = DomTools.getAttribute(element, 'class');
    this._element = element;
    this._originalElementStyle = originalStyle ? originalStyle : '';
    this._width = parseInt(width);
    this._height = parseInt(height);
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
