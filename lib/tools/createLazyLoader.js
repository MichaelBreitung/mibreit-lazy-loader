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
})(ELazyMode || (ELazyMode = {}));
export function createLazyLoaderFromElements(elements, config) {
    if (config.useSurrogate) {
        var _loop_1 = function (i) {
            var surrogate = new ElementSurrogate(elements[i]);
            surrogate.wrap(elements[i].getHtmlElement());
            elements[i].addWasLoadedCallback(function () {
                surrogate.unwrap();
            });
        };
        for (var i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    }
    var lazyLoader = new LazyLoader(elements, config.preloaderBeforeSize, config.preloaderAfterSize);
    startLoader(lazyLoader, elements, config.mode);
    return lazyLoader;
}
export default function (elementSelector, config) {
    var htmlElements = DomTools.getElements(elementSelector);
    var elements = [];
    for (var i = 0; i < htmlElements.length; i++) {
        var element = new Element(htmlElements[i]);
        elements.push(element);
    }
    return createLazyLoaderFromElements(elements, config);
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
