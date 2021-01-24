/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import LazyLoader from './LazyLoader';
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
export default class ScrollLoader {
    private lazyLoader;
    private waitingForTimeout;
    private elementLocations;
    constructor(lazyLoader: LazyLoader, elementLocations: Array<IElementLocationInfo>);
    startLoader(): void;
    private gatedLoadElementsWithinWindowRect;
    private loadElementsWithinWindowRect;
}
