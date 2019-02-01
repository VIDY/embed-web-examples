# simple-hbs-dynamic Demo

This exteremly simple example is of 3 pages rendered with HBS on a local host node.js server. 

The Vidy SDK is dynamically placed on each of the pages via a HBS partial template that is injected into each of the pages.

The method of integration allows for the VIDY SDK code to live in one place but be present on all pages while also injecting 
each page SDK integration with thier own UNIQUE postid. 

Inside You will find prefilled `appid` and `postid` values &mdash; these values do indeed have Vidys and if you run the example on
your local machine, Vidys will appear on the page.

## Requirements

* [Node.js](https://nodejs.org/en/download/) 6+

## Setup

```sh
# install dependencies & tooling
$ npm install

# start the static server
$ node server.js
```

Then open `http://localhost:3000` in a web browser! :tada:


## License

MIT © [VIDY](https://vidy.com)
