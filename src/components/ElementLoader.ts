/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssClass,
  addCssStyle,
  getAttribute,
  getCssClasses,
  removeAttribute,
  removeCssClass,
  removeCssStyle,
  setAttribute,
} from 'mibreit-dom-tools';
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';

const LAZY_LOADING_CLASS = 'mbll__marker';
const LAZY_LOADING_ANIMATE_CLASS = 'mbll__transition';
const DATA_SRC_ATTRIBUTE = 'data-src';
const SRC_ATTRIBUTE = 'src';

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
    this._dataSrc = getAttribute(element, DATA_SRC_ATTRIBUTE);
    const classes = getCssClasses(element)?.split(',');

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
          this._finishLoad();
          resolve(true);
        };
        this._triggerLoad();
        this._state = EImageState.LOADING;
        this._setLoadingStyle();
        if (this._element instanceof HTMLImageElement && (this._element as HTMLImageElement).complete) {
          // images that have been cached don't trigger the onload event, so we manually trigger it
          this._element.onload = null;
          this._finishLoad();
          resolve(true);
        }
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
      setAttribute(this._element, SRC_ATTRIBUTE, this._dataSrc);
    }
    removeCssClass(this._element, LAZY_LOADING_CLASS);
  }

  private _finishLoad() {
    console.log('ElementLoader#_finishLoad');
    removeAttribute(this._element, DATA_SRC_ATTRIBUTE);
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
  }

  private _setBaseStyle() {
    addCssStyle(this._element, 'opacity', '0');
  }

  private _setLoadingStyle() {
    addCssClass(this._element, LAZY_LOADING_ANIMATE_CLASS);
  }

  private _setLoadedStyle() {
    removeCssStyle(this._element, 'opacity');
    setTimeout(() => {
      removeCssClass(this._element, LAZY_LOADING_ANIMATE_CLASS);
    }, 1000);
  }
}
