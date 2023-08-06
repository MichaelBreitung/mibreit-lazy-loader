/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import LazyLoader from '../components/LazyLoader';
import Element from '../components/Element';
import ElementSurrogate from '../components/ElementSurrogate';
import ScrollLoader from '../components/ScrollLoader';
import { DomTools } from 'mibreit-dom-tools';
export var ELazyMode;
(function (ELazyMode) {
    ELazyMode[ELazyMode["SIMPLE_DEFER"] = 0] = "SIMPLE_DEFER";
    ELazyMode[ELazyMode["WINDOWED_EXTERNAL"] = 1] = "WINDOWED_EXTERNAL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL"] = 2] = "WINDOWED_SCROLL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL_HORIZONTAL"] = 3] = "WINDOWED_SCROLL_HORIZONTAL";
})(ELazyMode || (ELazyMode = {}));
function checkElementSelectorInput(elementSelector) {
    if (typeof elementSelector !== 'string') {
        throw new Error('createLazyLoader - first parameter needs to be a css selector string');
    }
}
function checkConfig(config) {
    if (typeof config.preloaderAfterSize !== 'undefined' && typeof config.preloaderAfterSize !== 'number') {
        throw new Error('createLazyLoader - preloaderAfterSize of config must be a number');
    }
    if (typeof config.preloaderBeforeSize !== 'undefined' && typeof config.preloaderBeforeSize !== 'number') {
        throw new Error('createLazyLoader - preloaderBeforeSize of config must be a number');
    }
    if (typeof config.mode !== 'undefined' && typeof config.mode !== 'number') {
        throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2, 3) - use type ELazyMode');
    }
}
function startLoader(loader, mode = ELazyMode.SIMPLE_DEFER, elementLocations) {
    console.log('startLoader');
    if (mode != null) {
        switch (mode) {
            case ELazyMode.WINDOWED_EXTERNAL:
                loader.loadElement(0);
                loader.setCurrentIndex(0);
                break;
            case ELazyMode.WINDOWED_SCROLL:
            case ELazyMode.WINDOWED_SCROLL_HORIZONTAL:
                const scrollLoader = new ScrollLoader(loader, elementLocations);
                scrollLoader.startLoader();
                break;
            case ELazyMode.SIMPLE_DEFER:
            default:
                loader.loadAll();
                break;
        }
    }
    else {
        loader.loadAll();
    }
}
export function createLazyLoaderFromElements(elements, config) {
    checkConfig(config);
    console.log('createLazyLoaderFromElements', JSON.stringify(config));
    let elementLocations = elements;
    if (config === null || config === void 0 ? void 0 : config.useSurrogate) {
        const surrogates = [];
        if (config.mode === ELazyMode.WINDOWED_SCROLL || config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL) {
            for (let i = 0; i < elements.length; i++) {
                const surrogate = new ElementSurrogate(elements[i], config.mode === ELazyMode.WINDOWED_SCROLL_HORIZONTAL ? true : false);
                surrogates.push(surrogate);
            }
        }
        elementLocations = surrogates;
    }
    const lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    // enqueing execution of startLoader -> to ensure that resize events from Surrogates are executed before
    setTimeout(() => {
        startLoader(lazyLoader, config.mode, elementLocations);
    }, 0);
    return lazyLoader;
}
export function createLazyLoader(elementSelector, config) {
    checkElementSelectorInput(elementSelector);
    console.log('createLazyLoader', elementSelector, JSON.stringify(config));
    const htmlElements = DomTools.getElements(elementSelector);
    const elements = [];
    for (let i = 0; i < htmlElements.length; i++) {
        const element = new Element(htmlElements[i]);
        elements.push(element);
    }
    return createLazyLoaderFromElements(elements, config);
}
