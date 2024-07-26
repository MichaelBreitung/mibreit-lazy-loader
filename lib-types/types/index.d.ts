export declare enum ELazyMode {
    SIMPLE_DEFER = 0,
    WINDOWED_EXTERNAL = 1,
    WINDOWED_SCROLL = 2,
    WINDOWED_SCROLL_HORIZONTAL = 3
}
export type LazyLoaderConfig = {
    loaderWindowLeft?: number;
    loaderWindowRight?: number;
    mode?: ELazyMode;
    useSurrogate?: boolean;
};
export declare function checkLazyLoaderConfig(config: LazyLoaderConfig): void;
