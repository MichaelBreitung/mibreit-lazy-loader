/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IElementInfo from '../interfaces/IElementInfo';
import ILazyLoader from '../interfaces/ILazyLoader';
export default class ScrollLoader {
    private _lazyLoader;
    private _elementInfos;
    private _scrollLoaderDelay;
    constructor(lazyLoader: ILazyLoader, elementInfos: Array<IElementInfo>, scrollLoaderDelay?: number);
    startLoader(): void;
}
