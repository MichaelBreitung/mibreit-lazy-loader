# Mibreit Lazy Loader

## About

This lazy loader module can be used to defer the loading of images or iframes to after the rest of the website is loaded. 

You can chose which images and iframes to load lazily by providing a _data-src_ instead of a _src_ attribute for those elements. You then pass a css selector for those elements to the loader. It will take care of loading those elements based on the given configuration.

For image elements, you also have the option to, instead of relying on _data-src_, set the mode to ``loading="lazy"`` and  add the css class ``mbll__marker``. 

**Important:** If you use ``mbll__marker``, you must define it in your css so the images will initially not be loaded. This is required, because the css that gets injected by the library is loaded too late by the browser:

````
.mbll__marker {
  display: none;
}
````

**Note:** To comply with W3C, you should always provide a _src_ attribute for images and iframes, even for those you want to lazy-load using the _data-src_ attribute. For images, simply provide a 1px placaholder. For iframes use _src="about:blank"_.

## Technology 

This module was written in Typescript. Webpack and tsc are used to bundle the code into a version of JavaScript that is compatible with modern browsers and can be included into a homepage via the _script_ tag. 

In addition, a minified CSS file is created, which you should include in your homepage before the script.

## Prerequisites

This project uses a Dev Container to provide the required tools for Web Development. You must have VS Code and the Dev Containers extension installed on your host machine as well as the Docker Engine. On Windows, you can use Docker Desktop, for example. To avoid problems with the mounting of ssh keys, it is recommended, though, to use WSL2 with a Ubuntu distribution and install Docker there.

Here are three video tutorials that will get you started with Docker and Dev Containers:

- [Where Dev Containers are helpful](https://youtu.be/9F-jbT-pHkg?si=yW4RThXZNC0SMIyl)
- [How to create a custom Dev Container](https://youtu.be/7P0pTECkiN8?si=51YPKbUzL7OlAs80)
- [How to configure VS Code Extenstions and Settings in a Dev Container](https://youtu.be/W84R1CxtF0c?si=YBhBRzKk1lgCKEyz)

To prepare the project:

1. Clone or download the repository.
2. Open the project folder in VSCode.
3. `CTRL+Shift+P` and enter "Dev Containers: Rebuild and Reopen in Container".
4. Inside the Dev Container run: `npm i`.

### Usage

The most common use of this library will be directly in a HTML page. Include the minimized library located under "lib-iife/mibreitLazyLoader.min.js" via the "script" tag in your homepage and then use the available methods via the global "mibreitLazyLoader" variable.

### Configuration

You can configure how the loader works by providing a config object to ``mibreitLazyLoader.createLazyLoader(elementSelector: string, config: LazyLoaderConfig)``. It contains the following values:

- mode - **optional** _enum of type ELazyMode_
  - SIMPLE_DEFER - all elements are lazy loaded at once after the rest of the page has loaded (**default**)
  - WINDOWED_EXTERNAL - only the elements in the specified window (_setCurrentIndex_) are loaded. Initially the index is set to 0 and the window around this index is loaded
  - WINDOWED_SCROLL - only the elements that are within the bouding rect of the visible window portion are loaded. Scrolling down loads more and more elements
  - WINDOWED_SCROLL_HORIZONTAL - only the elements that are within the bouding rect of the visible window portion are loaded. Scrolling left and right loads more and more elements
- loaderWindowLeft - **optional** _number_ that can be provided for external windowed loading. It specifies the number of elements to lazy load left of the current index (**default is 0**)
- loaderWindowRight - **optional** _number_ that can be provided for external windowed loading. It specifies the number of elements to lazy load right of the current index (**default is 1**)
- useSurrogate - **optional** _boolean_, which should be set to true, if you want to avoid cumulative layout shift. But be sure to provide a proper _width_ and _height_ value for your image or iframe, if you use the surrogate (**default is false**)

### Control

A call to ``mibreitLazyLoader.createLazyLoader`` will return an instance of _LazyLoader_, which you can use to load images. The interface consists of the following methods:

- _loadAll() : void_ - loads all images 
- _setCurrentIndex(newIndex: number) : void_ - moves the window to the newIndex
- _async loadElement(index: number) : Promise< boolean >_ - loads a specific image (does not move the window)
- _getElementLoaderInfos(): Array<IElementLoaderInfo>_ - Get an array of info objects for all lazy elements.
- _getUnloadedElementIndices() : Array< number >_ - Retrieve an array of all the indices of the unloaded elements. Those indices can be used as input for _setCurrentIndex_ or _loadElement_ 

## Resources

- Repaints and Reflows point 6 and 7 - https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/


