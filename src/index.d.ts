/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import LazyLoader from './components/LazyLoader';
export declare enum ELazyMode {
    SIMPLE_DEFER = 0,
    WINDOWED_EXTERNAL = 1,
    WINDOWED_SCROLL = 2
}
export declare type LazyLoadConfig = {
    elementSelector: string;
    preloaderBeforeSize?: number;
    preloaderAfterSize?: number;
    mode?: ELazyMode;
    useSurrogate?: boolean;
};
export declare function lazyLoad(config: LazyLoadConfig): LazyLoader;
