# mibreit-lazy-loader

This lazy loader module can be used to defer the loading of images or iframes to after the rest of the website is loaded. You are flexible to select, which images and iframes to load lazily, by providing a _data-src_ instead of a _src_ attribute for those elements. The lazy loader will then take care of loading those elements.

**Note:** To comply with W3C, you should always provide a _src_ attribute for images and iframes, even for those you want to lazy load. For images, simply provide a 1px placaholder (_image-placeholder-transparent.png_). For iframes use _src="about:blank"_.

## Technology 

This module was written in Typescript. Webpack is then used to transpile the code into a version of Javascript that is compatible with modern browsers and can be simply included into a homepage via the _script_ tag.

## Usage

1. Install the dependencies - _npm i_
2. Build the library - _npm run build_
3. Copy the minified library to your project. It is now located under _dist_
4. Use the libary - see _demo_ folder for two examples

**Note:** If you want to use the lazy loader in windowed mode, you need to also provide some logic in your homepage, to update the index using the _setCurrentIndex_ method of the returned loader. This method will move the loading window.

### Config

You can configure how the loader works by providing a config object. It contains the following values:

- elementSelector - mandatory css selector string to select elements to lazy load 
- preloaderBeforeSize - optional number that can be provided for windowed loading. It specifies the number of elements to lazy load before the current index (default is 0)
- preloaderAfterSize: optional number that can be provided for windowed loading. It specifies the number of elements to lazy load after the current index (default is 5)
- windowed: optional boolean that can be set to true to activate windowed loading. If set to false (default) all selected elements will be loaded at once after the rest of the page was loaded


