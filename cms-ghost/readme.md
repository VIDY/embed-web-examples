# Demo: Ghost CMS

An example that shows how you can connect the Vidy SDK to your Ghost-powered website.

We used external CDN links for this approach, appending them inside the `post.hbs` template file. Alternatively, if you are building your own theme assets, you may also include the [`@vidy-dev/embed`](https://github.com/VIDY/embed.js) module into your build system directly.

You will also find the SDK initiation script inside the `post.hbs` template:

```js
var vidy = new Vidy({
  appid: '33c65dc4-08fa-4246-b2b4-3ceb35cc927b',
  // replace leading & trailing "/" to avoid invalid API request
  postid: '{{ url }}'.replace(/^\/|\/$/g, ''),
  content: '.post-full-content',
  autoload: true
});
```

Items of importance:

* `appid` &mdash; demo value; you must [register an app](#todo) of your own!

* `postid` &mdash; uses Ghost's [`url`](https://themes.ghost.org/docs/url) helper to grab the current post's slug <br>
    _Ghost includes a leading & trailing slash ("/") in the helper's output. We must remove them to produce a valid API call._

* `content` &mdash; point the SDK directly to the article's container

* `autoload` &mdash; text content is immediately available, so it's safe to draw Vidy links automatically<br>
    _The majority of Ghost templates follow this pattern!_


## Requirements

* [Node.js](https://nodejs.org/en/download/) 6+

## Setup

```sh
# install dependencies & tooling
$ npm install

# start the Ghost CMS server
$ npm start

# (optional) run the server in development
$ NODE_ENV=development npm start
```

Then open `http://localhost:2368/` in a web browser! :tada:

### Theme Setup

Ghost ships with an embedded version of the Casper theme. You will need to upload the modified theme (included) to your Ghost application.

1. Create a ZIP archive of the `themes/casper-vidy` directory and name it `casper-vidy`.

    ```sh
    $ tar czf casper-vidy.zip content/themes/casper-vidy
    ```

2. Upload and Activate the new theme~!
    > Quicklink: http://localhost:2368/ghost/#/settings/design

    If this is your first time entering the Ghost admin, you will need to complete a few registration steps.

    For official documentation re: uploading themes, please [visit this link](https://help.ghost.org/article/31-upload-themes) for help.


## License

MIT © [VIDY](https://vidy.com)
