/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
export default class ScrollLoader {
    private lazyLoader;
    private waitingForTimeout;
    private elementLocations;
    constructor(lazyLoader: ILazyLoader, elementLocations: Array<IElementLocationInfo>);
    startLoader(): void;
    private gatedLoadElementsWithinWindowRect;
    private loadElementsWithinWindowRect;
}
