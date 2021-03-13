/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import Element from './Element';

export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
  protected _surrogate: HTMLElement;
  protected _element: Element;

  constructor(element: Element, horizontal: boolean = false) {
    this._element = element;
    this._surrogate = this._createSurrogate(horizontal);
  }

  wrap(elementHandle: HTMLElement) {
    DomTools.wrapElements([elementHandle], this._surrogate);
  }

  unwrap(): void {
    DomTools.unwrapElements(this._surrogate);
    DomTools.removeElement(this._surrogate);
  }

  getWidth(): number {
    return this._element.getWidth();
  }

  getHeight(): number {
    return this._element.getHeight();
  }

  getStyle(): string {
    return this._element.getStyle();
  }

  isElementWithinScrollArea(): boolean {
    return DomTools.isElementWithinWindow(this._surrogate);
  }

  resize(horizontal: boolean)
  {
    if (horizontal)
    {
      DomTools.addCssStyle(this._surrogate, "width", `${DomTools.getElementDimension(this._surrogate).height *
        (this._element.getWidth()) / this._element.getHeight()
      }px`);
    }    
    // else nothing to do for now
  }

  private _createSurrogate(horizontal: boolean = false): HTMLElement {
    const surrogate = DomTools.createElement('div');
    DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
    if (horizontal) {
      DomTools.overwriteCssStyles(
        surrogate,
        `overflow: hidden; height: 100%; width: ${DomTools.getElementDimension(this._element.getHtmlElement()).height *
          (this._element.getWidth()) / this._element.getHeight()
        }px; flex-shrink:0;`
      );
    } else {
      DomTools.overwriteCssStyles(
        surrogate,
        `overflow: hidden; width: 100%; height: 0; padding-bottom: ${
          (this._element.getHeight() * 100) / this._element.getWidth()
        }%;`
      );
    }

    return surrogate;
  }
}
