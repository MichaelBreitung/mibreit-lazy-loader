/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IElementInfo from '../interfaces/IElementInfo';
import ILazyLoader from '../interfaces/ILazyLoader';

const LOAD_DELAY = 200;

export default class ScrollLoader {
  private _lazyLoader: ILazyLoader;
  private _elementInfos: Array<IElementInfo> = [];
  private _scrollLoaderDelay: number;

  constructor(lazyLoader: ILazyLoader, elementInfos: Array<IElementInfo>, scrollLoaderDelay: number = LOAD_DELAY) {
    this._lazyLoader = lazyLoader;
    this._elementInfos = elementInfos;
    this._scrollLoaderDelay = scrollLoaderDelay;
  }

  startLoader() {
    const pendingLoads = new Map<Element, ReturnType<typeof setTimeout>>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            pendingLoads.delete(entry.target);
            const index = this._elementInfos.findIndex((info) => info.getHtmlElement() === entry.target);
            if (index !== -1) {
              this._lazyLoader.loadElement(index).then((loaded) => {
                if (loaded) {
                  observer.unobserve(entry.target);
                }
              });
            }
          }, this._scrollLoaderDelay);
          pendingLoads.set(entry.target, timer);
        } else {
          const pending = pendingLoads.get(entry.target);
          if (pending !== undefined) {
            clearTimeout(pending);
            pendingLoads.delete(entry.target);
          }
        }
      });
    });

    this._elementInfos.forEach((info) => {
      observer.observe(info.getHtmlElement());
    });
  }
}
