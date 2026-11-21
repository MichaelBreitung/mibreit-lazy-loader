/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import Element from './Element';
import { isElementWithinScrollArea } from '../tools/isElementWithinScrollArea';

import loadingStyles from './LoadingSpinner.module.css';

export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
  protected _surrogate: HTMLElement;
  protected _element: Element;
  private _spinner: HTMLElement | null = null;

  constructor(element: Element, horizontal: boolean = false, showSpinner: boolean = false) {
    this._element = element;
    this._surrogate = this._createSurrogate(horizontal, showSpinner);
    element.setSurrogate(this._surrogate);
    const htmlElement = element.getHtmlElement();
    htmlElement.parentNode?.insertBefore(this._surrogate, htmlElement);
    this._surrogate.appendChild(htmlElement);
    element.addWasLoadedCallback(() => {
      element.setSurrogate(null);
      if (this._spinner) {
        this._spinner.remove();
      }
      [...this._surrogate.childNodes].forEach((childNode) => {
        this._surrogate.parentNode?.insertBefore(childNode, this._surrogate);
      });
      this._surrogate.remove();
    });
  }

  getHtmlElement(): HTMLElement {
    return this._surrogate;
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
    return isElementWithinScrollArea(this._surrogate);
  }

  private _resize(horizontal: boolean) {
    console.log(
      'ElementSurrogate#resize',
      this._surrogate.getBoundingClientRect().height,
      this._element.getWidth(),
      this._element.getHeight()
    );
    if (horizontal) {
      const surrogateHeight = this._surrogate.getBoundingClientRect().height;
      const surrogateWidth = (surrogateHeight * this._element.getWidth()) / this._element.getHeight();
      this._surrogate.style.setProperty('width', `${surrogateWidth}px`);
    }
    // else nothing to do for now
  }

  private _createSurrogate(horizontal: boolean = false, showSpinner: boolean = true): HTMLElement {
    console.log('ElementSurrogate#_createSurrogate', horizontal);
    const surrogate = document.createElement('div');
    const aspectRatio = this._element.getWidth() / this._element.getHeight();
    surrogate.classList.add('mibreit_lazyLoader_surrogate');
    if (showSpinner) {
      this._spinner = document.createElement('div');
      this._spinner.classList.add(loadingStyles.spinner);
      surrogate.appendChild(this._spinner);
    }
    if (horizontal) {
      surrogate.style.cssText = `overflow: hidden; height: 100%; width: auto; aspect-ratio: ${aspectRatio}; flex-shrink:0;`;

      setTimeout(() => {
        this._resize(true);
      }, 0);
    } else {
      surrogate.style.cssText = `overflow: hidden; width: 100%; height: auto; aspect-ratio: ${aspectRatio};`;
    }

    return surrogate;
  }
}
