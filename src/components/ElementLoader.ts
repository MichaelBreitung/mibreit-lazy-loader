/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
import styles from './ElementLoader.module.css';

const LAZY_LOADING_CLASS = 'lazy-loading';
const DATA_SRC_ATTRIBUTE = "data-src";
const SRC_ATTRIBUTE ="src";

enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class ElementLoader implements IElementLoader, IElementLoaderInfo {
  protected _element: HTMLElement;
  private _state: EImageState = EImageState.INACTIVE;
  private _wasLoadedCallbacks: Array<() => void> = new Array();
  private _dataSrc: string | null = null;

  constructor(element: HTMLElement) {
    this._element = element;
    this._dataSrc = DomTools.getAttribute(element, DATA_SRC_ATTRIBUTE);
    const classes = DomTools.getCssClasses(element)?.split(',');

    if (this._dataSrc || (classes && classes.includes(LAZY_LOADING_CLASS))) {
      this._state = EImageState.INACTIVE;
      this._setBaseStyle();
    } else {
      this._state = EImageState.LOADED;
    }

    console.log('ElementLoader#constructor -> state', this._state);
  }

  load(): Promise<boolean> {
    console.log('ElementLoader#load');
    return new Promise((resolve, reject) => {
      if (this._state == EImageState.INACTIVE) {
        this._element.onload = () => {
          DomTools.removeAttribute(this._element, DATA_SRC_ATTRIBUTE);
          this._state = EImageState.LOADED;
          this._wasLoadedCallbacks.forEach((callback) => {
            callback();
          });
          // A little explanation for the timeout: we need to decouple the
          // change of the load style and the fade it will trigger from the
          // change to the dom that might be triggered by the callbacks
          // -> this needs to happen separately and a timeout helps to provide
          // this separation
          setTimeout(() => {
            this._setLoadedStyle();
          }, 50);
          resolve(true);
        };
        this._triggerLoad();
        this._state = EImageState.LOADING;
        this._setLoadingStyle();
      } else if (this._state === EImageState.LOADING) {
        reject(false);
      } else {
        reject(true);
      }
    });
  }

  wasLoaded(): boolean {
    return this._state === EImageState.LOADED;
  }

  addWasLoadedCallback(callback: () => void) {
    if (!this._wasLoadedCallbacks.includes(callback)) {
      this._wasLoadedCallbacks.push(callback);
    }
  }

  private _triggerLoad() {
    if (this._dataSrc) {
      DomTools.setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
    } 
    DomTools.removeCssClass(this._element, LAZY_LOADING_CLASS);
  }

  private _setBaseStyle() {
    DomTools.addCssStyle(this._element, 'opacity', '0');
  }

  private _setLoadingStyle() {
    DomTools.addCssClass(this._element, styles.element_animate);
  }

  private _setLoadedStyle() {
    DomTools.removeCssStyle(this._element, 'opacity');
    setTimeout(() => {
      DomTools.removeCssClass(this._element, styles.element_animate);
    }, 1000);
  }
}
