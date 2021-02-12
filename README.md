# mibreit-lazy-loader

This lazy loader module can be used to defer the loading of images or iframes to after the rest of the website is loaded. You are flexible to select, which images and iframes to load lazily, by providing a _data-src_ instead of a _src_ attribute for those elements and then passing a css selector to the loader. The lazy loader will then take care of loading those elements.

**Note:** To comply with W3C, you should always provide a _src_ attribute for images and iframes, even for those you want to lazy load. For images, simply provide a 1px placaholder (_image-placeholder-transparent.png_). For iframes use _src="about:blank"_.

## Technology 

This module was written in Typescript. Webpack is then used to transpile the code into a version of Javascript that is compatible with modern browsers and can be simply included into a homepage via the _script_ tag. In addition CSS Modules were used to inject css into the page (combination of CSS loader and Style loader).

## Usage

1. Install the dependencies - _npm i_
2. Build the library - _npm run build_
3. Copy the minified library to your project. It is now located under _dist_
4. Use the libary - see _demo_ folder for two examples

**Note:** If you want to use the lazy loader in external windowed mode (see below), you need to also provide some logic in your homepage, to update the index using the _setCurrentIndex_ method of the returned loader. This method will move the loading window.

### Config

You can configure how the loader works by providing a config object. It contains the following values:

- elementSelector - **mandatory** _css selector string_ to select elements to lazy load 
- mode - **optional** _enum of type ELazyMode_
  - SIMPLE_DEFER - all elements are lazy loaded at once after the rest of the page has loaded (**default**)
  - WINDOWED_EXTERNAL - only the elements in the specified window (_setCurrentIndex_) are loaded. Initially the index is set to 0 and the window around this index is loaded
  - WINDOWED_SCROLL - only the elements that are within the bouding rect of the visible window portion are loaded. Scrolling down loads more and more elements
- preloaderBeforeSize - **optional** _number_ that can be provided for external windowed loading. It specifies the number of elements to lazy load before the current index (**default is 0**)
- preloaderAfterSize - **optional** _number_ that can be provided for external windowed loading. It specifies the number of elements to lazy load after the current index (**default is 5**)
- useSurrogate - **optional** _boolean_, which should be set to true, if you want to avoid cumulative content shift. But be sure to provide a proper _width_ and _height_ value for your image or iframe, if you use the surrogate (**default is false**)

### Control

A call to _mibreitLazyLoader.lazyLoad_ will return an instance of _LazyLoader_, which you can use in the windowed modes to load images. The interface consists of the following methods:

- _loadAll() : void_ - loads all images 
- _setCurrentIndex(newIndex: number) : void_ - moves the window to the newIndex
- _async loadElement(index: number) : Promise< boolean >_ - loads a specific image (does not move the window)
- _getUnloadedElementIndices() : Array< number >_ - Retrieve an array of all the indices of the unloaded elements. Those indices can be used as input for _setCurrentIndex_ or _loadElement_ 

## NPM

Under lib you will also find a ready npm version of the lib. You can directly use it by installing: _npm i github:MichaelBreitung/mibreit-lazy-loader_

There are two targets included:
- ES6 version under _module_
- commonjs version under _main_

Configure your bundler appropriately to use the version you need. Webpack, by default, will use the _module_ version over the _main_ target. If you use it like that, tree-shaking will work properly. But what you have to do is setup the following style-loader rule in order for Webpack to properly resolve the dependencies:

````
{
  {
    test: /\.css?$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          injectType: 'singletonStyleTag',
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]',
          },
        },
      },
    ],
    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/mibreit-lazy-loader')],
  }
````

Make sure to install _style-loader_ and _css-loader_ for this to work.

## Resources

- Repaints and Reflows point 6 and 7 - https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/


