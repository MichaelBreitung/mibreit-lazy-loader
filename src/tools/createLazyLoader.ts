/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ILazyLoader from '../interfaces/ILazyLoader';
import LazyLoader from '../components/LazyLoader';
import Element from '../components/Element';
import ElementSurrogate from '../components/ElementSurrogate';
import ScrollLoader from '../components/ScrollLoader';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import { DomTools } from 'mibreit-dom-tools';
import debounce from './debounce';

// constants
const RESIZE_EVENT_TIMEOUT = 400;

export enum ELazyMode {
  SIMPLE_DEFER,
  WINDOWED_EXTERNAL,
  WINDOWED_SCROLL,
  WINDOWED_SCROLL_HORIZONTAL,
}

export type LazyLoaderConfig = {
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
  mode?: ELazyMode;
  useSurrogate?: boolean;
};

function checkElementSelectorInput(elementSelector: string) {
  if (typeof elementSelector !== 'string') {
    throw new Error('createLazyLoader - first parameter needs to be a css selector string');
  }
}

function checkConfig(config: LazyLoaderConfig) {
  if (typeof config.preloaderAfterSize !== 'undefined' && typeof config.preloaderAfterSize !== 'number') {
    throw new Error('createLazyLoader - preloaderAfterSize of config must be a number');
  }
  if (typeof config.preloaderBeforeSize !== 'undefined' && typeof config.preloaderBeforeSize !== 'number') {
    throw new Error('createLazyLoader - preloaderBeforeSize of config must be a number');
  }
  if (typeof config.mode !== 'undefined' && typeof config.mode !== 'number') {
    throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2) - use type ELazyMode');
  }
  if (typeof config.useSurrogate !== 'undefined' && typeof config.useSurrogate !== 'boolean') {
    throw new Error('createLazyLoader - useSurrogate of config must be a boolean');
  }
}

function startLoader(
  loader: ILazyLoader,
  elements: Array<IElementLocationInfo>,
  mode: ELazyMode = ELazyMode.SIMPLE_DEFER
) {
  if (mode != null) {
    switch (mode) {
      case ELazyMode.WINDOWED_EXTERNAL:
        loader.loadElement(0);
        loader.setCurrentIndex(0);
        break;
      case ELazyMode.WINDOWED_SCROLL:
      case ELazyMode.WINDOWED_SCROLL_HORIZONTAL:
        const scrollLoader = new ScrollLoader(loader, elements);
        scrollLoader.startLoader();
        break;
      case ELazyMode.SIMPLE_DEFER:
      default:
        loader.loadAll();
        break;
    }
  }
}

export function createLazyLoaderFromElements(elements: Array<Element>, config: LazyLoaderConfig): ILazyLoader {
  checkConfig(config);
  const surrogates: Array<ElementSurrogate> = [];
  if (config.useSurrogate) {
    for (let i = 0; i < elements.length; i++) {
      const surrogate = new ElementSurrogate(elements[i], config.mode == ELazyMode.WINDOWED_SCROLL_HORIZONTAL);
      surrogate.wrap(elements[i].getHtmlElement());
      elements[i].addWasLoadedCallback(() => {
        surrogate.unwrap();
      });
      surrogates.push(surrogate);
    }
  }

  if (config.mode == ELazyMode.WINDOWED_SCROLL_HORIZONTAL) {
    const debouncedResizeEvent = debounce(() => {
      surrogates.forEach((surrogate) => {
        surrogate.resize(true);
      });
    }, RESIZE_EVENT_TIMEOUT);

    DomTools.addResizeEventListener(() => {
      debouncedResizeEvent();
    });
  }

  const lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);

  startLoader(lazyLoader, elements, config.mode);

  return lazyLoader;
}

export default function (elementSelector: string, config: LazyLoaderConfig): ILazyLoader {
  checkElementSelectorInput(elementSelector);
  const htmlElements: NodeListOf<HTMLElement> = DomTools.getElements(elementSelector);
  const elements: Array<Element> = [];
  for (let i = 0; i < htmlElements.length; i++) {
    const element = new Element(htmlElements[i]);
    elements.push(element);
  }
  return createLazyLoaderFromElements(elements, config);
}
