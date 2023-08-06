/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PRELOADER_WINDOW_SIZE = 5;
var LazyLoader = /** @class */ (function () {
    function LazyLoader(elementLoaders, preloaderBeforeSize, preloaderAfterSize) {
        if (preloaderBeforeSize === void 0) { preloaderBeforeSize = 0; }
        if (preloaderAfterSize === void 0) { preloaderAfterSize = PRELOADER_WINDOW_SIZE; }
        this._unloadedElementIndices = [];
        this._currentIndex = -1;
        this._elementLoaders = elementLoaders;
        this._preloaderBeforeSize = preloaderBeforeSize;
        this._preloaderAfterSize = preloaderAfterSize;
        this._updateUnloadedElementIndices();
    }
    LazyLoader.prototype.loadAll = function () {
        this._loadElements(0, this._elementLoaders.length);
    };
    LazyLoader.prototype.setCurrentIndex = function (newIndex) {
        if (this._currentIndex != newIndex) {
            this._currentIndex = newIndex;
            this._moveWindow();
        }
    };
    /**
     * Will directly load an Element without changing the window of loaded Elements. This
     * has to be handled separately by setCurrentIndex
     *
     * @return {Promise} Promise that will resolve with true once the Element is loaded
     *         or will resolve right away with false, if the Element is in loading state;
     *         It will reject an invalid index with a error message
     */
    LazyLoader.prototype.loadElement = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var loaded, location_1, wasLoaded_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(index >= 0 && index < this._elementLoaders.length)) return [3 /*break*/, 6];
                        loaded = false;
                        if (!!this._unloadedElementIndices.includes(index)) return [3 /*break*/, 1];
                        loaded = true;
                        return [3 /*break*/, 5];
                    case 1:
                        console.log("LazyLoader#loadElement - index: ", index);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._elementLoaders[index].load()];
                    case 3:
                        loaded = _a.sent();
                        if (loaded) {
                            location_1 = this._unloadedElementIndices.indexOf(index);
                            if (location_1 > -1) {
                                this._unloadedElementIndices.splice(location_1, 1);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        wasLoaded_1 = _a.sent();
                        loaded = wasLoaded_1;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, loaded];
                    case 6: throw new Error("Preloader#loadElement -> invalid Index ".concat(index));
                }
            });
        });
    };
    LazyLoader.prototype.getElementLoaderInfos = function () {
        return this._elementLoaders;
    };
    LazyLoader.prototype.getUnloadedElementIndices = function () {
        return this._unloadedElementIndices;
    };
    LazyLoader.prototype._moveWindow = function () {
        if (this._unloadedElementIndices.length) {
            var start = this._currentIndex - this._preloaderBeforeSize;
            var end = this._currentIndex + this._preloaderAfterSize;
            // 1) load from current Element forward
            this._loadElements(this._currentIndex, end < this._elementLoaders.length ? end : this._elementLoaders.length);
            // 2) load from back towards current Element
            this._loadElements(start >= 0 ? start : 0, this._currentIndex);
            // 3) handle overflow
            if (start < 0) {
                start = this._elementLoaders.length + start;
                this._loadElements(start, this._elementLoaders.length);
            }
            if (end >= this._elementLoaders.length) {
                end = end - this._elementLoaders.length;
                this._loadElements(0, end);
            }
        }
    };
    LazyLoader.prototype._loadElements = function (start, end) {
        for (var i = start < 0 ? 0 : start; i < end && i < this._elementLoaders.length; i++) {
            this.loadElement(i);
        }
    };
    LazyLoader.prototype._updateUnloadedElementIndices = function () {
        for (var i = 0; i < this._elementLoaders.length; i++) {
            if (!this._elementLoaders[i].wasLoaded()) {
                this._unloadedElementIndices.push(i);
            }
        }
    };
    return LazyLoader;
}());
export default LazyLoader;
