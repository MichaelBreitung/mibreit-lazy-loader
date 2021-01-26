/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IElementLoader from '../interfaces/IElementLoader';
import styles from './ElementLoader.module.css';

export const DATA_SRC_ATTRIBUTE = 'data-src';
export const SRC_ATTRIBUTE = 'src';

enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class ElementLoader implements IElementLoader {
  protected element: HTMLElement;  
  private state: EImageState = EImageState.INACTIVE;
  private wasLoadedCallbacks: Array<() => void> = new Array();

  constructor(element: HTMLElement) {
    this.element = element;
    if (!DomTools.hasAttribute(element, DATA_SRC_ATTRIBUTE)) {
      this.state = EImageState.LOADED;
    } else {
      this.state = EImageState.INACTIVE;
      this.setBaseStyle();
    }
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.state === EImageState.INACTIVE) {
        this.element.onload = () => {
          DomTools.removeAttribute(this.element, DATA_SRC_ATTRIBUTE);
          this.state = EImageState.LOADED;
          this.wasLoadedCallbacks.forEach((callback) => {
            callback();
          });
          this.setLoadedStyle();
          resolve(true);
        };
        this.state = EImageState.LOADING;
        this.setLoadingStyle();
        const dataSrc = DomTools.getAttribute(this.element, DATA_SRC_ATTRIBUTE);
        DomTools.setAttribute(this.element, SRC_ATTRIBUTE, dataSrc);
      } else if (this.state === EImageState.LOADING) {
        reject(false);
      } else {
        reject(true);
      }
    });
  }

  wasLoaded(): boolean {
    return this.state === EImageState.LOADED;
  }

  addWasLoadedCallback(callback: () => void) {
    if (!this.wasLoadedCallbacks.includes(callback)) {
      this.wasLoadedCallbacks.push(callback);
    }
  }

  private setBaseStyle() {
    DomTools.addCssStyle(this.element, 'opacity', '0');
  }

  private setLoadingStyle() {
    DomTools.addCssClass(this.element, styles.element_animate);
  }

  private setLoadedStyle() {
    DomTools.removeCssStyle(this.element, 'opacity');    
    setTimeout(() => {
      DomTools.removeCssClass(this.element, styles.element_animate);      
    }, 1000);
  }
}
