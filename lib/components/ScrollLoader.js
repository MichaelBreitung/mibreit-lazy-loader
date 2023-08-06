/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addScrollEventListener } from 'mibreit-dom-tools';
import debounce from '../tools/debounce';
// avoid overloading of scroll event
var SCROLL_EVENT_TIMEOUT = 400;
var ScrollLoader = /*@__PURE__*/ (function () {
    function ScrollLoader(lazyLoader, elementLocations) {
        this._elementLocations = [];
        this._lazyLoader = lazyLoader;
        this._elementLocations = elementLocations;
    }
    ScrollLoader.prototype.startLoader = function () {
        var _this = this;
        this._loadElementsWithinWindowRect();
        var debouncedLoadEvent = debounce(function () {
            _this._loadElementsWithinWindowRect();
        }, SCROLL_EVENT_TIMEOUT);
        addScrollEventListener(function (_event) {
            debouncedLoadEvent();
        });
    };
    ScrollLoader.prototype._loadElementsWithinWindowRect = function () {
        var unloadedElementIndices = this._lazyLoader.getUnloadedElementIndices();
        console.log('ScrollLoader#loadElementsWithinWindowRect - unloadedElements: ', unloadedElementIndices);
        for (var i = 0; i < unloadedElementIndices.length; i++) {
            if (this._elementLocations[unloadedElementIndices[i]].isElementWithinScrollArea()) {
                this._lazyLoader.loadElement(unloadedElementIndices[i]);
            }
        }
        // TODO: Further optimization -> stop once we leave the window area
    };
    return ScrollLoader;
}());
export default ScrollLoader;
