# scrape-scripts

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Scrapes all `<script>` tags from a site's HTML. The callback is provided with a list of script objects with the data `{ type, src, body }`, matching each `<script>` attribute. 

`src` attributes are followed and the `body` replaced with the requested script's contents.

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

#### `scrape(uri|opt, callback)`

Scrapes the `uri` String and triggers the `callback` after all script tags have been parsed and their `src` attributes followed.

Or, you can pass an `opt` object with the following:

- `uri` - the URI string
- `loadSrc` - boolean, whether to follow script `src` attribute and load the contents (default true)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/scrape-scripts/blob/master/LICENSE.md) for details.
