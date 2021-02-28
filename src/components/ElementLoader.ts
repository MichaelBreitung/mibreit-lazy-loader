/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLoader from '../interfaces/IElementLoader';
import IElementLoaderInfo from '../interfaces/IElementLoaderInfo';
import styles from './ElementLoader.module.css';

export const DATA_SRC_ATTRIBUTE = 'data-src';
export const SRC_ATTRIBUTE = 'src';

enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class ElementLoader implements IElementLoader, IElementLoaderInfo {
  protected _element: HTMLElement;  
  private _state: EImageState = EImageState.INACTIVE;
  private _wasLoadedCallbacks: Array<() => void> = new Array();

  constructor(element: HTMLElement) {
    this._element = element;
    if (!DomTools.hasAttribute(element, DATA_SRC_ATTRIBUTE)) {
      this._state = EImageState.LOADED;
    } else {
      this._state = EImageState.INACTIVE;
      this._setBaseStyle();
    }
  }

  load(): Promise<boolean> {
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
        this._state = EImageState.LOADING;
        this._setLoadingStyle();
        const dataSrc = DomTools.getAttribute(this._element, DATA_SRC_ATTRIBUTE);
        // @ts-ignore - if state is inactive we know that an element has a data source
        DomTools.setAttribute(this._element, SRC_ATTRIBUTE, dataSrc);
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
