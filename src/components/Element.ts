/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ElementLoader from './ElementLoader';
import IElementInfo from '../interfaces/IElementInfo';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ElementInfo from './ElementInfo';

export default class Element extends ElementLoader implements IElementLocationInfo, IElementInfo {
  private _elementInfo: ElementInfo;

  constructor(element: HTMLElement) {
    super(element);
    this._elementInfo = new ElementInfo(this._element);
  }

  getHtmlElement(): HTMLElement {
    return this._element;
  }

  getWidth(): number {
    return this._elementInfo.getWidth();
  }

  getHeight(): number {
    return this._elementInfo.getHeight();
  }

  getStyle(): string {
    return this._elementInfo.getStyle();
  }

  isElementWithinScrollArea(): boolean {
    return this._elementInfo.isElementWithinScrollArea();
  }
}
