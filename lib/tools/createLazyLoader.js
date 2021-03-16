/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import LazyLoader from '../components/LazyLoader';
import Element from '../components/Element';
import ElementSurrogate from '../components/ElementSurrogate';
import ScrollLoader from '../components/ScrollLoader';
import { DomTools } from 'mibreit-dom-tools';
import debounce from './debounce';
// constants
var RESIZE_EVENT_TIMEOUT = 400;
export var ELazyMode;
(function (ELazyMode) {
    ELazyMode[ELazyMode["SIMPLE_DEFER"] = 0] = "SIMPLE_DEFER";
    ELazyMode[ELazyMode["WINDOWED_EXTERNAL"] = 1] = "WINDOWED_EXTERNAL";
    ELazyMode[ELazyMode["WINDOWED_SCROLL"] = 2] = "WINDOWED_SCROLL";
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
        throw new Error('createLazyLoader - mode of config must be a number (0, 1, 2) - use type ELazyMode');
    }
    if (typeof config.useSurrogate !== 'undefined' && typeof config.useSurrogate !== 'boolean') {
        throw new Error('createLazyLoader - useSurrogate of config must be a boolean');
    }
    if (typeof config.surrogateModeHorizontal !== 'undefined' && typeof config.surrogateModeHorizontal !== 'boolean') {
        throw new Error('createLazyLoader - surrogateModeHorizontal of config must be a boolean');
    }
}
function startLoader(loader, elements, mode) {
    if (mode === void 0) { mode = ELazyMode.SIMPLE_DEFER; }
    if (mode != null) {
        switch (mode) {
            case ELazyMode.WINDOWED_EXTERNAL:
                loader.loadElement(0);
                loader.setCurrentIndex(0);
                break;
            case ELazyMode.WINDOWED_SCROLL:
                var scrollLoader = new ScrollLoader(loader, elements);
                scrollLoader.startLoader();
                break;
            case ELazyMode.SIMPLE_DEFER:
            default:
                loader.loadAll();
                break;
        }
    }
}
export function createLazyLoaderFromElements(elements, config) {
    checkConfig(config);
    var surrogates = [];
    if (config.useSurrogate) {
        var _loop_1 = function (i) {
            var surrogate = new ElementSurrogate(elements[i], config.surrogateModeHorizontal);
            surrogate.wrap(elements[i].getHtmlElement());
            elements[i].addWasLoadedCallback(function () {
                surrogate.unwrap();
            });
            surrogates.push(surrogate);
        };
        for (var i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    }
    if (config.surrogateModeHorizontal == true) {
        var debouncedResizeEvent_1 = debounce(function () {
            surrogates.forEach(function (surrogate) {
                surrogate.resize(true);
            });
        }, RESIZE_EVENT_TIMEOUT);
        DomTools.addResizeEventListener(function () {
            debouncedResizeEvent_1();
        });
    }
    var lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    startLoader(lazyLoader, elements, config.mode);
    return lazyLoader;
}
export default function (elementSelector, config) {
    checkElementSelectorInput(elementSelector);
    var htmlElements = DomTools.getElements(elementSelector);
    var elements = [];
    for (var i = 0; i < htmlElements.length; i++) {
        var element = new Element(htmlElements[i]);
        elements.push(element);
    }
    return createLazyLoaderFromElements(elements, config);
}
