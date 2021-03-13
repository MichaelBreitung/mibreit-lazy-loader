/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ILazyLoader from '../interfaces/ILazyLoader';
import Element from '../components/Element';
export declare enum ELazyMode {
    SIMPLE_DEFER = 0,
    WINDOWED_EXTERNAL = 1,
    WINDOWED_SCROLL = 2,
    WINDOWED_SCROLL_HORIZONTAL = 3
}
export declare type LazyLoaderConfig = {
    preloaderBeforeSize?: number;
    preloaderAfterSize?: number;
    mode?: ELazyMode;
    useSurrogate?: boolean;
};
export declare function createLazyLoaderFromElements(elements: Array<Element>, config: LazyLoaderConfig): ILazyLoader;
export default function (elementSelector: string, config: LazyLoaderConfig): ILazyLoader;
