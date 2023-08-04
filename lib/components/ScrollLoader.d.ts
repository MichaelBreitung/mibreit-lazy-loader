/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementLocationInfo from '../interfaces/IElementLocationInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
export default class ScrollLoader {
    private _lazyLoader;
    private _elementLocations;
    constructor(lazyLoader: ILazyLoader, elementLocations: Array<IElementLocationInfo>);
    startLoader(): void;
    private _loadElementsWithinWindowRect;
}
