/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import { isElementWithinScrollArea } from '../tools/isElementWithinScrollArea';

export default class ElementInfo implements IElementLocationInfo, IElementInfo {
  private _element: HTMLElement;
  private _width: number;
  private _height: number;
  private _originalElementStyle: string;

  constructor(element: HTMLElement) {
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    if (width == null || height == null) {
      throw new Error('ElementInfo#constructor - supported elements need a width and height property');
    }
    const originalStyle = element.getAttribute('class');
    this._element = element;
    this._originalElementStyle = originalStyle ? originalStyle : '';
    this._width = parseInt(width);
    this._height = parseInt(height);
  }

  getHtmlElement(): HTMLElement {
    return this._element;
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
    return isElementWithinScrollArea(this._element);
  }
}
