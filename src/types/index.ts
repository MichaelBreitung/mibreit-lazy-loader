export enum ELazyMode {
  SIMPLE_DEFER,
  WINDOWED_EXTERNAL,
  WINDOWED_SCROLL,
  WINDOWED_SCROLL_HORIZONTAL,
}

export type LazyLoaderConfig = {
  loaderWindowLeft?: number;
  loaderWindowRight?: number;
  mode?: ELazyMode;
  useSurrogate?: boolean;
};

export function checkLazyLoaderConfig(config: LazyLoaderConfig) {
  if (
    typeof config.loaderWindowRight !== 'undefined' &&
    (typeof config.loaderWindowRight !== 'number' || config.loaderWindowRight < 0)
  ) {
    throw new Error('checkLazyLoaderConfig - loaderWindowRight of config must be a number');
  }
  if (
    typeof config.loaderWindowLeft !== 'undefined' &&
    (typeof config.loaderWindowLeft !== 'number' || config.loaderWindowLeft < 0)
  ) {
    throw new Error('checkLazyLoaderConfig - loaderWindowLeft of config must be a number');
  }
  if (typeof config.mode !== 'undefined' && (typeof config.mode !== 'number' || config.mode < 0 || config.mode > 3)) {
    throw new Error('checkLazyLoaderConfig - mode of config must be a number (0, 1, 2, 3) - use type ELazyMode');
  }
}
