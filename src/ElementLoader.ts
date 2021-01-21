/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import styles from './ElementLoader.module.css';

export const DATA_SRC_ATTRIBUTE = 'data-src';
export const SRC_ATTRIBUTE = 'src';

enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class ElementLoader {
  private element: HTMLElement;
  private originalElementStyle: string;
  private state: EImageState = EImageState.INACTIVE;
  private wasLoadedCallbacks: Array<() => void> = new Array();

  constructor(element: HTMLElement) {
    this.element = element;

    if (element.hasAttribute('class')) {
      this.originalElementStyle = this.element.getAttribute('class');
    } else {
      this.originalElementStyle = '';
    }

    if (!this.element.hasAttribute(DATA_SRC_ATTRIBUTE)) {
      this.state = EImageState.LOADED;
    } else {
      this.state = EImageState.INACTIVE;
      this.setLoadingStyle();
    }
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.state === EImageState.INACTIVE) {
        this.element.onload = () => {
          this.element.removeAttribute(DATA_SRC_ATTRIBUTE);
          this.state = EImageState.LOADED;
          this.setLoadedStyle();
          this.wasLoadedCallbacks.forEach((callback) => {
            callback();
          });
          resolve(true);
        };
        this.state = EImageState.LOADING;
        this.setLoadingStyle();
        const dataSrc = this.element.getAttribute(DATA_SRC_ATTRIBUTE);
        this.element.setAttribute(SRC_ATTRIBUTE, dataSrc);
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

  private setLoadingStyle() {
    this.element.setAttribute('class', `${this.originalElementStyle} ${styles.element} ${styles.element_loading}`);
  }

  private setLoadedStyle() {
    if (this.originalElementStyle.length > 0) {
      this.element.setAttribute('class', `${this.originalElementStyle} ${styles.element}`);
      setTimeout(() => {
        this.element.setAttribute('class', this.originalElementStyle);
      }, 1000);
    } else if (this.element.hasAttribute('class')) {
      this.element.setAttribute('class', `${styles.element}`);
      setTimeout(() => {
        this.element.removeAttribute('class');
      }, 1000);
    }
  }
}
