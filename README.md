# Mibreit Lazy Loader

A small lazy loader for images and iframes on web pages, written in TypeScript. It needs no UI framework, works on the elements that are already in your HTML, and keeps media requests out of the initial page load.

It was built for the photography website of [Michael Breitung Photography](https://www.mibreit-photo.com) and is published as open source under the BSD-2-Clause licence.

## Features

- **Simple deferred loading** — loads all selected images or iframes after the rest of the page has initialized.
- **Scroll-based loading** — loads elements as they scroll into view, vertically or horizontally.
- **Externally controlled loading** — loads a configurable window of elements around a current index.
- **Stable layout** — optional surrogate elements reserve the target dimensions and show a loading indicator until media is ready.
- **Multiple integration styles** — ships as an IIFE bundle for HTML pages and as ESM and CJS packages with TypeScript definitions.
- **Modern browsers** — uses current browser interfaces and includes no legacy polyfills.

## Using the Lazy Loader on a Website

### 1. Include the script

Add the minified script bundle `mibreitLazyLoader.min.js` to your page. It exposes the lazy loader functions on the global `mibreitLazyLoader`.

```html
<script src="/scripts/mibreitLazyLoader.min.js"></script>
```

Download `mibreitLazyLoader.min.js` from a [GitHub Release](https://github.com/MichaelBreitung/mibreit-lazy-loader/releases) and host it on your own website. Loading it from a CDN or another external host is not supported or recommended.

### 2. Mark your media for lazy loading

Images and iframes can either use a `data-src` attribute instead of the real source:

```html
<img src="placeholder.png" data-src="image.jpg" width="1280" height="853" alt="Description" />
```

Or, for images that use the browser-native `loading="lazy"` workflow, use the `mbll__marker` class:

```html
<img class="mbll__marker" src="image.jpg" loading="lazy" width="1280" height="853" alt="Description" />
```

The marker class must be hidden before the lazy loader script runs, because the browser may otherwise request the image before the loader is initialized:

```css
.mbll__marker {
  display: none !important;
}
```

Always provide `width` and `height` attributes. They are required for surrogates and help the browser reserve the correct amount of space.

### 3. Create the lazy loader

Pass a CSS selector and a configuration object. For example, to load marked images as they scroll into view and keep layout stable with surrogates:

```html
<script>
  mibreitLazyLoader.createLazyLoader('#container .mbll__marker', {
    mode: mibreitLazyLoader.ELazyMode.WINDOWED_SCROLL,
    useSurrogate: true,
  });
</script>
```

The loader returns a control object that can be stored for later use.

## Configuration

| Option              | Description                                                              | Default        |
| ------------------- | ------------------------------------------------------------------------ | -------------- |
| `mode`              | Loading mode; see the table below                                        | `SIMPLE_DEFER` |
| `loaderWindowLeft`  | Elements loaded before the current index in external windowed mode       | `0`            |
| `loaderWindowRight` | Elements loaded after the current index in external windowed mode        | `1`            |
| `useSurrogate`      | Reserve layout space with a placeholder and loading indicator            | `false`        |
| `scrollLoaderDelay` | Milliseconds an element must remain visible before scroll loading starts | `200`          |

### Loading modes

| Mode                         | Description                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| `SIMPLE_DEFER`               | Loads all selected elements after page initialization             |
| `WINDOWED_EXTERNAL`          | Loads a window around an index controlled by the host application |
| `WINDOWED_SCROLL`            | Loads elements as they scroll into the vertical viewport          |
| `WINDOWED_SCROLL_HORIZONTAL` | Loads elements as they scroll into the horizontal viewport        |

Surrogates are only used in the two scroll modes. If a scroll-loaded element leaves the viewport before `scrollLoaderDelay` expires, its pending load is cancelled.

In external windowed mode, the current element is always loaded, even when both `loaderWindowLeft` and `loaderWindowRight` are `0`. The two options control the number of additional elements loaded before and after it.

## Loader Control

`createLazyLoader` returns a control object with the following methods:

| Method                        | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `loadAll()`                   | Loads all selected elements                             |
| `loadElement(index)`          | Loads one element without moving the loading window     |
| `setCurrentIndex(index)`      | Moves the external loading window to the given index    |
| `getUnloadedElementIndices()` | Returns the indices of elements that are not loaded yet |

`loadElement` resolves to `true` when an element is already loaded or finishes loading, and to `false` while it is still loading.

## Using the Library from TypeScript

The package provides TypeScript definitions and an ESM entry point, so it can be imported directly in a TypeScript project:

```ts
import { createLazyLoaderFromElements, ELazyMode, type Element } from 'mibreit-lazy-loader';

const loader = createLazyLoaderFromElements(elements, {
  mode: ELazyMode.WINDOWED_EXTERNAL,
  loaderWindowLeft: 0,
  loaderWindowRight: 2,
});
```

Use `createLazyLoaderFromElements` when the host application already owns the element adapters, for example a gallery component. Use `createLazyLoader` when the elements should be discovered through a CSS selector.

## Development

### Demo Pages

Run the development server and open the index page to try all use cases:

```sh
task dev
```

The demo pages cover simple deferred loading, vertical and horizontal scroll loading, surrogates, and iframes. They use images from the mibreit-photo.com website.

### Technology

TypeScript (strict mode), [Vite](https://vite.dev) for the development server and builds, and Vitest with Puppeteer for tests.

### Prerequisites

The project uses a Dev Container that provides Node.js and Chrome. You need VS Code with the Dev Containers extension and the Docker Engine. On Windows, WSL2 with an Ubuntu distribution and Docker installed there is recommended, to avoid problems with mounting SSH keys.

Helpful video tutorials:

- [Where Dev Containers are helpful](https://youtu.be/9F-jbT-pHkg?si=rW4RThXZNC0SMIyl)
- [How to create a custom Dev Container](https://youtu.be/7P0pTECkiN8?si=51YPKbUz7OlAs80)
- [How to configure VS Code Extensions and Settings in a Dev Container](https://youtu.be/W84R1CxtF0c?si=WYhBRzKk1lgCKEyz)

### Setup

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Press `Ctrl+Shift+P` and run "Dev Containers: Rebuild and Reopen in Container".
4. Inside the Dev Container run `task setup`.

### Commands

| Command                             | Purpose                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| `task setup`                        | Installs npm dependencies                                                        |
| `task dev`                          | Starts the Vite development server with the demo pages                           |
| `task build`                        | Builds the ESM, CJS, IIFE, and type-definition libraries                         |
| `task test`                         | Runs unit tests                                                                  |
| `task test:performance`             | Runs the slow Puppeteer performance tests                                        |
| `task clean`                        | Removes generated library output                                                 |
| `task deploy:release VERSION=x.y.z` | Builds, versions, reviews, and publishes a GitHub Release with the IIFE artifact |

Generated `lib/`, `lib-cjs/`, `lib-iife/`, and `lib-types/` folders are not committed. The package's `prepare` script builds them when the library is installed directly from Git, so TypeScript and JavaScript consumers receive compiled output without an npm publish.

### Releasing the Library

Create the release, tag, and IIFE artifact in one step:

```sh
task deploy:release VERSION=<version>
```

The version must use the `x.y.z` format and be higher than the current package version. The task requires the [GitHub CLI](https://cli.github.com/) and an authenticated `gh` account. It pauses after creating the release branch so the release pull request can be reviewed and merged before the GitHub Release is published.

For the full design, decisions, quality goals, and known technical debt, see the [architecture documentation](doc/architecture.md).

## License

BSD-2-Clause. See the LICENSE file.
