/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export const DATA_SRC_ATTRIBUTE = 'data-src';
export const SRC_ATTRIBUTE = 'src';

enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class ElementLoader{
  private element: HTMLElement;
  private state: EImageState = EImageState.INACTIVE;
  private wasLoadedCallbacks: Array<() => void> = new Array();

  constructor(element: HTMLElement) {
    this.element = element;
    this.state = !element.hasAttribute(DATA_SRC_ATTRIBUTE) ? EImageState.LOADED : EImageState.INACTIVE;
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.state === EImageState.INACTIVE) {
        this.element.onload = () => {
          this.element.removeAttribute(DATA_SRC_ATTRIBUTE);
          this.state = EImageState.LOADED;
          this.wasLoadedCallbacks.forEach((callback) => {
            callback();
          });
          resolve(true);
        };
        this.state = EImageState.LOADING;
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
}
