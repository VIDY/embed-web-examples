<div align="center">
  <img src="https://i.imgur.com/GSRxon9.png" title="Vidy embed.js" width="400px" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/@vidy/embed">
    <img src="https://badgen.now.sh/npm/v/@vidy/embed" alt="version" />
  </a>
  <a href="https://semaphoreci.com/vidy/embed-js">
    <img src="https://semaphoreci.com/api/v1/vidy/embed-js/branches/master/badge.svg" alt="Build Status" />
  </a>
  <a href="https://codecov.io/gh/VIDY/embed.js">
    <img src="https://badgen.net/codecov/c/github/VIDY/embed.js" alt="coverage" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=@vidy/embed">
    <img src="https://packagephobia.now.sh/badge?p=@vidy/embed" alt="install size" />
  </a>
</div>

<div align="center">The JavaScript SDK for Vidy Embeds</div>

## Install

```
$ npm install --save @vidy/embed
```

Then with a module bundler like [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```js
// using ES6 modules
import Vidy from '@vidy/embed';

// using CommonJS modules
const Vidy = require('@vidy/embed');
```

You may also use the [UMD](https://github.com/umdjs/umd) build within a `<script>` tag if you'd prefer:

```html
<script src="https://unpkg.com/@vidy/embed/dist/embed.min.js"></script>
```

> This registers the `Vidy` constructor globally.


## Usage

:bulb: Looking for examples? [We got you covered](https://github.com/VIDY/embed-web-examples)!

***Basic Setup***

_This assumes text content exists at time of instantiation._

```js
import Vidy from '@vidy/embed';

let vidy = new Vidy({
  appid: '2199e8c8-abcd-efgh-a123-d463129790c5',
  postid: location.pathname, //=> eg "hello-world"
  content: '#article',
  autoload: true
});
```

***Dynamic Setup &mdash; AKA, no autoload***

_When text is rendered dynamically / after script execution._

```js
import Vidy from '@vidy/embed';

let selector = '#article';
let div = document.querySelector(selector);
let pathname = location.pathname; //=> eg "hello-world"

let vidy = new Vidy({
  appid: '2199e8c8-abcd-efgh-a123-d463129790c5',
  postid: pathname,
  content: selector
});

// Query our own Blog API for JSON
fetch(`/api/posts/${pathname}`).then(r => r.json()).then(data => {
  // Add text to the container we care about!
  div.innerHTML = data.html;
  // Manually call load()
  vidy.load();
});
```

## API

### Vidy(options)

Returns: `Vidy`

Returns the `Vidy` instance.

#### options.appid

Type: `String`<br>
Required: `true`

The Application identifier.

> You may create a new Vidy Application for free [here](#todo)! :tada:

#### options.postid

Type: `String|Number`<br>
Required: `true`

The unique identifier for any given page.

Most web frameworks have built-in helpers to generate & ensure unique page identifiers; see [some examples](https://github.com/VIDY/embed-web-examples) for help. You may also resort to using the `location.pathname`, if necessary.

> **Important:** This should be immutable; each `postid` yields its own specific list of Vidy Embeds!

#### options.content

Type: `String`<br>
Default: `'body'`

The selector of the parent container that wraps the text content Vidy should traverse.

For example, given the following markup:

```html
<body>
  <div id="app">
    <header id="top">
      <nav>...</nav>
    </header>
    <div class="wrapper">
      <main id="content">
        <article>
          <!-- content lives here -->
        </article>
        <div id="comments">...</div>
      </main>
      <aside id="sidebar">
        <div id="trending-posts">...</div>
        <div id="related-posts">...</div>
      </aside>
    </div>
  </div>
</body>
```

By default, the Vidy SDK will grab ***all text*** on the page, including comments, related & trending post widgets, etc. You _probably_ don't want the SDK placing links in these areas.

Instead, you could pass `content: '#content'`, targeting the article _and_ the comments' text; or you can narrow link placements within the article exclusively via the `'#content > article'` selector.

#### options.autoload

Type: `Boolean`<br>
Default: `false`

Whether or not the SDK should immediately draw link around text phrases.

If the text within [`options.content`](#optionscontent) is loaded dynamically (eg, via an API or a headless CMS), then `autoload` should retain the `false` default.

> **Important:** This should _only_ be `true` if your content is included in the server response!


### init(postid)

The method that appends the SDK elements to the page, if they don't already exist. It also queries the Vidy API for the list of Embeds (both social & advertising) that belong to the given `postid`.

If no `postid` is received, the SDK uses the value provided on instantiation &mdash; see [`options.postid`](#optionspostid) for more.

You should only need to invoke this method after successfully navigating to a new page on a client-side application.

> **Note:** This is always called automatically when creating a new `Vidy` instance.

### load()

The method that draws Vidy links around their relevant phrases.

At this point, the SDK expects and traverses text content within the [`options.content`](#optionscontent) container.

> **Note:** This is called automatically when [`options.autoload`](#optionsautoload) is true.


## Browser Support

The JavaScript SDK relies on [`fetch`](https://caniuse.com/#search=fetch) and [`Promise`](https://caniuse.com/#search=promise) support, which yields these minimum browsers:

* Edge 14+
* Firefox 40+
* Chrome 42+
* Safari 10.1+
* iOS 10.3+

The SDK will automatically download polyfills for `fetch` and `Promise` if it does not detect these globals.

> **Note:** To use the polyfills you already provide, ensure that `window.fetch` and `window.Promise` are defined.


## License

MIT © [VIDY](https://vidy.com)
