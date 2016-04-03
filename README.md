# scrape-scripts


[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![experimental][stability-image]][stability-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]


Scrapes all `<script>` tags from HTML (local or external). The callback is provided with a list of script objects with the data `{ type, src, body }`, matching each `<script>` attribute.

`src` attributes are followed and the `body` replaced with the requested script's contents unless the `loadContent` option is set to false.

```js
scrape('http://mattdesl.github.io/ink/index.html', function(err, results) {
  if (err) throw err

  // bundle.js
  console.log(results[0].src)  

  // contents of http://mattdesl.github.io/ink/bundle.js
  console.log(results[0].body)
})
```

## Usage

[![NPM](https://nodei.co/npm/scrape-scripts.png)](https://www.npmjs.com/package/scrape-scripts)

#### `scrape(uri, callback)`

Scrapes the `uri` and triggers the `callback` after all script tags have been parsed and their `src` attributes followed.

#### `scrape(opts, callback)`

Scrapes based on options passed in the opts object. Options accepts the `uri` and a `loadContent` parameter which is a boolean that controls whether or not to load the script tags' file contents.

#### Options

`loadContent` - Whether or not to load the file content of each one of the script tags that are scraped

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/scrape-scripts/blob/master/LICENSE.md) for details.

[stability-image]:http://badges.github.io/stability-badges/dist/experimental.svg?style=flat-square
[stability-url]:http://github.com/badges/stability-badges
[npm-image]: https://img.shields.io/npm/v/scrape-scripts.svg?style=flat-square
[npm-url]: https://npmjs.org/package/scrape-scripts
[npm-downloads-image]: https://img.shields.io/npm/dm/scrape-scripts.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/scrape-scripts.svg?style=flat-square
[license-url]: https://github.com/mattdesl/scrape-scripts/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
