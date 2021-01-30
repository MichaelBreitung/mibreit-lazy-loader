/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';

export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
  protected _surrogate: HTMLElement;
  protected _elementInfo: IElementLocationInfo & IElementInfo;

  constructor(elementInfo: IElementLocationInfo & IElementInfo) {
    this._elementInfo = elementInfo;
    this._surrogate = this._createSurrogate();
  }

  wrap(elementHandle: HTMLElement) {
    DomTools.wrapElements([elementHandle], this._surrogate);
  }

  unwrap(): void {
    DomTools.unwrapElements(this._surrogate);
    DomTools.removeElement(this._surrogate);
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
    return DomTools.isElementWithinWindow(this._surrogate);
  }

  private _createSurrogate(): HTMLElement {
    const surrogate = DomTools.createElement('div');
    DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
    DomTools.overwriteCssStyles(
      surrogate,
      `overflow: hidden; width: 100%; height: 0; padding-bottom: ${
        (this._elementInfo.getHeight() * 100) / this._elementInfo.getWidth()
      }%;`
    );
    return surrogate;
  }
}
