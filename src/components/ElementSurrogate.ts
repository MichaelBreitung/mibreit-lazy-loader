/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import ElementInfo from './ElementInfo';

export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
  protected surrogate: HTMLElement;
  protected elementInfo: ElementInfo;

  constructor(element: HTMLElement) {   
    this.elementInfo = new ElementInfo(element);
    this.surrogate = this.createSurrogate();    
  }

  wrap(elementHandle: HTMLElement) {
    DomTools.wrapElements([elementHandle], this.surrogate);
  }

  unwrap(): void {
    DomTools.unwrapElements(this.surrogate);
    DomTools.removeElement(this.surrogate);
  }

  getWidth(): number {
    return this.elementInfo.getWidth();
  }

  getHeight(): number {
    return this.elementInfo.getHeight();
  }

  getStyle(): string {
    return this.elementInfo.getStyle();
  }

  isElementWithinScrollArea(): boolean {
    return DomTools.isElementWithinWindow(this.surrogate);
  }

  private createSurrogate(): HTMLElement {
    const surrogate = DomTools.createElement('div');
    DomTools.addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
    DomTools.overwriteCssStyles(
      surrogate,
      `overflow: hidden; width: 100%; height: 0; padding-bottom: ${
        (this.elementInfo.getHeight() * 100) / this.elementInfo.getWidth()
      }%;`
    );
    return surrogate;
  }
}
