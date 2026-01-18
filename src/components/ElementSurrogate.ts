/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssClass,
  addCssStyle,
  createElement,
  getElementDimension,
  isElementWithinWindow,
  overwriteCssStyles,
  removeElement,
  unwrapElements,
  wrapElements,
  appendChildElement,
} from 'mibreit-dom-tools';

import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import IElementInfo from '../interfaces/IElementInfo';
import Element from './Element';

import loadingStyles from './LoadingSpinner.module.css';

export default class ElementSurrogate implements IElementLocationInfo, IElementInfo {
  protected _surrogate: HTMLElement;
  protected _element: Element;
  private _spinner: HTMLElement | null = null;

  constructor(element: Element, horizontal: boolean = false) {
    this._element = element;
    this._surrogate = this._createSurrogate(horizontal);
    wrapElements([element.getHtmlElement()], this._surrogate);
    element.addWasLoadedCallback(() => {
      if (this._spinner) {
        removeElement(this._spinner);
      }
      unwrapElements(this._surrogate);
      removeElement(this._surrogate);
    });
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
    return isElementWithinWindow(this._surrogate);
  }

  private _resize(horizontal: boolean) {
    console.log(
      'ElementSurrogate#resize',
      getElementDimension(this._surrogate).height,
      this._element.getWidth(),
      this._element.getHeight()
    );
    if (horizontal) {
      addCssStyle(
        this._surrogate,
        'width',
        `${(getElementDimension(this._surrogate).height * this._element.getWidth()) / this._element.getHeight()}px`
      );
    }
    // else nothing to do for now
  }

  private _createSurrogate(horizontal: boolean = false): HTMLElement {
    console.log('ElementSurrogate#_createSurrogate', horizontal);
    const surrogate = createElement('div');
    const aspectRatio = this._element.getWidth() / this._element.getHeight();
    addCssClass(surrogate, 'mibreit_lazyLoader_surrogate');
    this._spinner = createElement('div');
    addCssClass(this._spinner, loadingStyles.spinner);
    appendChildElement(this._spinner, surrogate);
    if (horizontal) {
      overwriteCssStyles(
        surrogate,
        `overflow: hidden; height: 100%; width: auto; aspect-ratio: ${aspectRatio}; flex-shrink:0;`
      );

      setTimeout(() => {
        this._resize(true);
      }, 0);
    } else {
      overwriteCssStyles(surrogate, `overflow: hidden; width: 100%; height: auto; aspect-ratio: ${aspectRatio};`);
    }

    return surrogate;
  }
}
